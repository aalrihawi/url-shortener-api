import { IsNotEmpty, IsUrl } from 'class-validator';

export class FindOneParams {
  @IsUrl()
  @IsNotEmpty()
  link: string;
}
