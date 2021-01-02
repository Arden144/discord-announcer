import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { startBot } from './discord';
import { channelCreate, voiceChannelJoin } from './events';
dotenv.config();

if (!process.env.TOKEN) {
  throw Error(
    'Missing "token" in environment variables. Add it in .env or export the value',
  );
}

startBot({
  token: process.env.TOKEN,
  eventHandlers: {
    channelCreate,
    voiceChannelJoin,
  },
});

const tts = new TextToSpeechClient({
  keyFilename: resolve(__dirname, 'gcmkey.json'),
});
