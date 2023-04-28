import { ConflictException, Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { Beer } from './beer.entity';

@Injectable()
export class BeerService {
  constructor(private database: Database) {}

  public async createBeer(beer: Beer): Promise<Beer> {
    //const beers = await this.database.getBeers();
    //const beerExist = beers.find(
    //(findbeer) => findbeer.name.toLowerCase() == beer.name.toLowerCase(),
    //);
    const beerExist = await this.getBeer(beer.name);

    if (beerExist) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Nome da cerveja já existe!',
      });
    }
    await this.database.writeBeer(beer);
    return beer;
  }

  public async getBeer(name: string): Promise<Beer> {
    const beers = await this.database.getBeers();
    const beerExist = beers.find(
      (beer) => beer.name.toLowerCase() === name.toLowerCase(),
    );
    return beerExist;
  }

  public async getBeers(page: number, size: number) {
    const indexInit = page * size;
    const indexEnd = indexInit + size;

    const beers = await this.database.getBeers();
    if (beers.length > indexInit) {
      if (beers.length > indexEnd) {
        return beers.slice(indexInit, indexEnd);
      } else {
        return beers.slice(indexInit, beers.length);
      }
    } else {
      return [];
    }
  }

  public async destroyBeer(name: string) {
    const beers = await this.database.getBeers();
    const newList = beers.filter(
      (beer) => beer.name.toLowerCase() != name.toLowerCase(),
    );
    await this.database.writeAllBeers(newList);
  }
}
