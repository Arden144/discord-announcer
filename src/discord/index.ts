import {
  Client,
  Message,
  TextChannel,
  VoiceChannel,
  VoiceConnection,
} from 'discord.js';
import type { BotConfig } from './interfaces';
import { login, registerEventHandlers } from './internal';

export let client: Client;

export async function startBot(config: BotConfig): Promise<string> {
  const { token, eventHandlers } = config;

  client = new Client();

  registerEventHandlers(eventHandlers);

  return login(token);
}

export async function createGuildChannel(
  guildID: string,
  name: string,
): Promise<TextChannel> {
  const guild = await client.guilds.fetch(guildID);
  return guild.channels.create(name);
}

export async function joinVoice(channelID: string): Promise<VoiceConnection> {
  const channel = await client.channels.fetch(channelID);
  if (!(channel instanceof VoiceChannel)) {
    throw Error('channelID did not match a voice channel');
  }
  return channel.join();
}

export async function sendMessage(
  channelID: string,
  message: string,
): Promise<Message> {
  const channel = await client.channels.fetch(channelID);
  if (!(channel instanceof TextChannel)) {
    throw Error('channelID did not match a text channel');
  }
  return channel.send(message);
}
