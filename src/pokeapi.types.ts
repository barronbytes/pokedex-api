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

  location: z.object({
    name: z.string(),
    url: z.httpUrl(),
  }),

  names: z.array(
    z.object({
      language: z.object({
        name: z.string(),
        url: z.httpUrl(),
      }),
      name: z.string(),
    })
  ),

  encounter_method_rates: z.array(
    z.object({
      encounter_method: z.object({
        name: z.string(),
        url: z.httpUrl(),
      }),
      version_details: z.array(
        z.object({
          rate: z.number(),
          version: z.object({
            name: z.string(),
            url: z.httpUrl(),
          }),
        })
      ),
    })
  ),

  pokemon_encounters: z.array(
    z.object({
      pokemon: z.object({
        name: z.string(),
        url: z.httpUrl(),
      }),
      version_details: z.array(
        z.object({
          encounter_details: z.array(
            z.object({
              chance: z.number(),
              condition_values: z.array(z.any()),
              max_level: z.number(),
              min_level: z.number(),
              method: z.object({
                name: z.string(),
                url: z.httpUrl(),
              }),
            })
          ),
          max_chance: z.number(),
          version: z.object({
            name: z.string(),
            url: z.httpUrl(),
          }),
        })
      ),
    })
  ),
});

export type LocationArea = z.infer<typeof LocationAreaSchema>;


// Schema for individual pokemon endpoint (minimal)
export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

