import { Channel, Message, VoiceState } from 'discord.js';

export interface EventHandlers {
  ready?: () => void;
  voiceStateUpdate?: (oldState: VoiceState, newState: VoiceState) => void;
  channelCreate?: (channel: Channel) => void;
  message?: (message: Message) => void;
}

export interface BotConfig {
  token: string;
  eventHandlers: EventHandlers;
}
