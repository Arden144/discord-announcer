import type { TextChannel, VoiceChannel, VoiceConnection } from 'eris';

export interface ClientState {
  channelGroups: ChannelGroup[];
  voiceConnection?: Promise<VoiceConnection>;
}

export interface ChannelGroup {
  voiceChannel: VoiceChannel;
  textChannel: TextChannel;
  created: boolean;
}
