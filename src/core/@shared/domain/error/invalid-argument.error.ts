/*
 * @class InvalidArgumentError
 * @extends Error
 * @description Domain error thrown when an invalid argument is passed to a method.
 */
export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidArgumentError";
  }
}
