import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGO_URI || 
        'mongodb://crm_admin:crm_pass@localhost:27017/crm_db?authSource=admin'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
}) 


export class AppModule {}
