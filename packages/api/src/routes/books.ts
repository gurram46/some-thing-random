import { Hono } from "hono";
import type {
  Book,
  Chapter,
} from "@reader/shared";
import {
  CreateBookInputSchema,
  CreateChapterInputSchema,
  ReorderChaptersInputSchema,
  UpdateBookInputSchema,
  UpdateChapterInputSchema,
} from "@reader/shared";
import type { Env } from "../env";

interface BookRow {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface ChapterRow {
  id: string;
  book_id: string;
  title: string;
  position: number;
  content: string;
  audio_key: string | null;
  created_at: string;
  updated_at: string;
}

function toBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toChapter(row: ChapterRow): Chapter {
  return {
    id: row.id,
    bookId: row.book_id,
    title: row.title,
    position: row.position,
    content: row.content,
    audioKey: row.audio_key,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const booksRoutes = new Hono<{ Bindings: Env }>()

  .get("/", async (c) => {
    const { results } = await c.env.DB.prepare(
      "SELECT * FROM books ORDER BY created_at",
    ).all<BookRow>();
    return c.json({ books: results.map(toBook) });
  })

  .post("/", async (c) => {
    const parsed = CreateBookInputSchema.safeParse(await c.req.json());
    if (!parsed.success) {
      return c.json({ error: "Invalid input" }, 400);
    }
    const id = crypto.randomUUID();
    const row = await c.env.DB.prepare(
      "INSERT INTO books (id, title, description) VALUES (?1, ?2, ?3) RETURNING *",
    )
      .bind(id, parsed.data.title, parsed.data.description ?? null)
      .first<BookRow>();
    if (!row) {
      return c.json({ error: "Insert failed" }, 500);
    }
    return c.json(toBook(row), 201);
  })

  .patch("/:bookId", async (c) => {
    const parsed = UpdateBookInputSchema.safeParse(await c.req.json());
    if (!parsed.success) {
      return c.json({ error: "Invalid input" }, 400);
    }
    const { title, description } = parsed.data;
    const row = await c.env.DB.prepare(
      `UPDATE books SET
         title = COALESCE(?2, title),
         description = CASE WHEN ?4 THEN ?3 ELSE description END,
         updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
       WHERE id = ?1 RETURNING *`,
    )
      .bind(
        c.req.param("bookId"),
        title ?? null,
        description ?? null,
        description !== undefined ? 1 : 0,
      )
      .first<BookRow>();
    if (!row) {
      return c.json({ error: "Book not found" }, 404);
    }
    return c.json(toBook(row));
  })

  .delete("/:bookId", async (c) => {
    const row = await c.env.DB.prepare("DELETE FROM books WHERE id = ?1 RETURNING id")
      .bind(c.req.param("bookId"))
      .first<{ id: string }>();
    if (!row) {
      return c.json({ error: "Book not found" }, 404);
    }
    return c.json({ ok: true });
  })

  .get("/:bookId/chapters", async (c) => {
    const { results } = await c.env.DB.prepare(
      "SELECT * FROM chapters WHERE book_id = ?1 ORDER BY position",
    )
      .bind(c.req.param("bookId"))
      .all<ChapterRow>();
    return c.json({ chapters: results.map(toChapter) });
  })

  .post("/:bookId/chapters", async (c) => {
    const bookId = c.req.param("bookId");
    const book = await c.env.DB.prepare("SELECT id FROM books WHERE id = ?1")
      .bind(bookId)
      .first<{ id: string }>();
    if (!book) {
      return c.json({ error: "Book not found" }, 404);
    }
    const parsed = CreateChapterInputSchema.safeParse(await c.req.json());
    if (!parsed.success) {
      return c.json({ error: "Invalid input" }, 400);
    }
    const last = await c.env.DB.prepare(
      "SELECT MAX(position) AS max_pos FROM chapters WHERE book_id = ?1",
    )
      .bind(bookId)
      .first<{ max_pos: number | null }>();
    const position = (last?.max_pos ?? -1) + 1;
    const id = crypto.randomUUID();
    const row = await c.env.DB.prepare(
      "INSERT INTO chapters (id, book_id, title, position, content) VALUES (?1, ?2, ?3, ?4, ?5) RETURNING *",
    )
      .bind(id, bookId, parsed.data.title, position, parsed.data.content ?? "")
      .first<ChapterRow>();
    if (!row) {
      return c.json({ error: "Insert failed" }, 500);
    }
    return c.json(toChapter(row), 201);
  })

  .put("/:bookId/chapters/reorder", async (c) => {
    const bookId = c.req.param("bookId");
    const parsed = ReorderChaptersInputSchema.safeParse(await c.req.json());
    if (!parsed.success) {
      return c.json({ error: "Invalid input" }, 400);
    }
    const existing = await c.env.DB.prepare(
      "SELECT id FROM chapters WHERE book_id = ?1",
    )
      .bind(bookId)
      .all<{ id: string }>();
    const existingIds = new Set(existing.results.map((r) => r.id));
    for (const chapterId of parsed.data.chapterIds) {
      if (!existingIds.has(chapterId)) {
        return c.json({ error: "Chapter does not belong to this book" }, 400);
      }
    }
    if (parsed.data.chapterIds.length !== existingIds.size) {
      return c.json({ error: "Reorder list must contain every chapter exactly once" }, 400);
    }
    const statements = parsed.data.chapterIds.map((chapterId, index) =>
      c.env.DB.prepare(
        `UPDATE chapters SET position = ?2,
           updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
         WHERE id = ?1 AND book_id = ?3`,
      ).bind(chapterId, index, bookId),
    );
    await c.env.DB.batch(statements);
    return c.json({ ok: true });
  })

  .patch("/chapters/:chapterId", async (c) => {
    const parsed = UpdateChapterInputSchema.safeParse(await c.req.json());
    if (!parsed.success) {
      return c.json({ error: "Invalid input" }, 400);
    }
    const { title, content, audioKey } = parsed.data;
    const row = await c.env.DB.prepare(
      `UPDATE chapters SET
         title = COALESCE(?2, title),
         content = COALESCE(?3, content),
         audio_key = CASE WHEN ?5 THEN ?4 ELSE audio_key END,
         updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
       WHERE id = ?1 RETURNING *`,
    )
      .bind(
        c.req.param("chapterId"),
        title ?? null,
        content ?? null,
        audioKey ?? null,
        audioKey !== undefined ? 1 : 0,
      )
      .first<ChapterRow>();
    if (!row) {
      return c.json({ error: "Chapter not found" }, 404);
    }
    return c.json(toChapter(row));
  })

  .delete("/chapters/:chapterId", async (c) => {
    const row = await c.env.DB.prepare(
      "DELETE FROM chapters WHERE id = ?1 RETURNING id",
    )
      .bind(c.req.param("chapterId"))
      .first<{ id: string }>();
    if (!row) {
      return c.json({ error: "Chapter not found" }, 404);
    }
    return c.json({ ok: true });
  });
