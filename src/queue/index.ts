import { StreamDispatcher, VoiceConnection } from 'discord.js';
import type { Readable } from 'stream';
import { getByGuildID } from '../builders';

interface Queue {
  _queue: Readable[];
  _dispatcher?: StreamDispatcher;
  _connection?: VoiceConnection;
  connection?: VoiceConnection;
  _playNext: () => void;
  add: (stream: Readable) => void;
}

const queues: { [key: string]: Queue } = {};

const queueFactory = (): Queue => ({
  _queue: [],
  get connection(): VoiceConnection | undefined {
    return this._connection;
  },
  set connection(connection: VoiceConnection | undefined) {
    this._connection = connection;
    if (this._connection) {
      this._connection.on('end', () => {
        this._playNext();
      });
      this._connection.on('disconnect', () => {
        this._dispatcher = undefined;
        this._connection = undefined;
      });
    }
    this._playNext();
  },
  _playNext(): void {
    if (!this._connection || this._dispatcher) return;
    const nextStream = this._queue.shift();
    if (!nextStream) return;
    this._dispatcher = this._connection.play(nextStream);
    this._dispatcher.on('finish', () => {
      this._dispatcher = undefined;
      this._playNext();
    })
  },
  add(stream: Readable): void {
    this._queue.push(stream);
    this._playNext();
  },
});

export const getQueue = getByGuildID(queues, queueFactory);
