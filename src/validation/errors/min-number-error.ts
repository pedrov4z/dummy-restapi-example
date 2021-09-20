export class MinNumberError extends Error {
  constructor (readonly number: number) {
    super(`Value should be at least ${number}`);
    this.name = "MinNumberError";
  }
}
