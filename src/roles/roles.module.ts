import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { UserRoles } from './user-roles.model';
import { RolesResolver } from './roles.resolver';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Role,
      User,
      UserRoles
    ])
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesResolver],
  exports: [RolesService]
})
export class RolesModule { }
