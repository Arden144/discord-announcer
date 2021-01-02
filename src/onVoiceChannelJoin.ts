import type { Member, VoiceChannel } from 'eris';
import type { ClientState } from './interfaces';

const onVoiceChannelJoin = (
  state: ClientState,
  member: Member,
  channel: VoiceChannel,
): void => {
  if (!state.voiceConnection) {
    state.voiceConnection = channel.join({});
  }
};

export default onVoiceChannelJoin;
