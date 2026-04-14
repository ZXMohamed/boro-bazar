import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelloModule } from './hello/hello.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/e-commerce'), HelloModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
