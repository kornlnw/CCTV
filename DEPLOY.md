# Production deployment (VPS)

End-to-end guide to run the CCTV shop + LINE bot in production with auto-HTTPS.

## What you'll get

```
internet
   │
   ├──> Caddy (80/443, auto-TLS) ──> Next.js app (private :3000)
                                         │
                                         └──> Postgres (private)
```

Three Docker containers on one VPS, behind Cloudflare or directly. No port other than 80/443 is exposed.

---

## 1. Prerequisites

- A Linux VPS (Ubuntu 22.04+ tested, 1 GB RAM minimum, 2 GB recommended)
- A domain you control (e.g. `bot.yourshop.com`)
- DNS A record for that domain pointing at the VPS public IP
- Inbound 80 + 443 open in your VPS firewall

## 2. Install Docker on the VPS

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in, then verify:
docker compose version
```

## 3. Get the code

```bash
sudo mkdir -p /opt/cctv && sudo chown $USER:$USER /opt/cctv
cd /opt/cctv
git clone https://github.com/<your-org>/CCTV.git .
```

## 4. Configure `.env`

```bash
cp .env.example .env
nano .env
```

Required values for first boot:

| Var | What |
|---|---|
| `DOMAIN` | e.g. `bot.yourshop.com` (Caddy uses this for the cert) |
| `POSTGRES_PASSWORD` | strong random password (generate: `openssl rand -base64 24`) |
| `ADMIN_PASSWORD` | password to enter `/admin` |
| `ADMIN_SESSION_SECRET` | `openssl rand -base64 32` |
| `LINE_CHANNEL_SECRET`, `LINE_CHANNEL_ACCESS_TOKEN` | LINE Developers Console |
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `PROMPTPAY_ID`, `BANK_FALLBACK_TEXT`, `SHOP_NAME` | your shop details |
| `NEXT_PUBLIC_APP_URL` | `https://${DOMAIN}` |

Optional but recommended:
- `R2_*` — for image uploads
- `GOOGLE_*` — for calendar sync
- `ADMIN_LINE_USER_ID` — to receive slip + discount-approval pings on LINE

You can leave Google Calendar empty for first deploy and add it later.

## 5. Edit the Caddyfile (optional)

The default `Caddyfile` reads `${DOMAIN}` from your `.env`. If you want to add extra routes or headers, tweak it now.

## 6. Build and start

```bash
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml logs -f app
```

The app container's entrypoint runs `prisma migrate deploy` automatically before starting Next.js, so the schema is applied on first run and on every deploy.

## 7. Seed initial data (first deploy only)

```bash
docker compose -f docker-compose.prod.yml exec app node node_modules/tsx/dist/cli.mjs prisma/seed.ts
```

This loads sample categories, products, install packages, and 2 promo codes. Skip this if you'd rather start empty and add everything via the admin UI.

## 8. Connect LINE

1. https://developers.line.biz/console → your channel → Messaging API
2. **Webhook URL:** `https://<DOMAIN>/api/line/webhook`
3. Click **Verify** — should return 200
4. Enable **Use webhook**
5. Disable **Auto-reply messages** and **Greeting messages** (they fight the bot)

## 9. Smoke test

- Visit `https://<DOMAIN>/api/health` → should return `{"status":"ok","db":"ok",...}`
- Visit `https://<DOMAIN>/admin` → password prompt → log in
- Send a message to your LINE OA → bot should reply
- Use the bot to create an order, upload a slip, and confirm it from `/admin/orders/...`

## 10. Updating

```bash
cd /opt/cctv
git pull
docker compose -f docker-compose.prod.yml build app
docker compose -f docker-compose.prod.yml up -d app
docker compose -f docker-compose.prod.yml logs -f app
```

The entrypoint re-runs migrations on every restart, so schema changes ship with `git pull` + `docker compose up -d --build app`.

## 11. Backups

Daily logical Postgres dump (cron):

```bash
crontab -e
# add:
0 3 * * * docker exec cctv_postgres_prod pg_dump -U postgres cctv_shop | gzip > /opt/cctv/backups/cctv_$(date +\%Y\%m\%d).sql.gz
```

Then sync `/opt/cctv/backups/` off-server (rsync, restic, S3, R2 — whatever).

The R2 bucket itself is durable; no need to back up uploaded images separately.

## Operational notes

- **Logs:** `docker compose -f docker-compose.prod.yml logs -f app` (or `caddy`, `postgres`)
- **Restart just the app:** `docker compose -f docker-compose.prod.yml restart app`
- **Shell into the app:** `docker compose -f docker-compose.prod.yml exec app sh`
- **Prisma Studio remotely:** `docker compose -f docker-compose.prod.yml exec app node node_modules/prisma/build/index.js studio` then SSH-tunnel port 5555

## Security checklist before going live

- [ ] `ADMIN_PASSWORD` is long and unique
- [ ] `ADMIN_SESSION_SECRET` is at least 32 random chars
- [ ] `POSTGRES_PASSWORD` is strong; Postgres port is **not** published to the host (compose file is correct)
- [ ] LINE webhook verifies signature (already enforced in `/api/line/webhook`)
- [ ] DNS is on Cloudflare with proxy enabled (extra DDoS layer) — optional but free
- [ ] Firewall (`ufw`): allow 22, 80, 443; deny everything else
- [ ] Fail2ban on SSH
- [ ] Set up off-server backups (step 11)
- [ ] Test `/api/health` from outside (uptime monitor: UptimeRobot, Better Stack, etc.)
