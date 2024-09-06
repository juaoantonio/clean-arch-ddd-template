import { ExampleEntity } from "@domain/example-entity/example-entity.aggregate";

export interface ExampleEntityRepository {
  save(entity: ExampleEntity): Promise<string>;
  findById(id: string): Promise<ExampleEntity>;
}
