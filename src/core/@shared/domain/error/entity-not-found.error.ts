import { Entity } from "../entity";
import { Identifier } from "../identifier";

/*
 * @class EntityNotFoundError
 * @extends Error
 * @description Erro de domínio lançado quando uma entidade não é encontrada.
 * @constructor Recebe o id da entidade e a classe da entidade para criar a mensagem de erro informando os ids não encontrados.
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
