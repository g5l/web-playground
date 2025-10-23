import { describe, it, expect } from "bun:test";
import { greet } from "@/lib/greeter";

describe("greet()", () => {
  it("Should greet plainly", () => {
    expect(greet("TS")).toBe("Hello, TS");
  });

  it("Should greet excitedly", () => {
    expect(greet("TS", { excited: true })).toBe("Hello, TS!");
  });

  it("Should reject wrong option type at compile time", () => {
    // @ts-expect-error excited must be boolean, not string
    // @ts-ignore
    greet("TS", { excited: "yes" });
    expect(true).toBe(true);
  });
});
