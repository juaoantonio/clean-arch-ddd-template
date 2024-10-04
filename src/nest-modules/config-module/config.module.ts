import { Module } from "@nestjs/common";
import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions,
} from "@nestjs/config";
import { join } from "path";
import Joi from "joi";

type DB_SCHEMA_TYPE = {
  DB_VENDOR: "mysql" | "sqlite";
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_LOGGING: boolean;
  DB_AUTO_LOAD_MODELS: boolean;
  DB_SYNCHRONIZE?: boolean;
};

export type CONFIG_SCHEMA_TYPE = DB_SCHEMA_TYPE;

export const CONFIG_DB_SCHEMA: Joi.StrictSchemaMap<DB_SCHEMA_TYPE> = {
  DB_VENDOR: Joi.string().required().valid("mysql", "sqlite"),
  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().when("DB_VENDOR", {
    is: "mysql",
    then: Joi.required(),
  }),
  DB_USERNAME: Joi.string().when("DB_VENDOR", {
    is: "mysql",
    then: Joi.required(),
  }),
  DB_PASSWORD: Joi.string().when("DB_VENDOR", {
    is: "mysql",
    then: Joi.required(),
  }),
  DB_PORT: Joi.number().integer().when("DB_VENDOR", {
    is: "mysql",
    then: Joi.required(),
  }),
  DB_LOGGING: Joi.boolean().required(),
  DB_AUTO_LOAD_MODELS: Joi.boolean().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
};

// https://docs.nestjs.com/modules#dynamic-modules
// https://docs.nestjs.com/techniques/configuration#configuration
@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}) {
    const { envFilePath, ...otherOptions } = options;
    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath! : [envFilePath!]),
        join(process.cwd(), "envs", `.env.${process.env.NODE_ENV!}`),
        join(process.cwd(), "envs", `.env`),
      ],
      validationSchema: Joi.object({
        ...CONFIG_DB_SCHEMA,
      }),
      ...otherOptions,
    });
  }
}
