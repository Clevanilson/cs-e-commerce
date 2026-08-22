import { DomainError } from "@shared/error/domain-error";

export class Email {
  readonly value: string;

  constructor(value: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== "string") {
      throw new DomainError("Invalid email");
    }
    const normalized = value.trim().toLowerCase();
    if (!pattern.test(normalized)) {
      throw new DomainError("Invalid email");
    }
    this.value = normalized;
  }
}
