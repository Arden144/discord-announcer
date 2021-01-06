import { getByGuildID } from './builders';
import { GuildData } from './interfaces';

interface Guilds {
  [key: string]: GuildData;
}

const guildFactory = (): GuildData => ({
  channelGroups: [],
});

const guilds: Guilds = {};

export const getGuild = getByGuildID(guilds, guildFactory);
