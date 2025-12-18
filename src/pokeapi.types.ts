import { z } from "zod";


export const LocationAreaSchema = z.object({
  id: z.number(),
  name: z.string(),
  game_index: z.number(),
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
  location: z.object({
    name: z.string(),
    url: z.httpUrl()
  }),
  names: z.array(
    z.object({
      name: z.string(),
      language: z.object({
        name: z.string(),
        url: z.httpUrl(),
      }),
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
          version: z.object({
            name: z.string(),
            url: z.httpUrl(),
          }),
          max_chance: z.number(),
          encounter_details: z.array(
            z.object({
              min_level: z.number(),
              max_level: z.number(),
              condition_values: z.array(
                z.object({
                  name: z.string(),
                                   url: z.httpUrl(),
                })
              ),
              chance: z.number(),
              method: z.object({
                name: z.string(),
                url: z.httpUrl(),
              }),
            })
          ),
        })
      ),
    })
  ),
});
