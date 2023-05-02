import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AudiocallController } from './audiocall.controller';
import { AudioCall, AudioCallSchema } from './audiocall.model';
import { AudiocallService } from './audiocall.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AudioCall.name, schema: AudioCallSchema },
    ])
  ],
  providers: [AudiocallService],
  controllers: [AudiocallController],
})
export class AudiocallModule {}
