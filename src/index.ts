import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as dotenv from 'dotenv';
import type { AnyGuildChannel, VoiceConnection } from 'eris';
import { Client, TextChannel, VoiceChannel } from 'eris';
import { writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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

const getTextChannelName = (name: string) =>
  name.toLowerCase().replace(' ', '-');

const channelNameIs = (name: string) => (channel: AnyGuildChannel) =>
  channel.name === name;

bot.on('channelCreate', async (channel) => {
  if (!(channel instanceof VoiceChannel)) return;

  const { client, guild, name: voiceChannelName } = channel;

  const textChannelName = getTextChannelName(voiceChannelName);

  let textChannel = guild.channels.find(channelNameIs(textChannelName));
  let created = false;

  if (!(textChannel instanceof TextChannel)) {
    textChannel = await guild.createChannel(textChannelName);
    created = true;
  }

  client.state.channelGroups.push({
    voiceChannel: channel,
    textChannel,
    created,
  });
});

bot.on('voiceChannelJoin', (member, channel) => {
  const { client } = channel;

  if (!client.state.voiceConnection) {
    client.state.voiceConnection = channel.join({});
  }
});

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
  .synthesizeSpeech({
    input: {
      text: "I can't believe this actually works.",
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-D',
    },
    audioConfig: {
      audioEncoding: 'OGG_OPUS',
    },
  })
  .then(([response]) =>
    writeFile('jack.ogg', response.audioContent!, () => null),
  );
