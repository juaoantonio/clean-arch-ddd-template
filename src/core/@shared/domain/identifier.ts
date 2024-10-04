import { ValueObject } from "./value-object";

/**
 * Abstract class representing a unique identifier for entities.
 * Extends the ValueObject class and provides a method to get the identifier value.
 */
export abstract class Identifier extends ValueObject {
  /**
   * Abstract method that must be implemented to return the identifier value.
   *
   * @returns {string} Identifier value.
   */
  public abstract getValue(): string;

  /**
   * Returns the string representation of the identifier.
   *
   * @returns {string} Identifier value as a string.
   */
  public toString(): string {
    return this.getValue();
  }
}
