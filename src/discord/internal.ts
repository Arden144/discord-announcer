import { ClientState } from '../interfaces';
import { client, state } from './index.js';
import { EventHandlers } from './interfaces';

export const defaultState = <ClientState>{
  channelGroups: [],
};

type Handler<T extends unknown[]> = (state: ClientState, ...args: T) => void;

function ifHandlerExistsPartial(state: ClientState) {
  return function <T extends unknown[]>(handler: Handler<T> | undefined) {
    return function (...args: T): void {
      if (handler) handler(state, ...args);
    };
  };
}

export function registerEventHandlers(eventHandlers: EventHandlers): void {
  const ifHandlerExists = ifHandlerExistsPartial(state);
  client.on('ready', ifHandlerExists(eventHandlers.ready));
  client.on(
    'voiceChannelJoin',
    ifHandlerExists(eventHandlers.voiceChannelJoin),
  );
  client.on('channelCreate', ifHandlerExists(eventHandlers.channelCreate));
}

export async function connect(): Promise<void> {
  return client.connect();
}
