import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsUrl()
  longUrl: string;

  @IsOptional()
  link: string;
}
