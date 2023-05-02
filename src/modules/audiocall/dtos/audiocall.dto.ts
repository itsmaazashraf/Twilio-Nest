import { IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class AudioCallDto {
  @IsNotEmpty()
  CallSid: string;

  @IsNotEmpty()
  @IsString()
  CallStatus: string;

  @IsNotEmpty()
  @IsNumber()
  CallDuration: number;

  @IsString()
  @IsOptional()
  RecordingUrl: string;

  @IsNotEmpty()
  @IsString()
  From: string;
}