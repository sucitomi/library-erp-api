import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employe } from '../entities/employe.entity';
import { EmployeService } from '../employe/employe.service';
import { EmployeController } from '../employe/employe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employe])],
  providers: [EmployeService],
  controllers: [EmployeController],
})
export class EmployeModule {}