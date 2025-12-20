import { PokeApiCache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    url: "https://example.com",
    response: { data: "testdata" },
    reapDelayMs: 500, // 0.5 seconds
  },
  {
    url: "https://example.com/path",
    response: { data: "moretestdata" },
    reapDelayMs: 1000, // 1 second
  },
])("PokeApiCache automatically reaps after $reapDelayMs ms", async ({ url, response, reapDelayMs }) => {
  const cache = new PokeApiCache(reapDelayMs);

  // Add response to cache
  cache.addResponse(url, response);

  // Check cache has response
  const cached = cache.getResponse(url);
  expect(cached).not.toBeUndefined();
  expect(cached?.response).toEqual(response);

  // Wait past the reap timeout
  await new Promise((resolve) => setTimeout(resolve, reapDelayMs + 300));

  // Check cache is empty
  const reaped = cache.getResponse(url);
  expect(reaped).toBeUndefined();

  // Stop the reap loop to clean up the timer
  cache.stopReapLoop();
});
