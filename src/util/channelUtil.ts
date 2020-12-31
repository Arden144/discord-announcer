import type { AnyGuildChannel } from 'eris';

const getTextChannelName = (name: string): string =>
  name.toLowerCase().replace(/ /g, '-');

const channelNameIs = (name: string) => (channel: AnyGuildChannel): boolean =>
  channel.name === name;

export { channelNameIs, getTextChannelName };
