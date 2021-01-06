import { Channel, TextChannel, VoiceChannel } from 'discord.js';
import { getGuild } from '../data';
import { createGuildChannel } from '../discord';
import { channelNameIs, getTextChannelName } from '../util/channelUtil';

export async function channelCreate(voiceChannel: Channel): Promise<void> {
  if (!(voiceChannel instanceof VoiceChannel)) return;

  const { guild, name: voiceChannelName } = voiceChannel;

  const textChannelName = getTextChannelName(voiceChannelName);

  let textChannel = guild.channels.cache.find(channelNameIs(textChannelName));
  let created = false;

  if (!(textChannel instanceof TextChannel)) {
    textChannel = await createGuildChannel(guild.id, textChannelName);
    created = true;
  }

  if (!(textChannel instanceof TextChannel)) {
    throw Error("Created channel is not a TextChannel. This should't happen");
  }

  getGuild(guild.id).channelGroups.push({
    voiceChannel,
    textChannel,
    created,
  });
}
