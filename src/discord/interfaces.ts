import type { AnyChannel, Member, Message, TextableChannel, VoiceChannel } from 'eris';

export interface EventHandlers {
  ready?: () => void;
  voiceChannelJoin?: (member: Member, channel: VoiceChannel) => void;
  channelCreate?: (channel: AnyChannel) => void;
  messageCreate?: (message: Message<TextableChannel>) => void;
}

export interface BotConfig {
  token: string;
  eventHandlers: EventHandlers;
}
