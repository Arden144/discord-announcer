import type { AnyChannel, Member, VoiceChannel } from 'eris';
import type { ClientState } from '../interfaces';

export interface EventHandlers {
  voiceChannelJoin?: (
    state: ClientState,
    member: Member,
    channel: VoiceChannel,
  ) => void;
  channelCreate?: (state: ClientState, channel: AnyChannel) => void;
}

export interface BotConfig {
  token: string;
  state?: ClientState;
  eventHandlers: EventHandlers;
}
