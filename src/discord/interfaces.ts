import type { AnyChannel, Member, VoiceChannel } from 'eris';

export interface EventHandlers {
  ready?: () => void;
  voiceChannelJoin?: (member: Member, channel: VoiceChannel) => void;
  channelCreate?: (channel: AnyChannel) => void;
}

export interface BotConfig {
  token: string;
  eventHandlers: EventHandlers;
}
