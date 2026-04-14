import { Controller, Get, Post, Body } from '@nestjs/common';
import { HelloService } from './hello.service';
import { CreateHelloDto } from './dto/create-hello.dto';
import { ValidationPipe } from '@nestjs/common';
@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) { }

  @Post()
  create(@Body(new ValidationPipe()) createHelloDto: CreateHelloDto) {
    return this.helloService.create(createHelloDto);
  }

  @Get()
  findAll() {
    return this.helloService.findAll();
  }


}
