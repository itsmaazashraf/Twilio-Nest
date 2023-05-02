import { Controller, Post, Body } from '@nestjs/common';
import { AudiocallService } from './audiocall.service';
import { AudioCallDto } from './dtos/audiocall.dto';

@Controller('audiocall')
export class AudiocallController {
  constructor(private readonly audiocallService: AudiocallService) {}

  @Post('/connect')
  connect() {
    return this.audiocallService.handleConnect();
  }

  @Post('/input')
  input(@Body('Digits') digit: string) {
    return this.audiocallService.handleInput(digit);
  }

  @Post('/end')
  end() {
    return this.audiocallService.handleEndCallRequest();
  }

  @Post('/status')
  status(@Body() callRecord: AudioCallDto) {
    return this.audiocallService.logCall(callRecord);
  }
}

