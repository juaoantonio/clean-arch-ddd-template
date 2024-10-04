import { Module } from "@nestjs/common";
import { DatabaseModule } from "./nest-modules/database-module/database.module";
import { ConfigModule } from "./nest-modules/config-module/config.module";
import { ExampleModule } from "./nest-modules/example-module/example.module";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ExampleModule],
})
export class AppModule {}
