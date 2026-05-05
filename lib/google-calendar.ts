// Google Calendar via service account JWT. Avoids googleapis dep weight.
// Requires: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID.
import crypto from "crypto";

const SCOPE = "https://www.googleapis.com/auth/calendar";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.token;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const key = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const claim = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");
  const unsigned = `${header}.${claim}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), key).toString("base64url");
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  if (!res.ok) throw new Error(`Google token: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return json.access_token;
}

function calendarId() {
  return encodeURIComponent(process.env.GOOGLE_CALENDAR_ID ?? "primary");
}

export type CalendarEvent = {
  summary: string;
  description?: string;
  start: string; // ISO
  end: string; // ISO
  colorId?: string; // 5 = yellow, 10 = green, 11 = red
};

export async function createCalendarEvent(ev: CalendarEvent) {
  const token = await getAccessToken();
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId()}/events`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: ev.summary,
        description: ev.description,
        start: { dateTime: ev.start, timeZone: "Asia/Bangkok" },
        end: { dateTime: ev.end, timeZone: "Asia/Bangkok" },
        colorId: ev.colorId,
      }),
    }
  );
  if (!res.ok) throw new Error(`Calendar create: ${res.status} ${await res.text()}`);
  return res.json() as Promise<{ id: string; htmlLink: string }>;
}

export async function updateCalendarEvent(eventId: string, patch: Partial<CalendarEvent>) {
  const token = await getAccessToken();
  const body: Record<string, unknown> = {};
  if (patch.summary) body.summary = patch.summary;
  if (patch.description) body.description = patch.description;
  if (patch.colorId) body.colorId = patch.colorId;
  if (patch.start) body.start = { dateTime: patch.start, timeZone: "Asia/Bangkok" };
  if (patch.end) body.end = { dateTime: patch.end, timeZone: "Asia/Bangkok" };
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId()}/events/${eventId}`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error(`Calendar update: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function listFreeBusy(timeMinISO: string, timeMaxISO: string) {
  const token = await getAccessToken();
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      timeZone: "Asia/Bangkok",
      items: [{ id: process.env.GOOGLE_CALENDAR_ID ?? "primary" }],
    }),
  });
  if (!res.ok) throw new Error(`Calendar freeBusy: ${res.status} ${await res.text()}`);
  return res.json() as Promise<{ calendars: Record<string, { busy: { start: string; end: string }[] }> }>;
}
