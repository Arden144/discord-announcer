import { getGuild } from '@src/data';
import { voiceChannelJoin } from '@src/events';
import { GuildData } from '@src/interfaces';
import { Member, VoiceChannel, VoiceConnection } from 'eris';
import { mocked } from 'ts-jest/utils';

const joinVoiceChannelMock = jest.fn().mockImplementation(
  () =>
    new Promise((resolve) => {
      /// @ts-expect-error Constructor doesn't require arguments
      resolve(new VoiceConnection());
    }),
);
jest.mock('eris', () => ({
  Member: jest.fn(),
  VoiceConnection: jest.fn(),
  VoiceChannel: jest.fn().mockImplementation(() => ({
    join: joinVoiceChannelMock,
    guild: {
      id: '1234',
    },
  })),
}));
jest.mock('@src/data');

const getGuildMock = mocked(getGuild);

describe('onVoiceChannelJoin', () => {
  beforeEach(() => {
    joinVoiceChannelMock.mockClear();
  });

  it("Creates a new voiceConnection if one doesn't exist", async () => {
    getGuildMock.mockReturnValueOnce({
      channelGroups: [],
    });

    /// @ts-expect-error Constructor doesn't require arguments
    voiceChannelJoin(new Member(), new VoiceChannel());

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(joinVoiceChannelMock).toHaveBeenCalled();

    await expect(
      (getGuildMock.mock.results[0].value as GuildData).voiceConnection,
    ).resolves.toBeInstanceOf(VoiceConnection);
  });
});
