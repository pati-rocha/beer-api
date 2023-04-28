import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { Beer } from 'src/beer/beer.entity';

@Injectable()
export class Database {
  private FILENAME = 'src/database/beers.json';

  public async getBeers(): Promise<Beer[]> {
    const beersInFile = await readFile(this.FILENAME, 'utf-8');
    const beersJson = JSON.parse(beersInFile);
    //console.log(beersJson);
    return beersJson;
  }

  public async writeBeer(beer: Beer) {
    let beers = await this.getBeers();
    if (!beers) {
      beers = [];
    }
    await writeFile(this.FILENAME, JSON.stringify([...beers, beer]));
  }

  public async writeAllBeers(beers: Beer[]) {
    await writeFile(this.FILENAME, JSON.stringify(beers));
  }
}
