import { Module } from '@nestjs/common';
import { UrlsService } from './services/urls.service';
import { UrlsController } from './urls.controller';
import { GeneratorHelper } from './helpers/generator.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './entities/url.entity';
import { defaultSchemaPlugin } from 'src/common/plugins/default-schema.plugin';
import { UrlVisitsService } from './services/url-visits.service';
import { UrlVisit, UrlVisitSchema } from './entities/url-visit.entity';
import { UrlVisitInterceptor } from './interceptors/url-visit.interceptor';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Url.name,
        useFactory: () => {
          const schema = UrlSchema;
          schema.plugin(defaultSchemaPlugin);
          return schema;
        },
      },
      {
        name: UrlVisit.name,
        useFactory: () => {
          const schema = UrlVisitSchema;
          schema.plugin(defaultSchemaPlugin);
          return schema;
        },
      },
    ]),
  ],
  controllers: [UrlsController],
  providers: [
    UrlsService,
    GeneratorHelper,
    UrlVisitsService,
    UrlVisitInterceptor,
  ],
})
export class UrlsModule {}
