import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

/**
 * Custom decorator to validate that the field is less than another specified field.
 *
 * @param {string} property - The field to compare against.
 * @param {ValidationOptions} [validationOptions] - Additional validation options from `class-validator`.
 * @returns {Function} A decorator function that registers the custom validator.
 *
 * @example
 * ```typescript
 * class Product {
 *   @IsLessThan('maxPrice', { message: 'Min price should be less than max price' })
 *   minPrice: number;
 *
 *   maxPrice: number;
 * }
 * ```
 */
export function IsLessThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "IsLessThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value < relatedValue;
        },
      },
    });
  };
}

/**
 * Custom decorator to validate that the field is greater than another specified field.
 *
 * @param {string} property - The field to compare against.
 * @param {ValidationOptions} [validationOptions] - Additional validation options from `class-validator`.
 * @returns {Function} A decorator function that registers the custom validator.
 *
 * @example
 * ```typescript
 * class Product {
 *   @IsGreaterThan('minPrice', { message: 'Max price should be greater than min price' })
 *   maxPrice: number;
 *
 *   minPrice: number;
 * }
 * ```
 */
export function isGreaterThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "IsGreaterThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value > relatedValue;
        },
      },
    });
  };
}

/**
 * Custom decorator to validate that the field is less than or equal to another specified field.
 *
 * @param {string} property - The field to compare against.
 * @param {ValidationOptions} [validationOptions] - Additional validation options from `class-validator`.
 * @returns {Function} A decorator function that registers the custom validator.
 *
 * @example
 * ```typescript
 * class Product {
 *   @IsLessThanOrEqual('maxPrice', { message: 'Min price should be less than or equal to max price' })
 *   minPrice: number;
 *
 *   maxPrice: number;
 * }
 * ```
 */
export function isLessThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "IsLessThanOrEqual",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value <= relatedValue;
        },
      },
    });
  };
}

/**
 * Custom decorator to validate that the field is greater than or equal to another specified field.
 *
 * @param {string} property - The field to compare against.
 * @param {ValidationOptions} [validationOptions] - Additional validation options from `class-validator`.
 * @returns {Function} A decorator function that registers the custom validator.
 *
 * @example
 * ```typescript
 * class Product {
 *   @IsGreaterThanOrEqual('minPrice', { message: 'Max price should be greater than or equal to min price' })
 *   maxPrice: number;
 *
 *   minPrice: number;
 * }
 * ```
 */
export function isGreaterThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "IsGreaterThanOrEqual",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value >= relatedValue;
        },
      },
    });
  };
}

/**
 * Custom decorator to validate object fields using a provided validation function.
 *
 * @param {(object: any) => boolean} validationFunction - A function that takes the entire object and returns a boolean indicating validity.
 * @param {ValidationOptions} [validationOptions] - Additional validation options from `class-validator`.
 * @returns {Function} A decorator function that registers the custom validator.
 *
 * @example
 * ```typescript
 * class User {
 *   firstName: string;
 *   lastName: string;
 *
 *   @ValidateObjectFields(
 *     (obj) => obj.firstName !== obj.lastName,
 *     { message: "First name cannot be the same as last name." }
 *   )
 *   validatedField: any;
 * }
 * ```
 */
export function ValidateObjectFields(
  validationFunction: (object: any) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "ValidateObjectFields",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validationFunction(args.object);
        },
      },
    });
  };
}
