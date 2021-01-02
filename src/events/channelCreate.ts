import type { AnyChannel } from 'eris';
import { TextChannel, VoiceChannel } from 'eris';
import type { ClientState } from '../interfaces';
import { channelNameIs, getTextChannelName } from '../util/channelUtil';

const onChannelCreate = async (
  state: ClientState,
  voiceChannel: AnyChannel,
): Promise<void> => {
  if (!(voiceChannel instanceof VoiceChannel)) return;

  const { guild, name: voiceChannelName } = voiceChannel;

  const textChannelName = getTextChannelName(voiceChannelName);

  let textChannel = guild.channels.find(channelNameIs(textChannelName));
  let created = false;

  if (!(textChannel instanceof TextChannel)) {
    textChannel = await guild.createChannel(textChannelName);
    created = true;
  }

  state.channelGroups.push({
    voiceChannel,
    textChannel,
    created,
  });
};

export default onChannelCreate;
