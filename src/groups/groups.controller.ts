import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './groups.model';
import { GroupsService } from './groups.service';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {

  constructor(private readonly groupsService: GroupsService) { }

  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Group })
  @Post()
  createGroup(@Body() roleDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(roleDto)
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: HttpStatus.OK, type: [Group] })
  @Get()
  getAllGroups(): Promise<Group[]> {
    return this.groupsService.getAllGroups()
  }

  @ApiOperation({ summary: 'Get group by title' })
  @ApiResponse({ status: HttpStatus.OK, type: Group })
  @Get(':groupTitle')
  getGroupByTitle(@Param('groupTitle') groupTitle: string): Promise<Group> {
    return this.groupsService.getGroupByTitle(groupTitle)
  }

}
