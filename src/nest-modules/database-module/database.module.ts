import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CONFIG_SCHEMA_TYPE } from "../config-module/config.module";
import { ExampleModel } from "@core/example/infra/db/typeorm/example.model";
import { TypeOrmModule } from "@nestjs/typeorm";

const MODELS = [ExampleModel];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const vendor = configService.get("DB_VENDOR");
        switch (vendor) {
          case "mysql":
            return {
              entities: configService.get("DB_AUTO_LOAD_MODELS") ? [] : MODELS,
              type: "mysql",
              host: configService.get("DB_HOST"),
              database: configService.get("DB_DATABASE"),
              port: configService.get("DB_PORT"),
              username: configService.get("DB_USERNAME"),
              password: configService.get("DB_PASSWORD"),
              logging: configService.get("DB_LOGGING"),
              autoLoadEntities: configService.get("DB_AUTO_LOAD_MODELS"),
              synchronize: configService.get("DB_SYNCHRONIZE"),
            };
          case "sqlite":
            return {
              entities: configService.get("DB_AUTO_LOAD_MODELS") ? [] : MODELS,
              type: "sqlite",
              host: configService.get("DB_HOST"),
              synchronize: configService.get("DB_SYNCHRONIZE"),
              database: configService.get("DB_DATABASE"),
            };
          default:
            throw new Error(
              `Fornecedor de banco de dados desconhecido: ${vendor}`,
            );
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
