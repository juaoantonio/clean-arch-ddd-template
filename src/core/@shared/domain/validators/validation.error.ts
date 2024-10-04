import { FieldsErrors } from "./validator-fields.interface";

/**
 * Class representing an entity validation error.
 * Extends the native Error class.
 */
export class EntityValidationError extends Error {
  /**
   * Creates an instance of EntityValidationError.
   *
   * @param {FieldsErrors[]} errors - List of field validation errors.
   * @param {string} [message="Invalid entity"] - Error message.
   */
  constructor(
    public errors: FieldsErrors[],
    message = "Invalid entity",
  ) {
    super(message);
    this.name = "EntityValidationError";
  }

  /**
   * Returns the number of errors present.
   *
   * @returns {number} Number of errors.
   */
  countErrors(): number {
    return Object.keys(this.errors).length;
  }
}
