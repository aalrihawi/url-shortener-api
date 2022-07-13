import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Request } from 'express';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('shorten')
  create(@Req() req: Request, @Body() createUrlDto: CreateUrlDto) {
    console.log(req.headers['user-agent']);
    return this.urlsService.create(createUrlDto);
  }
}
