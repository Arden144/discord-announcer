import type { Member, VoiceChannel } from 'eris';
import { joinVoice } from '../discord';
import { getQueue } from '../queue';

export async function voiceChannelJoin(
  member: Member,
  channel: VoiceChannel,
): Promise<void> {
  const queue = getQueue(channel.guild.id);
  if (!queue.connection) {
    queue.connection = await joinVoice(channel.id);
  }
}
