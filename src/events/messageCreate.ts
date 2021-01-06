import { Message, TextableChannel, TextChannel } from 'eris';
import { Readable } from 'stream';
import { getGuild } from '../data';
import { tts } from '..';
import { getQueue } from '../queue';
import { getTTSConfig } from '../util/ttsUtil';

export async function messageCreate(
  message: Message<TextableChannel>,
): Promise<void> {
  if (!(message.channel instanceof TextChannel)) return;

  const guildData = getGuild(message.channel.guild.id);
  const queue = getQueue(message.channel.guild.id);

  const channelGroup = guildData.channelGroups.find(
    (group) => group.textChannel.id === message.channel.id,
  );

  if (!channelGroup) return;

  const [response] = await tts.synthesizeSpeech(getTTSConfig(message.content));

  queue.add(Readable.from(response.audioContent!));
}
