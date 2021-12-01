import { Body, Controller, Delete, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete()
  deleteUser(@Body() userDto: DeleteUserDto): Promise<string> {
    return this.usersService.deleteUser(userDto)
  }

  // updateUser() { }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post('/ban')
  banUser(@Body() userDto: BanUserDto): Promise<User> {
    return this.usersService.banUser(userDto)
  }

  // setRole() { }

}
