import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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

  @Get('/logs')
  logs(@Param('recordsPerPage') recordsPerPage: number, @Param('page') page: number) {
    return this.audiocallService.callLogs(recordsPerPage, page);
  }
}

