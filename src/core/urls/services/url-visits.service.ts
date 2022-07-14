import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseData } from 'src/common/types/response-data';
import { CreateUrlVisitDto } from '../dto/create-url-visit.dto';
import { UrlVisit, UrlVisitDocument } from '../entities/url-visit.entity';
import { UrlsService } from './urls.service';

@Injectable()
export class UrlVisitsService {
  constructor(
    @InjectModel(UrlVisit.name) private urlStatModel: Model<UrlVisitDocument>,
    private urlsService: UrlsService,
  ) {}

  async create(createUrlVisitDto: CreateUrlVisitDto) {
    const createResponse = new ResponseData<UrlVisit>();

    // // const findOneRes = await this.urlsService.findOne({
    // //   shotUrl: createUrlVisitDto.shortUrl,
    // // });

    // // if (!findOneRes.data) {
    // //   return createResponse;
    // // }

    // createUrlVisitDto.urlId = findOneRes.data.id;

    const newUrlVisit = await this.urlStatModel.create(createUrlVisitDto);
    if (!newUrlVisit) {
      createResponse.error = 'URL_VISIT_CREATION_FAILED';
      return createResponse;
    }

    createResponse.data = newUrlVisit;

    createResponse.success = 'URL_VISIT_CREATED_SUCCESSFULLY';
    return createResponse;
  }
}
