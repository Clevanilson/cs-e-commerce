import { describe, expect, it } from "vitest";
import { DomainError } from "@shared/error/domain-error";
import { Email } from "./email.js";

describe(Email.name, () => {
  const validValues = [
    "gustave@example.com",
    "dante.sparda@example.com",
    "nero+yamato@example.org",
    "leon.strohl@elda.co.uk",
    "lune@b.co",
    "junah_eliada@mail.com",
    "123@example.com",
    "sciel@sub.lumiere.com",
    "makoto.yuki@mail-server.io",
    "joker@persona.net",
  ];
  const invalidValues = [
    "invalid",
    "",
    "maelle@",
    "@example.com",
    "maelle@example",
    "maelle example.com",
    "maelle@.com",
    "maelle@example.",
    "maelle@@example.com",
    "ren amamiya@example.com",
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
