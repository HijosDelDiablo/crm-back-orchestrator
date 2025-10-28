import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CustomerDocument, Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  async findAll(filter?: { estado?: string }) {
    const query = filter?.estado ? { estado: filter.estado } : {};
    return this.customerModel.find(query).lean().exec();
  }

  async create(dto: Partial<Customer>) {
    const created = new this.customerModel(dto);
    return created.save();
  }

  async checkConnection() {
    return this.connection.db?.admin().ping() || null;
  }
}