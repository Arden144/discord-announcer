import type { AnyChannel } from 'eris';
import { TextChannel, VoiceChannel } from 'eris';
import { channelNameIs, getTextChannelName } from './util/channelUtil';

const onChannelCreate = async (channel: AnyChannel): Promise<void> => {
  if (!(channel instanceof VoiceChannel)) return;

  const { client, guild, name: voiceChannelName } = channel;

  const textChannelName = getTextChannelName(voiceChannelName);

  let textChannel = guild.channels.find(channelNameIs(textChannelName));
  let created = false;

  if (!(textChannel instanceof TextChannel)) {
    textChannel = await guild.createChannel(textChannelName);
    created = true;
  }

  client.state.channelGroups.push({
    voiceChannel: channel,
    textChannel,
    created,
  });
};

export default onChannelCreate;
