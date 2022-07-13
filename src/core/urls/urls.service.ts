import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseData } from 'src/common/types/response-data';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url, UrlDocument } from './entities/url.entity';
import { GeneratorHelper } from './helpers/generator.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    private generatorHelper: GeneratorHelper,
    private configService: ConfigService,
  ) {}

  async create(createUrlDto: CreateUrlDto) {
    const createResponse = new ResponseData<Url>();

    const baseUrl = this.configService.get('BASE_URL');
    createUrlDto.link = `${baseUrl}/${this.generatorHelper.randString()}`;

    const newUrl = await this.urlModel.create(createUrlDto);
    if (!newUrl) {
      createResponse.error = 'URL_GENERATION_FAILED';
      return createResponse;
    }

    createResponse.data = newUrl;

    createResponse.success = 'URL_GENERATED_SUCCESSFULLY';
    return createResponse;
  }
}
