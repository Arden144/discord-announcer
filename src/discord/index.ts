import { Client } from 'eris';
import type { BotConfig } from './interfaces';
import { connect, registerEventHandlers } from './internal';

export let client: Client;

export async function startBot(config: BotConfig): Promise<void> {
  const { token, eventHandlers } = config;

  client = new Client(token);

  registerEventHandlers(eventHandlers);

  return connect();
}
