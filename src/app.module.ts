import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { config, gqlConfig, sequelizeConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    SequelizeModule.forRootAsync(sequelizeConfig),
    GraphQLModule.forRootAsync(gqlConfig),
    UsersModule,
    RolesModule,
    AuthModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
