import { z } from "zod";

export const inputSchema = z.object({
  text: z.string().min(1, { message: "Text is required" }),
});

export type inputSchemaType = z.infer<typeof inputSchema>;
