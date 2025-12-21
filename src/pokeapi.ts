import { z, ZodError } from "zod";
import * as PokeTypes from "./pokeapi.types.js";


// "Result type pattern" => returns data (for success) or error (for failure)
export type ApiCallResult<T> =
  | { success: true; data: T }
  | { success: false; error: Error };


// Returns base location url for endpoints
export function getLocationURL(): string {
    return process.env.BASE_LOCATION_URL || "https://pokeapi.co/api/v2/location-area";
}


// Returns base location url for endpoints
export function getPokemonURL(): string {
    return process.env.BASE_POKEMON_URL || "https://pokeapi.co/api/v2/pokemon";
}


// Returns headers for GET request
export function getHeadersGET(): Record<string, string> {
    return {
        Accept: "application/json"
    };
}


// Helper function for GET requests to API
async function fetchApi<T>(
  url: string,
  schema: z.ZodSchema<T>
): Promise<ApiCallResult<T>> {
    const settings = {
        method: "GET",
        headers: getHeadersGET()
    }

    try {
        const response = await fetch(url, settings);
        // Handle failure of getting the response (network or HTTP error)
        if (!response.ok) {
            return {
                success: false, 
                error: new Error(`HTTP error! Status: ${response.status}`)
            };
        }

        // At this point, response is a Response object
        // pokemonRawData is a plain JavaScript object (parsed JSON)
        const pokemonRawData = await response.json();

        // Validate with Zod
        const pokemonValidatedData = schema.parse(pokemonRawData);

        return {
            success: true,
            data: pokemonValidatedData
        };
    } catch(error: unknown) {
        if (error instanceof Error && error.message.startsWith("HTTP error!")) {
            return { 
                success: false, 
                error: new Error("Response failure: " + error.message, { cause: error }) 
            };
        }
        if (error instanceof ZodError) {
            return {
                success: false,
                error: new Error("Validation failure: " + JSON.stringify(error.issues, null, 2))
            };
        }
        return {
            success: false,
            error: new Error(`Unexpected failure: ${error}`)
        };
    }
}


// GET call to location areas endpoint
export async function fetchLocations(
    pageURL: string | null
): Promise<ApiCallResult<PokeTypes.Locations>> {
    const url = pageURL ?? `${getLocationURL()}?limit=20`;
    return fetchApi(url, PokeTypes.LocationsSchema);
}


// GET call to INDIVIDUAL location area endpoint
export async function fetchLocationArea(
    pageURL: string | null
): Promise<ApiCallResult<PokeTypes.LocationArea>> {
    if (!pageURL) {
        return {
            success: false,
            error: new Error("Location area URL is required")
        };
    }

    return fetchApi(pageURL, PokeTypes.LocationAreaSchema);
}

// GET call to INDIVIDUAL pokemon endpoint
// GET call to INDIVIDUAL pokemon endpoint
export async function fetchPokemon(
    pageURL: string | null
): Promise<ApiCallResult<PokeTypes.Pokemon>> {
    if (!pageURL) {
        return {
            success: false,
            error: new Error("Pokemon URL is required")
        };
    }

    return fetchApi(pageURL, PokeTypes.PokemonSchema);
}
