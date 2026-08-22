import { hashSync, verifySync } from "@node-rs/argon2";
import { DomainError } from "@shared/error/domain-error";

export class Password {
  readonly value: string;

  constructor(value: string) {
    const minLength = 8;
    if (this.isHashed(value)) {
      this.value = value;
      return;
    }
    if (typeof value !== "string" || value.length < minLength) {
      throw new DomainError(
        `Password must be at least ${minLength} characters`,
      );
    }
    this.value = hashSync(value);
  }

  matches(plainText: string): boolean {
    return verifySync(this.value, plainText);
  }

  private isHashed(value: string): boolean {
    return typeof value === "string" && value.startsWith("$argon2");
  }
}
