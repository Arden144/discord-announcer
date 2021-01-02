import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as dotenv from 'dotenv';
import { writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { startBot } from './discord';
import { channelCreate, voiceChannelJoin } from './events';
import { getTTSConfig } from './util/ttsUtil';
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
  keyFilename: path.join(
    fileURLToPath(import.meta.url),
    '..',
    '..',
    'gcmkey.json',
  ),
});

tts
  .synthesizeSpeech(getTTSConfig("I can't believe this actually works."))
  .then(([response]) =>
    writeFile('output.ogg', response.audioContent!, () => null),
  );
