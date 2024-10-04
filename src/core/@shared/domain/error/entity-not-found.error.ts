import { Entity } from "@core/@shared/domain/entity";
import { Identifier } from "@core/@shared/domain/identifier";

/*
 * @class EntityNotFoundError
 * @extends Error
 * @description Domain error thrown when an entity is not found.
 * @constructor Receives the entity ID and the entity class to create an error message indicating the not found IDs.
 */
export class EntityNotFoundError extends Error {
  constructor(
    id: any[] | any,
    entityClass: new (...args: any[]) => Entity<Identifier>,
  ) {
    const idsMessage = Array.isArray(id) ? id.join(", ") : id;
    super(`${entityClass.name} with id(s) ${idsMessage} not found`);
    this.name = "EntityNotFoundError";
  }
}
