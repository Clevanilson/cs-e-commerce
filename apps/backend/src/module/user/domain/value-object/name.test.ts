import { describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { Name } from "./name.js";

describe(Name.name, () => {
  const validValues: Array<[string, string]> = [
    ["Ada", "Ada"],
    ["  Ada Lovelace  ", "Ada Lovelace"],
  ];
  const invalidValues = ["", "   "];

  it.each(validValues)("accepts %s", (value, expected) => {
    const sut = new Name(value);
    expect(sut.value).toBe(expected);
  });

  it.each(invalidValues)("rejects %s", (value) => {
    const sut = () => new Name(value);
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Name is required");
  });
});
