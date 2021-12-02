import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddFriendDto } from './dto/add-friend.dto';
import { UserFriends } from './user-friends.model';

@Injectable()
export class FriendsService {

  constructor(@InjectModel(UserFriends) private readonly friendsRepository: typeof UserFriends) { }

  async getFriendsByUserId(userId: number): Promise<UserFriends[]> {
    return await this.friendsRepository.findAll({ where: { userId } })
  }
}
