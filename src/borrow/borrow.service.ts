import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from '../entities/borrow.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private BorrowRepository: Repository<Borrow>,
  ) {}

  async findAll(): Promise<Borrow[]> {
    return this.BorrowRepository.find();
  }

  findOne(id: number): Promise<Borrow> {
    return this.BorrowRepository.findOneBy({ id });
  }

  async create(borrow: Borrow): Promise<Borrow> {
    return this.BorrowRepository.save(borrow);
  }

  async return(id: number, borrow: Borrow): Promise<boolean> {
    await this.BorrowRepository.update(id, borrow);
    return true;
  }
}