import { Hono } from "hono";
import type { ApiError } from "@reader/shared";
import type { Env } from "./env";
import { healthRoutes } from "./routes/health";

const app = new Hono<{ Bindings: Env }>();

app.route("/api", healthRoutes);

app.notFound((c) => {
  return c.json({ error: "Not found" } satisfies ApiError, 404);
});

app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" } satisfies ApiError, 500);
});

export default app;
