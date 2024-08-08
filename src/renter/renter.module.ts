import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Renter } from '../entities/renter.entity';
import { RenterService } from '../renter/renter.service';
import { RenterController } from '../renter/renter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Renter])],
  providers: [RenterService],
  controllers: [RenterController],
  exports: [RenterService]
})
export class RenterModule {}