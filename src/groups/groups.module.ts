import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './groups.model';
import { UserGroups } from './user-groups.model';
import { User } from 'src/users/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Group,
      User,
      UserGroups
    ])
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService]
})
export class GroupsModule { }
