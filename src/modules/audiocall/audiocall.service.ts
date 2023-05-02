import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import * as Twilio from 'twilio';

import { AudioCall, AudioCallDocument } from './audiocall.model';
import { voicePrompts } from './constants/twilio';
import { AudioCallDto } from './dtos/audiocall.dto';

const CONNECT_URL = '/api/v1/audioCall/connect';
const END_URL = '/api/v1/audioCall/end';
const INPUT_URL = '/api/v1/audioCall/input';

@Injectable()
export class AudiocallService {
  constructor(
    @InjectModel(AudioCall.name)
    private audiocallModel: Model<AudioCallDocument>,
  ) {}

  handleConnect(): VoiceResponse {
    const response = new Twilio.twiml.VoiceResponse();
    const inputRequest = response.gather({
      numDigits: 1,
      action: INPUT_URL,
      method: 'POST',
      timeout: 5,
    });
    inputRequest.say(voicePrompts.WELCOME_CALL);

    response.redirect(
      {
        method: 'POST',
      },
      CONNECT_URL,
    );

    return response.toString();
  }

  handleInput(digit: string) {
    const response = new Twilio.twiml.VoiceResponse();

    if (!digit) {
      response.redirect(
        {
          method: 'POST',
        },
        CONNECT_URL,
      );
    }
    if (digit === '1') {
      response.say(voicePrompts.CONNECTING_SUPPORT);
      response.dial(
        {
          action: END_URL,
        },
        process.env.TWILIO_PHONE_NUMBER,
      );
    } else if (digit === '2') {
      response.say(voicePrompts.VOICEMAIL);
      response.record({ transcribe: true, maxLength: 30, playBeep: true });

      response.redirect(
        {
          method: 'POST',
        },
        END_URL,
      );
    } else {
      response.say(voicePrompts.INVALID_OPTION);
      response.pause({
        length: 2,
      });
      response.redirect(
        {
          method: 'POST',
        },
        CONNECT_URL,
      );
    }
  }

  handleEndCallRequest(): VoiceResponse {
    const response = new Twilio.twiml.VoiceResponse();
    response.say(voicePrompts.GOODBYE);
    response.hangup();

    return response.toString();
  }

  logCall(callRecord: AudioCallDto): Promise<AudioCall> {
    return this.audiocallModel.create({
      sid: callRecord.CallSid,
      callDuration: callRecord.CallDuration,
      callStatus: callRecord.CallStatus,
      from: callRecord.From,
      audioFileLink: callRecord.RecordingUrl,
    });
  }

  async callLogs(recordsPerPage: number, page: number = 1): Promise<AudioCall[]> {
    const records = recordsPerPage || +process.env.RECORDS_PER_PAGE;
    return this.audiocallModel
      .find()
      .skip(records * page)
      .limit(records);
  }
}
