import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateUrlVisitDto {
  @IsUrl()
  @IsNotEmpty()
  ip: string;

  @IsOptional()
  urlId: string;
}
