import { Identifier } from "../identifier";
import { v4 as uuidv4, validate as validateUuid } from "uuid";

/**
 * Class representing a Universally Unique Identifier (UUID) as a Value Object.
 * Provides methods for UUID creation and validation.
 */
export class Uuid extends Identifier {
  /**
   * UUID value.
   */
  readonly value: string;

  /**
   * Protected constructor to create a Uuid instance.
   * Validates the UUID after creation.
   *
   * @param {string} [value] - UUID value. If not provided, a new UUID will be generated.
   */
  protected constructor(value?: string) {
    super();
    this.value = value || uuidv4();
    this.validate();
  }

  /**
   * Creates a new Uuid instance with a specified value.
   *
   * @param {string} value - The UUID value to use.
   * @returns {Uuid} New Uuid instance.
   */
  public static create(value: string): Uuid {
    return new Uuid(value);
  }

  /**
   * Creates a new Uuid instance with a randomly generated value.
   *
   * @returns {Uuid} New Uuid instance.
   */
  public static random(): Uuid {
    return new Uuid();
  }

  /**
   * Gets the UUID value.
   *
   * @returns {string} UUID value.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Validates the UUID to ensure it is valid.
   * Throws an error if the UUID is invalid.
   *
   * @private
   */
  private validate(): void {
    const isValidUuid = validateUuid(this.value);

    if (!isValidUuid || !this.value) {
      throw new Error("Invalid UUID");
    }
  }
}
