import { Hono } from "hono";
import { HealthResponseSchema } from "@reader/shared";

const VERSION = "0.1.0";

export const healthRoutes = new Hono().get("/health", (c) => {
  const payload = HealthResponseSchema.parse({
    ok: true,
    service: "reader-api",
    version: VERSION,
  });
  return c.json(payload);
});
