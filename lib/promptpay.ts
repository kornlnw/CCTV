// Minimal PromptPay QR payload generator (EMVCo TLV) — returns the string to render as QR.
// Accepts Thai phone (0xxxxxxxxx or 66xxxxxxxxx) or 13-digit national ID.

function tlv(id: string, value: string): string {
  return id + value.length.toString().padStart(2, "0") + value;
}

function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) !== 0 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function normalizeId(raw: string): { kind: "phone" | "id"; value: string } {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 13) return { kind: "id", value: digits };
  // Thai mobile: 0812345678 -> 0066812345678
  const phone = digits.startsWith("66") ? digits : digits.replace(/^0/, "66");
  return { kind: "phone", value: "0000" + phone };
}

export function buildPromptPayPayload(promptpayId: string, amount?: number): string {
  const { kind, value } = normalizeId(promptpayId);
  const merchantId = tlv("00", "A000000677010111") + tlv(kind === "phone" ? "01" : "02", value);
  const payload =
    tlv("00", "01") +
    tlv("01", amount ? "12" : "11") +
    tlv("29", merchantId) +
    tlv("53", "764") +
    tlv("58", "TH") +
    (amount ? tlv("54", amount.toFixed(2)) : "");
  const withCrcField = payload + "6304";
  return withCrcField + crc16(withCrcField);
}
