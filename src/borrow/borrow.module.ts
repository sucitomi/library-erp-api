import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Borrow } from '../entities/borrow.entity';
import { BorrowService } from '../borrow/borrow.service';
import { BookModule } from '../book/book.module';
import { RenterModule } from '../renter/renter.module';
import { BorrowController } from '../borrow/borrow.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow]),BookModule,RenterModule],
  providers: [BorrowService],
  controllers: [BorrowController],
})
export class BorrowModule {}