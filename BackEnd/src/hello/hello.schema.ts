import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HelloDocument = HydratedDocument<Hello>;

@Schema()
export class Hello {
    @Prop()
    name: string;
}

export const HelloSchema = SchemaFactory.createForClass(Hello);