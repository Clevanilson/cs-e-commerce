import { DomainError } from "@shared/error/domain-error";

export const USER_ROLES = ["CUSTOMER", "ADMIN"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export class Role {
  readonly value: UserRole;

  constructor(value: string = "CUSTOMER") {
    if (!USER_ROLES.includes(value as UserRole)) {
      throw new DomainError("Invalid role");
    }
    this.value = value as UserRole;
  }
}
