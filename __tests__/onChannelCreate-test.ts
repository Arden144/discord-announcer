import type { ClientState } from '@src/interfaces';
import onChannelCreate from '@src/onChannelCreate';
import { TextChannel } from 'eris';
jest.mock('eris');

describe('onChannelCreate', () => {
  it('Does nothing if given a non-voice channel', async () => {
    const state = <ClientState>{
      channelGroups: [],
    };
    /// @ts-expect-error No need to provide arguments for the TextChannel constructor
    await onChannelCreate(state, new TextChannel());
    expect(state.channelGroups).toEqual([]);
  });
});
