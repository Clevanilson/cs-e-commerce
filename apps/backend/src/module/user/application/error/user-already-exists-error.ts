import { ApplicationError } from "@shared/error/application-error";

export class UserAlreadyExistsError extends ApplicationError {
  constructor() {
    super("E-mail already registered");
  }
}
