import { z, ZodError } from "zod";
import { LocationsSchema, Locations } from "./pokeapi.types.js";


const baseURL = "https://pokeapi.co/api/v2/location-area";
const headersGET = {
    Accept: "application/json"
}
// "Result type pattern" => returns data (for success) or error (for failure)
type ApiCallResult<T> =
  | { success: true; data: T }
  | { success: false; error: Error };


// Helper function for GET requests to API
async function fetchApi<T>(
  url: string,
  schema: z.ZodSchema<T>
): Promise<ApiCallResult<T>> {
    const settings = {
        method: "GET",
        headers: headersGET
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


// GET call to location areas endpoint => https://pokeapi.co/api/v2/location-area/{id or name}/
export async function fetchLocations(
    pageURL: string | null
): Promise<ApiCallResult<Locations>> {
    const url = pageURL ?? `${baseURL}?limit=20`;
    return fetchApi(url, LocationsSchema);
}
