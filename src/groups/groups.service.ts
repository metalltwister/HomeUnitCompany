import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './groups.model';

@Injectable()
export class GroupsService {

  constructor(@InjectModel(Group) private readonly groupRepository: typeof Group) { }

  async createGroup(groupDto: CreateGroupDto): Promise<Group> {
    const group = await this.getGroupByTitle(groupDto.title)
    if (!group) {
      return await this.groupRepository.create(groupDto)
    }
    throw new HttpException('Group already exists', HttpStatus.BAD_REQUEST)
  }

  async getAllGroups(): Promise<Group[]> {
    return await this.groupRepository.findAll({ include: { all: true } })
  }

  async getGroupByTitle(title: string): Promise<Group> {
    return await this.groupRepository.findOne({ where: { title } })
  }
}
