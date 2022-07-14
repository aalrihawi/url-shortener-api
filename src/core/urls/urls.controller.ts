import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Query,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UrlsService } from './services/urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Request, Response } from 'express';
import { FindOneParams } from './dto/findone-params';
import { UrlVisitInterceptor } from './interceptors/url-visit.interceptor';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('shorten')
  create(@Req() req: Request, @Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.create(createUrlDto);
  }

  @Get('findone')
  @UseInterceptors(UrlVisitInterceptor)
  async findOne(@Res() res: Response, @Query() queryParams: FindOneParams) {
    const filter = { link: queryParams.link };
    const findOneResponse = await this.urlsService.findOne(filter);

    if (!findOneResponse.data) {
      return res.status(HttpStatus.NOT_FOUND).send(findOneResponse);
    }

    return res.status(HttpStatus.CREATED).send(findOneResponse);
  }
}
