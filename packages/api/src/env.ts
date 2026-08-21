export interface Env {
  DB: D1Database;
  AUDIO_BUCKET: R2Bucket;
  /**
   * Interim admin guard until passwordless OTP auth lands.
   * Set as a secret (`.dev.vars` locally, `wrangler secret put` remotely).
   * When unset, all admin routes respond 503.
   */
  ADMIN_TOKEN?: string;
}
