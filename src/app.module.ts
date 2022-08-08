import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MarsModule } from './mars/mars.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    MarsModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
