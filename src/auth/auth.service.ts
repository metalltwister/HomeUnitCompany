import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByPhone(userDto.phone)
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
    return this.generateToken(user)
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByPhone(userDto.phone)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' })
  }

  private generateToken(user: User) {
    const payload = { id: user.id, phone: user.phone, roles: user.roles }
    return { jwtToken: this.jwtService.sign(payload) }
  }

}
