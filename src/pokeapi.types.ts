import { z } from "zod";

export const PaginationSchema = z.object({
  count: z.number(),
  next: z.httpUrl().nullable(),
  previous: z.httpUrl().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.httpUrl(),
    })
  ),
});

export type Pagination = z.infer<typeof PaginationSchema>;

