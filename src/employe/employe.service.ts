import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employe } from '../entities/employe.entity';

@Injectable()
export class EmployeService {
  constructor(
    @InjectRepository(Employe)
    private EmployeRepository: Repository<Employe>,
  ) {}

  findAll(): Promise<Employe[]> {
    return this.EmployeRepository.find();
  }

  findOne(id: number): Promise<Employe> {
    return this.EmployeRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<Employe> {
    return this.EmployeRepository.findOneBy({ username });
  }

  async create(employe: Employe): Promise<Employe> {
    return this.EmployeRepository.save(employe);
  }

  async update(id: number, employe: Employe): Promise<void> {
    await this.EmployeRepository.update(id, employe);
  }

  async remove(id: number): Promise<void> {
    await this.EmployeRepository.delete(id);
  }
}