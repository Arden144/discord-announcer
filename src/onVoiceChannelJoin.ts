import type { Member, VoiceChannel } from 'eris';

const onVoiceChannelJoin = (member: Member, channel: VoiceChannel): void => {
  const { client } = channel;

  if (!client.state.voiceConnection) {
    client.state.voiceConnection = channel.join({});
  }
};

export default onVoiceChannelJoin;
