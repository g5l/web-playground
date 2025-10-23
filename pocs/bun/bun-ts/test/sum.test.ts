import { describe, it, expect } from "bun:test";
import { sum } from "@/utils/sum";

describe("sum()", () => {
  it("should add two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("Should fail in typed for numbers", () => {
    // @ts-expect-error - strings are not allowed
    // @ts-ignore
    sum("2", "3");
  });
});
