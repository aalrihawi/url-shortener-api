import { Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseData } from 'src/common/types/response-data';
import { ConfigService } from '@nestjs/config';
import { GeneratorHelper } from '../helpers/generator.helper';
import { CreateUrlDto } from '../dto/create-url.dto';
import { Url, UrlDocument } from '../entities/url.entity';

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

  async findOne(filter: FilterQuery<UrlDocument>, projection?: any) {
    const findOneResponse = new ResponseData<UrlDocument>();

    const url = await this.urlModel.findOne(filter, projection).exec();

    if (!url) {
      findOneResponse.error = 'URL_DOES_NOT_EXIST';
      return findOneResponse;
    }

    findOneResponse.data = url;
    findOneResponse.success = 'URL_FETCHED_SUCCESSFULLY';

    return findOneResponse;
  }
}
