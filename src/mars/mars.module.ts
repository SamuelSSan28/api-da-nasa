import { Module } from '@nestjs/common';
import { MarsService } from './mars.service';
import { MarsController } from './mars.controller';

@Module({
  controllers: [MarsController],
  providers: [MarsService]
})
export class MarsModule {}
