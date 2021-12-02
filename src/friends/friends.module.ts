import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { UserFriends } from './user-friends.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserFriends])
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
  exports: [FriendsService]
})
export class FriendsModule { }
