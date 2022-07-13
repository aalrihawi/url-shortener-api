import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { HttpErrorFilter } from './common/filters/http-error.filter';
import envConfig from './config/env.config';
import { MongooseConfig } from './config/mongoose.config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envConfig.envFilePath,
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfig }),
    CommonModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
