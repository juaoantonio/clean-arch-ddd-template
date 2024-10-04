import { AggregateRoot } from "@core/@shared/domain/aggregate-root";

/*
  Interface que define os métodos necessários para mapear um modelo de banco de dados para um modelo de domínio e vice-versa.
  @template E - Tipo do modelo de domínio.
  @template M - Tipo do modelo de banco de dados.
 */
export interface IModelMapper<E extends AggregateRoot<any>, M> {
  toModel(aggregate: E): M;

  toDomain(model: M): E;
}
