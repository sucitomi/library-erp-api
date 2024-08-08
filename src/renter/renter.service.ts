import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Renter } from '../entities/renter.entity';

@Injectable()
export class RenterService {
  constructor(
    @InjectRepository(Renter)
    private RenterRepository: Repository<Renter>,
  ) {}

  findAll(): Promise<Renter[]> {
    return this.RenterRepository.find();
  }

  findOne(id: number): Promise<Renter> {
    return this.RenterRepository.findOneBy({ id });
  }

  async create(book: Renter): Promise<Renter> {
    return this.RenterRepository.save(book);
  }

  async update(id: number, book: Renter): Promise<void> {
    await this.RenterRepository.update(id, book);
  }

  async remove(id: number): Promise<void> {
    await this.RenterRepository.delete(id);
  }
}