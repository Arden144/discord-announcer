import {
  Client,
  Message,
  TextableChannel,
  TextChannel,
  VoiceConnection,
} from 'eris';
import type { BotConfig } from './interfaces';
import { connect, registerEventHandlers } from './internal';

export let client: Client;

export async function startBot(config: BotConfig): Promise<void> {
  const { token, eventHandlers } = config;

  client = new Client(token);

  registerEventHandlers(eventHandlers);

  return connect();
}

export async function createGuildChannel(
  guildID: string,
  name: string,
): Promise<TextChannel> {
  return client.createChannel(guildID, name);
}

export async function joinVoice(channelID: string): Promise<VoiceConnection> {
  return client.joinVoiceChannel(channelID);
}

export async function sendMessage(
  channelID: string,
  message: string,
): Promise<Message<TextableChannel>> {
  return client.createMessage(channelID, { content: message });
}
