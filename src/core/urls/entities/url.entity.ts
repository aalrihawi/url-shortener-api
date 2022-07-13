import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema({ collection: 'urls' })
export class Url {
  @Prop({
    default: null,
  })
  link: string;

  @Prop({
    default: null,
  })
  longUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
