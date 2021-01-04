import * as dotenv from 'dotenv';
import { startBot } from './discord';
import { channelCreate, ready, voiceChannelJoin } from './events';
dotenv.config();

if (!process.env.TOKEN) {
  throw Error(
    'Missing "token" in environment variables. Add it in .env or export the value',
  );
}

void startBot({
  token: process.env.TOKEN,
  eventHandlers: {
    ready,
    channelCreate,
    voiceChannelJoin,
  },
});
