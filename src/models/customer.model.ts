import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  email?: string;

  @Prop({ required: true, enum: ['activo', 'prospecto', 'inactivo'], default: 'prospecto' })
  estado: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);