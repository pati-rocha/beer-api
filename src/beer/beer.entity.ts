//criação da entidade Beer

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TypeBeer } from './type-beer.enum';

export class Beer {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  breweryName: string;

  @IsNotEmpty()
  @IsEnum(TypeBeer)
  type: TypeBeer;
}
