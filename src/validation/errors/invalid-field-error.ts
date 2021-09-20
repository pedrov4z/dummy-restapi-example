export class InvalidFieldError extends Error {
  constructor (readonly fieldName: string) {
    super(`Value of '${fieldName}' is invalid`);
    this.name = "InvalidFieldError";
  }
}
