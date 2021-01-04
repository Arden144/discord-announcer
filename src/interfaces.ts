import type { TextChannel, VoiceChannel, VoiceConnection } from 'eris';

export interface GuildData {
  channelGroups: ChannelGroup[];
  voiceConnection?: Promise<VoiceConnection>;
}

export interface ChannelGroup {
  voiceChannel: VoiceChannel;
  textChannel: TextChannel;
  created: boolean;
}
