import { z } from 'zod';

export const NoteSchema = z
  .string()
  .max(200, "Note can't be longer than 200 characters")
  .optional();

export type Note = z.infer<typeof NoteSchema>;
