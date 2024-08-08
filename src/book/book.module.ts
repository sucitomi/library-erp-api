import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from '../entities/book.entity';
import { BookService } from '../book/book.service';
import { BookController } from '../book/book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService]
})
export class BookModule {}