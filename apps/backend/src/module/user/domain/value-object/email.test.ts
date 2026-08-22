import { describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { Email } from "./email.js";

describe(Email.name, () => {
  const validValues = [
    "ada@example.com",
    "user.name@example.com",
    "user+tag@example.org",
    "first.last@company.co.uk",
    "a@b.co",
    "user_name@mail.com",
    "123@example.com",
    "contact@sub.domain.com",
    "jane.doe@mail-server.io",
    "test@example.net",
  ];
  const invalidValues = [
    "invalid",
    "",
    "ada@",
    "@example.com",
    "ada@example",
    "ada example.com",
    "ada@.com",
    "ada@example.",
    "ada@@example.com",
    "user name@example.com",
  ];

  it.each(validValues)("accepts %s", (value) => {
    const sut = new Email(value);
    expect(sut.value).toBe(value);
  });

  it.each(invalidValues)("rejects %s", (value) => {
    const sut = () => new Email(value);
    expect(sut).toThrow(DomainError);
    expect(sut).toThrow("Invalid email");
  });
});
