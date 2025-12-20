export type CacheEntry<T> = {
  cachedAt: number;  // timestamp when this API response was cached
  response: T;       // the actual PokeAPI response
};

export class PokeApiCache {
  #responsesByUrl = new Map<string, CacheEntry<any>>(); // keyed by PokeAPI URL
  #reapTimerId: NodeJS.Timeout | undefined = undefined;
  #reapDelayMs: number;  // delay between automatic cleanup runs in milliseconds

  constructor(reapDelayMs: number) {
    this.#reapDelayMs = reapDelayMs;
    this.#startReapLoop();
  }

  /** Add a PokeAPI response to the cache under the given URL */
  addResponse<T>(url: string, apiResponse: T): void {
    const cacheEntry: CacheEntry<T> = {
      cachedAt: Date.now(),
      response: apiResponse,
    };
    this.#responsesByUrl.set(url, cacheEntry);
  }

  /** Retrieve a cached PokeAPI response by URL, or undefined if not cached */
  getResponse<T>(url: string): CacheEntry<any> | undefined {
    return this.#responsesByUrl.get(url);
  }

  /** Remove any cached responses that are older than the delay */
  #reap(): void {
    const expirationTime = Date.now() - this.#reapDelayMs;

    this.#responsesByUrl.forEach((cacheEntry, url) => {
      if (cacheEntry.cachedAt < expirationTime) {
        this.#responsesByUrl.delete(url);
      }
    });
  }

  /** Start the automatic reaping loop to clean old cache entries */
  #startReapLoop(): void {
    this.#reapTimerId = setInterval(() => this.#reap(), this.#reapDelayMs);
  }

  /** Stop the automatic reaping loop */
  stopReapLoop(): void {
    if (this.#reapTimerId) {
      clearInterval(this.#reapTimerId);
      this.#reapTimerId = undefined;
    }
  }
}
