import { ConfigModule, ConfigService } from "@nestjs/config";
import { GqlModuleAsyncOptions } from "@nestjs/graphql";

export const gqlConfig: GqlModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    autoSchemaFile: 'schema.graphql',
    playground: configService.get('NODE_ENV') !== 'production',
    context: ({ req, res }): { req: Request, res: Response } => ({
      req,
      res
    }),
    tracing: configService.get('NODE_ENV') !== 'production',
  }),
  inject: [ConfigService]
}
