import type { AnyChannel } from 'eris';
import { TextChannel, VoiceChannel } from 'eris';
import { getGuild } from '../data';
import { channelNameIs, getTextChannelName } from '../util/channelUtil';

const channelCreate = async (voiceChannel: AnyChannel): Promise<void> => {
  if (!(voiceChannel instanceof VoiceChannel)) return;

  const { guild, name: voiceChannelName } = voiceChannel;

  const textChannelName = getTextChannelName(voiceChannelName);

  let textChannel = guild.channels.find(channelNameIs(textChannelName));
  let created = false;

  if (!(textChannel instanceof TextChannel)) {
    textChannel = await guild.createChannel(textChannelName);
    created = true;
  }

  getGuild(guild.id).channelGroups.push({
    voiceChannel,
    textChannel,
    created,
  });
};

export default channelCreate;
