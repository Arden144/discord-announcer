import type { Readable } from 'stream';

export interface QueueManager {
  push: (stream: Readable) => void;
}
