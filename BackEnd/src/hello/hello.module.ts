import { Module } from '@nestjs/common';
import { HelloService } from './hello.service';
import { HelloController } from './hello.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HelloSchema } from './hello.schema';
import { Hello } from './hello.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: Hello.name, schema: HelloSchema }])],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule { }
