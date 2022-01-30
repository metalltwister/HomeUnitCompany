import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";

export const sequelizeConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const DEFAULT_PSQL_HOST = 'localhost'
    const DEFAULT_PSQL_PORT = 5432

    const database = configService.get('POSTGRES_DB')
    if (database === undefined) {
      throw new Error(
        `Environment variable 'POSTGRES_DB' is not defined`
      )
    }
    console.log({
      db: database,
      host: typeof configService.get('POSTGRES_HOST'),
      port: typeof configService.get('POSTGRES_PORT'),
      dirname: __dirname + '/../',
    })

    return {
      dialect: 'postgres',
      database: database,
      host: configService.get('POSTGRES_HOST') || DEFAULT_PSQL_HOST,
      port: configService.get('POSTGRES_PORT') || DEFAULT_PSQL_PORT,
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      // models: [User, Role, UserRoles, Group, UserGroups, UserFriends],
      // models: [__dirname + '/../**/*.model{.ts,.js}'],
      modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
      },
      autoLoadModels: true,
      retryAttempts: 3
    }
  },
  inject: [ConfigService]
}
