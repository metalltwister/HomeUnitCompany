import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto)
  }

  @Delete()
  deleteUser(@Body() userDto: DeleteUserDto): Promise<string> {
    return this.usersService.deleteUser(userDto)
  }

  // updateUser() { }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Post('/ban')
  banUser(@Body() userDto: BanUserDto): Promise<User> {
    return this.usersService.banUser(userDto)
  }

  // setRole() { }

}
