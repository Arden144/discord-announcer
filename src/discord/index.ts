import { Client } from 'eris';
import { ClientState } from '../interfaces';
import type { BotConfig } from './interfaces';
import { connect, defaultState, registerEventHandlers } from './internal';

export let client: Client;
export let state: ClientState;

export async function startBot(config: BotConfig): Promise<void> {
  const { token, eventHandlers } = config;
  state = config.state ?? defaultState;

  client = new Client(token);

  registerEventHandlers(eventHandlers);

  return connect();
}
