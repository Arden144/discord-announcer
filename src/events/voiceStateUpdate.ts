import type { VoiceState } from 'discord.js';
import { joinVoice } from '../discord';
import { getQueue } from '../queue';

export async function voiceStateUpdate(
  oldState: VoiceState,
  newState: VoiceState,
): Promise<void> {
  if (!newState.channel) return;
  const queue = getQueue(newState.guild.id);
  if (!queue.connection) {
    queue.connection = await joinVoice(newState.channel.id);
  }
}
