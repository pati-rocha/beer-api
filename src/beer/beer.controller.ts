import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest.response';
import { BeerService } from './beer.service';
import { NestResponseBuilder } from 'src/core/http/nest.response.builder';
import { Beer } from './beer.entity';

@Controller('cervejas')
export class BeerController {
  constructor(private service: BeerService) {}

  @Get()
  public async getBeers(@Query('page') page = 0, @Query('size') size = 10) {
    return await this.service.getBeers(page, size);
  }

  @Get(':nameBeer')
  public async getBeer(@Param('nameBeer') name: string) {
    const beer = await this.service.getBeer(name);

    if (!beer) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Cerveja não encontrada!',
      });
    }
    return beer;
  }

  @Post()
  public async createBeer(@Body() beer: Beer): Promise<NestResponse> {
    const beerCreated = await this.service.createBeer(beer);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/cervejas/${beerCreated.name}` })
      .withBody(beerCreated)
      .build();
  }

  @Delete(':nameBeer')
  @HttpCode(204)
  public async destroy(@Param('nameBeer') name: string) {
    const beer = await this.service.getBeer(name);

    if (!beer) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Cerveja não encontrada!',
      });
    }
    await this.service.destroyBeer(name);
  }
}
