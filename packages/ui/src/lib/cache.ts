type CacheKey = string;

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  autoCache?: boolean; // Automatically cache responses based on access frequency
  storageType?: "cache" | "local" | "session"; // Specifies storage type
}

interface CachedEntry<T> {
  value: T;
  expiration: number;
  accessedAt: number; // Last access timestamp for LRU strategy
}

const CACHE_NAME = "muntaha-cache";
const DEFAULT_TTL = 300000; // 5 minutes
const MAX_CACHE_SIZE = 50; // Max entries in cache

class SetupCache {
  private readonly accessCount: Map<string, number> = new Map<string, number>(); // Track access frequency for auto-cache

  /**
   * Retrieves data from local storage by key.
   * @param key - Unique key associated with the data.
   * @returns The cached data or null if not found.
   */
  private getLocal<T>(key: CacheKey): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const data = JSON.parse(item) as CachedEntry<T>;
    if (Date.now() > data.expiration) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value;
  }

  /**
   * Retrieves data from session storage by key.
   * @param key - Unique key associated with the data.
   * @returns The cached data or null if not found.
   */
  private getSession<T>(key: CacheKey): T | null {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    const data = JSON.parse(item) as CachedEntry<T>;
    if (Date.now() > data.expiration) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data.value;
  }

  /**
   * Retrieves data from Cache Storage by URL.
   * @param url - URL associated with the cached data.
   * @returns The cached data or null if expired or not found.
   */
  private async getCache<T>(url: string): Promise<T | null> {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);
    if (!cachedResponse) return null;

    const data = (await cachedResponse.json()) as CachedEntry<T>;
    if (Date.now() > data.expiration) {
      await cache.delete(url);
      return null;
    }
    return data.value;
  }

  /**
   * Checks if a cached entry exists and is not expired for the specified key and URL.
   * @param key - Unique key associated with the data.
   * @param url - URL associated with the cached data (for Cache Storage).
   * @param storageType - Specifies the storage type ('cache', 'local', or 'session').
   * @returns True if the entry exists and is not expired, otherwise false.
   */
  async has(
    key: CacheKey,
    url: string,
    storageType: "cache" | "local" | "session" = "cache"
  ): Promise<boolean> {
    let exists = false;

    switch (storageType) {
      case "local":
        exists = this.getLocal(key) !== null;
        break;
      case "session":
        exists = this.getSession(key) !== null;
        break;
      default:
        exists = (await this.getCache(url)) !== null;
        break;
    }

    return exists;
  }

  /**
   * Retrieves cached data for a given key and URL from the specified storage type.
   * @param key - Unique key associated with the data.
   * @param url - URL associated with the cached data.
   * @param storageType - Specifies the storage type ('cache', 'local', or 'session').
   * @returns The cached data or null if expired or not found.
   */
  async get<T>(
    key: CacheKey,
    url: string,
    storageType: "cache" | "local" | "session" = "cache"
  ): Promise<T | null> {
    switch (storageType) {
      case "local":
        return this.getLocal<T>(key);
      case "session":
        return this.getSession<T>(key);
      default:
        return await this.getCache<T>(url);
    }
  }

  /**
   * Stores data in local storage.
   * @param key - Unique key associated with the data.
   * @param value - Data to cache.
   * @param expiration - Expiration time in milliseconds.
   */
  private setLocal<T>(key: CacheKey, value: T, expiration: number): void {
    localStorage.setItem(
      key,
      JSON.stringify({ value, expiration, accessedAt: Date.now() })
    );
  }

  /**
   * Stores data in session storage.
   * @param key - Unique key associated with the data.
   * @param value - Data to cache.
   * @param expiration - Expiration time in milliseconds.
   */
  private setSession<T>(key: CacheKey, value: T, expiration: number): void {
    sessionStorage.setItem(
      key,
      JSON.stringify({ value, expiration, accessedAt: Date.now() })
    );
  }

  /**
   * Stores data in Cache Storage.
   * @param url - URL associated with the cached data.
   * @param value - Data to cache.
   * @param expiration - Expiration time in milliseconds.
   */
  private async setCache<T>(
    url: string,
    value: T,
    expiration: number
  ): Promise<void> {
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(
      JSON.stringify({ value, expiration, accessedAt: Date.now() })
    );
    await cache.put(url, response);

    if ((await cache.keys()).length > MAX_CACHE_SIZE) {
      await this.applyLRU(cache);
    }
  }

  /**
   * Caches data with a specified key, URL, and options.
   * @param key - Unique key associated with the data.
   * @param url - URL to associate with the cached data.
   * @param value - Data to cache.
   * @param options - Optional caching options such as TTL, auto-cache, and storage type.
   */
  async set<T>(
    key: CacheKey,
    url: string,
    value: T,
    options: CacheOptions = {}
  ): Promise<void> {
    const ttl = options.ttl ?? DEFAULT_TTL;
    const expiration = Date.now() + ttl;

    switch (options.storageType) {
      case "local":
        this.setLocal(key, value, expiration);
        break;
      case "session":
        this.setSession(key, value, expiration);
        break;
      default:
        await this.setCache(url, value, expiration);
    }
  }

  /**
   * Updates a specific field of an item in the cached array based on a unique key.
   * @param key - Unique key associated with the cached array.
   * @param url - URL associated with the cached data (for Cache Storage).
   * @param field - The field (key) to update (e.g., 'id', 'name', etc.).
   * @param fieldValue - The value of the field to match in the array item.
   * @param updatedField - The updated field value.
   * @param storageType - Specifies the storage type ('cache', 'local', or 'session').
   */
  async updateArrayField<T>(
    key: CacheKey,
    url: string,
    field: keyof T, // The field to update (e.g., 'id', 'name')
    fieldValue: T[keyof T], // The value of the field to match
    updatedField: Partial<T>, // The updated field data (only the specific field to update)
    storageType: "cache" | "local" | "session" = "cache"
  ): Promise<void> {
    let cachedArray: T[] | null;

    // Retrieve the cached array based on storage type
    switch (storageType) {
      case "local":
        cachedArray = this.getLocal<T[]>(key);
        break;
      case "session":
        cachedArray = this.getSession<T[]>(key);
        break;
      default:
        cachedArray = await this.getCache<T[]>(url);
    }

    // If the array exists, update the specified field of the item
    if (cachedArray) {
      // Find the index of the item based on the field and value
      const itemIndex = cachedArray.findIndex(
        (item) => item[field] === fieldValue
      );

      // If the item exists, update the specified field
      if (itemIndex !== -1) {
        // Update the specific field in the item
        cachedArray[itemIndex] = {
          ...cachedArray[itemIndex],
          ...updatedField,
        } as T;

        const expiration =
          Date.now() + (storageType === "cache" ? DEFAULT_TTL : 0);

        // Re-save the updated array back to the storage
        switch (storageType) {
          case "local":
            this.setLocal(key, cachedArray, expiration);
            break;
          case "session":
            this.setSession(key, cachedArray, expiration);
            break;
          default:
            await this.setCache(url, cachedArray, expiration);
        }
      }
    }
  }

  /**
   * Deletes a specific item from an array stored in the cache by key.
   * @param key - Unique key associated with the cached array.
   * @param url - URL associated with the cached data if using Cache Storage.
   * @param item - The specific item to remove from the cached array.
   * @param storageType - Specifies the storage type ('cache', 'local', or 'session').
   */
  async deleteFromArray<T>(
    key: CacheKey,
    url: string,
    item: T,
    storageType: "cache" | "local" | "session" = "cache"
  ): Promise<void> {
    let cachedArray: T[] | null;

    // Retrieve the cached array based on storage type
    switch (storageType) {
      case "local":
        cachedArray = this.getLocal<T[]>(key);
        break;
      case "session":
        cachedArray = this.getSession<T[]>(key);
        break;
      default:
        cachedArray = await this.getCache<T[]>(url);
    }

    // If the array exists, filter out the specified item and re-save it
    if (cachedArray) {
      const updatedArray = cachedArray.filter(
        (i) => JSON.stringify(i) !== JSON.stringify(item)
      );
      const expiration =
        Date.now() + (storageType === "cache" ? DEFAULT_TTL : 0);

      switch (storageType) {
        case "local":
          this.setLocal(key, updatedArray, expiration);
          break;
        case "session":
          this.setSession(key, updatedArray, expiration);
          break;
        default:
          await this.setCache(url, updatedArray, expiration);
      }
    }
  }

  /**
   * Deletes a cached entry by URL.
   * @param url - URL of the cached entry to delete.
   */
  async delete(url: string): Promise<void> {
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(url);
    this.accessCount.delete(url);
  }

  /**
   * Deletes data by key from local storage, session storage, and Cache Storage.
   * @param key - Unique key associated with the data.
   * @param url - URL associated with the cached data (for Cache Storage).
   * @param storageType - Specifies the storage type ('cache', 'local', or 'session').
   */
  async deleteByKey(
    key: CacheKey,
    url: string,
    storageType: "cache" | "local" | "session" = "cache"
  ): Promise<void> {
    switch (storageType) {
      case "local":
        localStorage.removeItem(key);
        break;
      case "session":
        sessionStorage.removeItem(key);
        break;
      default: {
        const cache = await caches.open(CACHE_NAME);
        await cache.delete(url);
        this.accessCount.delete(url);
        break;
      }
    }
  }

  /**
   * Clears all cached data.
   */
  async clearAll(): Promise<void> {
    await caches.delete(CACHE_NAME);
    this.accessCount.clear();
    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * Applies the Least Recently Used (LRU) eviction strategy to manage cache size.
   * @param cache - Cache object to apply LRU eviction on.
   */
  private async applyLRU(cache: Cache): Promise<void> {
    const cacheEntries = await cache.keys();
    const entryDetails = await Promise.all(
      cacheEntries.map(async (request) => {
        const response = await cache.match(request);
        const data = (await response?.json()) as CachedEntry<unknown>;
        return { url: request.url, accessedAt: data.accessedAt };
      })
    );

    // Sort entries by last accessed time (ascending) to find the oldest
    entryDetails.sort((a, b) => a.accessedAt - b.accessedAt);

    // Evict the least recently accessed entries until under limit
    while ((await cache.keys()).length > MAX_CACHE_SIZE) {
      const oldestEntry = entryDetails.shift();
      if (oldestEntry) await cache.delete(oldestEntry.url);
    }
  }

  /**
   * Converts an image URL or file to a Blob for caching.
   * @param imageUrl The URL of the image to convert.
   * @returns A Blob representing the image data.
   */
  async convertImageToBlob(imageUrl: string): Promise<Blob> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
    }
    const blob = await response.blob();
    return blob;
  }

  /**
   * Caches an image from a URL by converting it to a Blob and storing it.
   * @param url URL to associate with the cached image.
   * @param imageUrl The URL of the image to convert and cache.
   * @param ttl Time to live in milliseconds.
   */
  async setMedia(
    url: string,
    imageUrl: string,
    ttl: number = DEFAULT_TTL
  ): Promise<void> {
    const imageBlob = await this.convertImageToBlob(imageUrl);
    const cache = await caches.open(CACHE_NAME);
    const headers = new Headers();
    headers.set("Expires", new Date(Date.now() + ttl).toUTCString());
    const response = new Response(imageBlob, { headers });
    await cache.put(url, response);
  }

  /**
   * Retrieves a cached image Blob by URL.
   * @param url - URL associated with the cached image.
   * @returns A Blob representing the cached image data or null if expired or not found.
   */
  async getMedia(url: string): Promise<Blob | null> {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);
    if (!cachedResponse) return null;

    const data = (await cachedResponse.json()) as CachedEntry<unknown>;
    if (Date.now() > data.expiration) {
      await cache.delete(url);
      return null;
    }
    return await cachedResponse.blob();
  }
}

// Export an instance of SetupCache
export const muntahaCache = new SetupCache();
