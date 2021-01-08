import { StreamDispatcher, VoiceConnection } from 'discord.js';
import type { Readable } from 'stream';

export interface Queue {
  _queue: Readable[];
  _dispatcher?: StreamDispatcher;
  _connection?: VoiceConnection;
  connection?: VoiceConnection;
  _playNext: () => void;
  add: (stream: Readable) => void;
}
