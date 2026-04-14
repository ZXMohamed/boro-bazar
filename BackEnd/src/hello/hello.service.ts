import { Injectable } from '@nestjs/common';
import { CreateHelloDto } from './dto/create-hello.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HelloDocument } from './hello.schema';
import { Model } from 'mongoose';
import { Hello } from './hello.schema';

@Injectable()
export class HelloService {
  constructor(@InjectModel(Hello.name) private readonly helloModel: Model<HelloDocument>) { }
  async create(createHelloDto: CreateHelloDto) {
    const createdHello = await this.helloModel.create(createHelloDto);
    return createdHello;
  }

  async findAll() {
    return await this.helloModel.find();
  }


}
