import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as dotenv from 'dotenv';
import type { VoiceConnection } from 'eris';
import { Client, TextChannel, VoiceChannel } from 'eris';
import { writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import onChannelCreate from './onChannelCreate';
import onVoiceChannelJoin from './onVoiceChannelJoin';
import { getTTSConfig } from './util/ttsUtil';
dotenv.config();

if (!process.env.TOKEN) {
  throw Error(
    'Missing "token" in environment variables. Add it in .env or export the value',
  );
}

declare module 'eris' {
  interface Client {
    state: ClientState;
  }
}

interface ClientState {
  channelGroups: ChannelGroup[];
  voiceConnection?: Promise<VoiceConnection>;
}

interface ChannelGroup {
  voiceChannel: VoiceChannel;
  textChannel: TextChannel;
  created: boolean;
}

const bot = new Client(process.env.TOKEN);

bot.state = {
  channelGroups: [],
};

bot.on('channelCreate', onChannelCreate);
bot.on('voiceChannelJoin', onVoiceChannelJoin);

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
