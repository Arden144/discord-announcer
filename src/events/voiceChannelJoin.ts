import type { Member, VoiceChannel } from 'eris';
import { getGuild } from '../data';

const voiceChannelJoin = (member: Member, channel: VoiceChannel): void => {
  const guildData = getGuild(channel.guild.id);
  if (!guildData.voiceConnection) {
    guildData.voiceConnection = channel.join({});
  }
};

export default voiceChannelJoin;
