import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FriendsModule } from 'src/friends/friends.module';
import { UserFriends } from 'src/friends/user-friends.model';
import { Group } from 'src/groups/groups.model';
import { GroupsModule } from 'src/groups/groups.module';
import { UserGroups } from 'src/groups/user-groups.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Group,
      UserGroups,
      UserFriends
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
    GroupsModule,
    FriendsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
