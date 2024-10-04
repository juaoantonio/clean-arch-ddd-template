import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

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
 * Decorador personalizado para validar campos de um objeto usando uma função de validação fornecida.
 *
 * @param {(object: any) => boolean} validationFunction - Função que recebe o objeto completo e retorna um booleano indicando se é válido.
 * @param {ValidationOptions} [validationOptions] - Opções adicionais de validação do `class-validator`.
 * @returns {Function} Função decoradora que registra o validador personalizado.
 *
 * @example
 * ```typescript
 * class Usuario {
 *   nome: string;
 *   sobrenome: string;
 *
 *   @ValidateObjectFields(
 *     (obj) => obj.nome !== obj.sobrenome,
 *     { message: "O nome não pode ser igual ao sobrenome." }
 *   )
 *   campoValidado: any;
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
