import { describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { Name } from "./name.js";

describe(Name.name, () => {
  const validValues: Array<[string, string]> = [
    ["Maelle", "Maelle"],
    ["  Dante Sparda  ", "Dante Sparda"],
    ["Eiselin Hulkenberg", "Eiselin Hulkenberg"],
    ["  Ren Amamiya  ", "Ren Amamiya"],
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
