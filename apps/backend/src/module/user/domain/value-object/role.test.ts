import { describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { Role } from "./role.js";

describe(Role.name, () => {
  const validValues = ["CUSTOMER", "ADMIN"];
  const invalidValues = ["GUEST", "", "customer"];

  it("defaults to CUSTOMER", () => {
    expect(new Role().value).toBe("CUSTOMER");
  });

  it.each(validValues)("accepts %s", (value) => {
    const sut = new Role(value);
    expect(sut.value).toBe(value);
  });

  it.each(invalidValues)("rejects %s", (value) => {
    const sut = () => new Role(value);
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Invalid role");
  });
});
