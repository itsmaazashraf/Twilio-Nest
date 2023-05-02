import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AudioCallDocument = AudioCall & Document;

@Schema({
  timestamps: true
})
export class AudioCall {
  @Prop({
    required: true,
    unique: true
  })
  sid: string;

  @Prop({
    required: true,
  })
  callStatus: string;

  @Prop()
  audioFileLink: string;

  @Prop({
    required: true,
  })
  callDuration: number;

  @Prop({
    required: true,
  })
  from: string;
}

export const AudioCallSchema = SchemaFactory.createForClass(AudioCall);