import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as dotenv from 'dotenv';
import { Client } from 'eris';
import { writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ClientState } from './interfaces';
import onChannelCreate from './onChannelCreate';
import onVoiceChannelJoin from './onVoiceChannelJoin';
import { getTTSConfig } from './util/ttsUtil';
dotenv.config();

if (!process.env.TOKEN) {
  throw Error(
    'Missing "token" in environment variables. Add it in .env or export the value',
  );
}

const bot = new Client(process.env.TOKEN);

const state = <ClientState>{
  channelGroups: [],
};

bot.on('channelCreate', onChannelCreate.bind(null, state));
bot.on('voiceChannelJoin', onVoiceChannelJoin.bind(null, state));

// bot.connect();

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
