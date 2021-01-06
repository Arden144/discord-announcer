import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { startBot } from './discord';
import { channelCreate, message, ready, voiceStateUpdate } from './events';
dotenv.config();

if (!process.env.TOKEN) {
  throw Error(
    'Missing "token" in environment variables. Add it in .env or export the value',
  );
}
export const tts = new TextToSpeechClient({
  keyFile: resolve(__dirname, '..', 'gcmkey.json'),
});

void startBot({
  token: process.env.TOKEN,
  eventHandlers: {
    ready,
    channelCreate,
    voiceStateUpdate,
    message,
  },
});
