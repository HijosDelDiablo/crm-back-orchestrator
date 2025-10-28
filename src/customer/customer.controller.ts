import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('clientes')
export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}

  @Get()
  async getAll(@Query('estado') estado?: string) {
    return this.customersService.findAll(estado ? { estado } : undefined);
  }

  @Post()
  async create(@Body() body: any) {
    return this.customersService.create(body);
  }

  @Get('health')
  async healthCheck() {
    try {
      // Verificar conexión a MongoDB
      await this.customersService.checkConnection();
      
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          mongodb: 'connected'
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}