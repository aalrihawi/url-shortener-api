import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { GeneratorHelper } from './helpers/generator.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './entities/url.entity';
import { defaultSchemaPlugin } from 'src/common/plugins/default-schema.plugin';

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
    ]),
  ],
  controllers: [UrlsController],
  providers: [UrlsService, GeneratorHelper],
})
export class UrlsModule {}
