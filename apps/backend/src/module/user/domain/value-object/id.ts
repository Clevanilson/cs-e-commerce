import { randomUUID } from "node:crypto";
import { DomainError } from "@shared/error/domain-error";

export class Id {
  readonly value: string;

  constructor(value?: string) {
    const pattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    this.value = value ?? randomUUID();
    if (!pattern.test(this.value)) {
      throw new DomainError("Invalid id");
    }
  }
}
