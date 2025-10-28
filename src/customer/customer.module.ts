import { Module } from '@nestjs/common';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
