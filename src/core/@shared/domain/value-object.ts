import isEqual from "lodash/isEqual";

/**
 * Abstract class representing a Value Object in DDD.
 * Value Objects are immutable objects defined by their attributes.
 */
export abstract class ValueObject {
  /**
   * Checks if the current Value Object is equal to another.
   *
   * @param {this} vo - Another value object to be compared.
   * @returns {boolean} True if the objects are equal, false otherwise.
   */
  public equals(vo: this): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(this, vo);
  }
}
