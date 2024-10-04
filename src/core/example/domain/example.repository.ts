import {
  ExampleAggregateRoot,
  ExampleAggregateRootId,
} from "./example.aggregate";
import { IRepository } from "../../@shared/domain/repository/repository.interface";

export interface IExampleRepository
  extends IRepository<ExampleAggregateRootId, ExampleAggregateRoot> {}
