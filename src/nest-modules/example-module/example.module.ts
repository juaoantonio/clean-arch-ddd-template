import { Module } from "@nestjs/common";
import { ExampleController } from "./example.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExampleModel } from "@core/example/infra/db/typeorm/example.model";
import { EXAMPLE_PROVIDERS } from "./example.provider";

@Module({
  imports: [TypeOrmModule.forFeature([ExampleModel])],
  controllers: [ExampleController],
  providers: [
    ...Object.values(EXAMPLE_PROVIDERS.REPOSITORIES),
    ...Object.values(EXAMPLE_PROVIDERS.USE_CASES),
  ],
})
export class ExampleModule {}
