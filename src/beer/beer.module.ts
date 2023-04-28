import { Module } from '@nestjs/common';
import { BeerController } from './beer.controller';
import { BeerService } from './beer.service';
import { Database } from 'src/database/database';

@Module({
  controllers: [BeerController],
  providers: [BeerService, Database],
})
export class BeerModule {}
