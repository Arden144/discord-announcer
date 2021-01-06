import { client } from './index.js';
import { EventHandlers } from './interfaces';

type Handler<T extends unknown[]> = (...args: T) => void;

function ifHandler<T extends unknown[]>(handler: Handler<T> | undefined) {
  return function (...args: T): void {
    if (handler) handler(...args);
  };
}

export function registerEventHandlers(eventHandlers: EventHandlers): void {
  client.on('ready', ifHandler(eventHandlers.ready));
  client.on('voiceStateUpdate', ifHandler(eventHandlers.voiceStateUpdate));
  client.on('channelCreate', ifHandler(eventHandlers.channelCreate));
  client.on('message', ifHandler(eventHandlers.message));
}

export async function login(token: string): Promise<string> {
  return client.login(token);
}
