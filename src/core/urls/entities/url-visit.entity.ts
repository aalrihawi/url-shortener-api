import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UrlVisitDocument = UrlVisit & Document;

@Schema({ collection: 'urlVisits' })
export class UrlVisit {
  @Prop({
    type: Types.ObjectId,
    ref: 'Url',
  })
  urlId: Types.ObjectId;

  @Prop({
    default: null,
  })
  ip: string;
}

export const UrlVisitSchema = SchemaFactory.createForClass(UrlVisit);
