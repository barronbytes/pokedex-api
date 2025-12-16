import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "build to learn",
    expected: ["build", "to", "learn"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
