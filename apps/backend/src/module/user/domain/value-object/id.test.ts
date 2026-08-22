import { beforeEach, describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { Id } from "./id.js";

describe(Id.name, () => {
  const validValues = ["550e8400-e29b-41d4-a716-446655440000"];
  const invalidValues = ["not-a-uuid", "", "123"];
  let sut: Id;

  it("generates a uuid", () => {
    expect(sut.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });

  it.each(validValues)("accepts %s", (value) => {
    sut = new Id(value);
    expect(sut.value).toBe(value);
  });

  it.each(invalidValues)("rejects %s", (value) => {
    const sut = () => new Id(value);
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Invalid id");
  });

  beforeEach(() => {
    sut = new Id();
  });
});
