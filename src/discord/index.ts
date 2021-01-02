import Eris from 'eris';
import { BotConfig } from './interfaces';
import { connect, defaultState, registerEventHandlers } from './internal';

export async function startBot(config: BotConfig): Promise<void> {
  const client = Eris(config.token);

  registerEventHandlers(
    client,
    config.eventHandlers,
    config.state ?? defaultState,
  );

  connect(client);
}
