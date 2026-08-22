import { DomainError } from "@shared/error/domain-error";

export class Name {
  readonly value: string;

  constructor(value: string) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new DomainError("Name is required");
    }
    this.value = value.trim();
  }
}
