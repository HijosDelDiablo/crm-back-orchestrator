import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(filter?: { estado?: string }) {
    if (filter?.estado) {
      return this.customerRepository.find({ where: { estado: filter.estado } });
    }
    return this.customerRepository.find();
  }

  async create(dto: Partial<Customer>) {
    const created = this.customerRepository.create(dto);
    return this.customerRepository.save(created);
  }

  async checkConnection() {
    // Simple health check: try to count customers
    await this.customerRepository.count();
    return true;
  }
}