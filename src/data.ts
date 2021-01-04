import { GuildData } from './interfaces';

interface Guilds {
  [key: string]: GuildData;
}

const defaultGuild: GuildData = {
  channelGroups: [],
};

const guilds: Guilds = {};

export function getGuild(id: string): GuildData {
  if (Object.prototype.hasOwnProperty.call(guilds, id)) {
    guilds[id] = { ...defaultGuild };
  }
  return guilds[id];
}
