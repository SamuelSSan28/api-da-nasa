import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { MarsService } from './mars.service';

@Controller('mars')

export class MarsController {
  constructor(private readonly marsService: MarsService) {}

  @Post(':input')
  @HttpCode(200)
  move(@Param('input') input: string) {
    return this.marsService.move(input);
  }
}
