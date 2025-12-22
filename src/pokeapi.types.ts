import { z } from "zod";


// Schema for location areas endpoint
export const LocationsSchema = z.object({
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

export type Locations = z.infer<typeof LocationsSchema>;


// Schema for individual location areas endpoint
export const LocationAreaSchema = z.object({
  id: z.number(),
  name: z.string(),
  game_index: z.number(),

  pokemon_encounters: z.array(
    z.object({
      pokemon: z.object({
        name: z.string(),
        url: z.httpUrl(),
      }),
    })
  ),
});

export type LocationArea = z.infer<typeof LocationAreaSchema>;


// Schema for individual pokemon endpoint (minimal)
export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  weight: z.number(),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      stat: z.object({
        name: z.string(),
        url: z.httpUrl(),
      }),
    })
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.httpUrl(),
      }),
    })
  ),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

