import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private BookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.BookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.BookRepository.findOneBy({ id });
  }

  async create(book: Book): Promise<Book> {
    return this.BookRepository.save(book);
  }

  async update(id: number, book: Book): Promise<void> {
    await this.BookRepository.update(id, book);
  }

  async remove(id: number): Promise<void> {
    await this.BookRepository.delete(id);
  }
}