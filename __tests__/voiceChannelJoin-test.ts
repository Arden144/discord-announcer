import { getGuild } from '@src/data';
import { voiceChannelJoin } from '@src/events';
import { GuildData } from '@src/interfaces';
import { Member, VoiceChannel, VoiceConnection } from 'eris';
import { mocked } from 'ts-jest/utils';
jest.mock('eris', () => ({
  Member: jest.fn(),
  VoiceConnection: jest.fn(),
  VoiceChannel: jest.fn().mockImplementation(() => ({
    join: jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          /// @ts-expect-error Constructor doesn't require arguments
          resolve(new VoiceConnection());
        }),
    ),
    guild: {
      id: '1234',
    },
  })),
}));
jest.mock('@src/data');

const MockVoiceChannel = mocked(VoiceChannel);
const MockGetGuild = mocked(getGuild);

describe('onVoiceChannelJoin', () => {
  beforeEach(() => {
    MockVoiceChannel.mockClear();
  });

  it("Creates a new voiceConnection if one doesn't exist", async () => {
    MockGetGuild.mockReturnValueOnce({
      channelGroups: [],
    });
    /// @ts-expect-error Constructor doesn't require arguments
    const mockVoiceChannelInstance = new VoiceChannel();

    /// @ts-expect-error Constructor doesn't require arguments
    voiceChannelJoin(new Member(), mockVoiceChannelInstance);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockVoiceChannelInstance.join).toHaveBeenCalled();

    await expect(
      (MockGetGuild.mock.results[0].value as GuildData).voiceConnection,
    ).resolves.toBeInstanceOf(VoiceConnection);
  });

  // it("Doesn't attempt to make another voiceConnection if one exists", () => {
  // });
});
