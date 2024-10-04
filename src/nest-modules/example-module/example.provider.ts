import { ExampleTypeormRepository } from "@core/example/infra/db/typeorm/example-typeorm.repository";
import { Repository } from "typeorm";
import { ExampleModel } from "@core/example/infra/db/typeorm/example.model";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateExampleUseCase } from "@core/example/application/create-example.use-case";
import { IExampleRepository } from "@core/example/domain/example.repository";
import { ExistingProvider, FactoryProvider } from "@nestjs/common";

// https://docs.nestjs.com/fundamentals/custom-providers
export const REPOSITORIES: Record<string, ExistingProvider | FactoryProvider> =
  {
    DEFAULT_EXAMPLE_REPOSITORY: {
      provide: "IExampleRepository",
      useExisting: ExampleTypeormRepository,
    },
    TYPEORM_EXAMPLE_REPOSITORY: {
      provide: ExampleTypeormRepository,
      useFactory: (exampleRepository: Repository<ExampleModel>) => {
        return new ExampleTypeormRepository(exampleRepository);
      },
      inject: [getRepositoryToken(ExampleModel)],
    },
  };

export const USE_CASES: Record<string, ExistingProvider | FactoryProvider> = {
  CREATE_EXAMPLE_USE_CASE: {
    provide: CreateExampleUseCase,
    useFactory: (exampleRepository: IExampleRepository) => {
      return new CreateExampleUseCase(exampleRepository);
    },
    inject: [REPOSITORIES.DEFAULT_EXAMPLE_REPOSITORY.provide],
  },
};

export const EXAMPLE_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
