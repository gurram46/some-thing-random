import type { Context, Next } from "hono";
import type { ApiError } from "@reader/shared";
import type { Env } from "../env";

// ponytail: static bearer token until OTP sessions exist; swap this
// middleware for session auth when auth phase lands.
export async function requireAdmin(c: Context<{ Bindings: Env }>, next: Next) {
  const expected = c.env.ADMIN_TOKEN;
  if (!expected) {
    return c.json({ error: "Admin access not configured" } satisfies ApiError, 503);
  }

  const header = c.req.header("Authorization") ?? "";
  const actual = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (actual !== expected) {
    return c.json({ error: "Unauthorized" } satisfies ApiError, 401);
  }

  await next();
}
