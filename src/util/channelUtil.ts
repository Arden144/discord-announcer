import { GuildChannel } from 'discord.js';

const getTextChannelName = (name: string): string =>
  name.toLowerCase().replace(/ /g, '-');

const channelNameIs = (name: string) => (channel: GuildChannel): boolean =>
  channel.name === name;

export { channelNameIs, getTextChannelName };
