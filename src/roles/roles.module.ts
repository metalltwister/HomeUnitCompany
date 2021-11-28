import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Role])
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule { }
