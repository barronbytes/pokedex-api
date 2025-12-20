export type CacheEntry<T> = {
    createdAt: number; // save Date.now()
    val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number = 0;

  add<T>(key: string, val: T): void {
    const item: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, item);
  }

  get<T>(key: string): CacheEntry<any> | undefined {
    return this.#cache.get(key);
  }

  #reap(): void {
    const reapTime = Date.now() - this.#interval;

    this.#cache.forEach((item, key) => {
      if (item.createdAt < reapTime) {
        this.#cache.delete(key);
      }
    });
  }
}

