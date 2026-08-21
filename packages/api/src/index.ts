import { Hono } from "hono";
import type { ApiError } from "@reader/shared";
import type { Env } from "./env";
import { healthRoutes } from "./routes/health";
import { booksRoutes } from "./routes/books";
import { requireAdmin } from "./routes/admin";

const app = new Hono<{ Bindings: Env }>();

app.route("/api", healthRoutes);

// Admin content management (bearer-token guarded until OTP auth lands).
const adminApp = new Hono<{ Bindings: Env }>().use("*", requireAdmin);
adminApp.route("/books", booksRoutes);
app.route("/api", adminApp);

app.notFound((c) => {
  return c.json({ error: "Not found" } satisfies ApiError, 404);
});

app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" } satisfies ApiError, 500);
});

export default app;
