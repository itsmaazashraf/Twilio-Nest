import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AudiocallService } from './audiocall.service';
import { AudioCallDto } from './dtos/audiocall.dto';
import { CallLogsParamsDto } from './dtos/params.dto';

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

  @Get('/logs')
  logs(@Param() params: CallLogsParamsDto) {
    return this.audiocallService.callLogs(params);
  }
}

