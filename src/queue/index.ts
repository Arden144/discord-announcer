import { VoiceConnection } from 'eris';
import type { Readable } from 'stream';
import { getByGuildID } from '../builders';

interface Queue {
  _queue: Readable[];
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
      })
      this._connection.on('disconnect', () => {
        this._connection = undefined;
      })
    }
  },
  _playNext(): void {
    if (!this._connection || this._connection.playing) return;
    const nextStream = this._queue.shift();
    if (!nextStream) return;
    this._connection.play(nextStream);
  },
  add(stream: Readable): void {
    this._queue.push(stream);
    this._playNext();
  },
});

export const getQueue = getByGuildID(queues, queueFactory);
