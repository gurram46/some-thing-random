import { z } from "zod";

export const ApiErrorSchema = z.object({
  error: z.string(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const HealthResponseSchema = z.object({
  ok: z.literal(true),
  service: z.literal("reader-api"),
  version: z.string(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

const isoTimestamp = z.string();

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: isoTimestamp,
  updatedAt: isoTimestamp,
});

export type Book = z.infer<typeof BookSchema>;

export const ChapterSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  title: z.string(),
  position: z.number().int(),
  content: z.string(),
  audioKey: z.string().nullable(),
  createdAt: isoTimestamp,
  updatedAt: isoTimestamp,
});

export type Chapter = z.infer<typeof ChapterSchema>;

export const BooksResponseSchema = z.object({
  books: z.array(BookSchema),
});

export type BooksResponse = z.infer<typeof BooksResponseSchema>;

export const ChaptersResponseSchema = z.object({
  chapters: z.array(ChapterSchema),
});

export type ChaptersResponse = z.infer<typeof ChaptersResponseSchema>;

export const CreateBookInputSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(5000).nullable().optional(),
});

export type CreateBookInput = z.infer<typeof CreateBookInputSchema>;

export const UpdateBookInputSchema = z
  .object({
    title: z.string().min(1).max(300).optional(),
    description: z.string().max(5000).nullable().optional(),
  })
  .refine((v) => v.title !== undefined || v.description !== undefined, {
    message: "At least one field to update is required",
  });

export type UpdateBookInput = z.infer<typeof UpdateBookInputSchema>;

export const CreateChapterInputSchema = z.object({
  title: z.string().min(1).max(300),
  content: z.string().max(2_000_000).optional(),
});

export type CreateChapterInput = z.infer<typeof CreateChapterInputSchema>;

export const UpdateChapterInputSchema = z
  .object({
    title: z.string().min(1).max(300).optional(),
    content: z.string().max(2_000_000).optional(),
    audioKey: z.string().min(1).max(1024).nullable().optional(),
  })
  .refine(
    (v) =>
      v.title !== undefined ||
      v.content !== undefined ||
      v.audioKey !== undefined,
    { message: "At least one field to update is required" },
  );

export type UpdateChapterInput = z.infer<typeof UpdateChapterInputSchema>;

export const ReorderChaptersInputSchema = z.object({
  chapterIds: z.array(z.string()).min(1),
});

export type ReorderChaptersInput = z.infer<typeof ReorderChaptersInputSchema>;
