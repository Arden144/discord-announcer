import type { ClientState } from '@src/interfaces';
import onVoiceChannelJoin from '@src/onVoiceChannelJoin';
import { Member, VoiceChannel, VoiceConnection } from 'eris';
import { mocked } from 'ts-jest/utils';
jest.mock('eris');

const MockVoiceChannel = mocked(VoiceChannel);

describe('onVoiceChannelJoin', () => {
  beforeEach(() => {
    MockVoiceChannel.mockClear();
  });

  it("Creates a new voiceConnection if one doesn't exist", () => {
    const state = <ClientState>{};
    /// @ts-expect-error Constructor arguments not required
    onVoiceChannelJoin(state, new Member(), new VoiceChannel());

    const MockVoiceChannelInstance = MockVoiceChannel.mock.instances[0];

    expect(MockVoiceChannelInstance.join).toHaveBeenCalled();
  });

  it("Doesn't attempt to make another voiceConnection if one exists", () => {
    const state = <ClientState>{
      /// @ts-expect-error Constructor arguments not required
      voiceConnection: new Promise((resolve) => resolve(new VoiceConnection())),
    };
    /// @ts-expect-error Constructor arguments not required
    onVoiceChannelJoin(state, new Member(), new VoiceChannel());

    const MockVoiceChannelInstance = MockVoiceChannel.mock.instances[0];

    expect(MockVoiceChannelInstance.join).not.toHaveBeenCalled();
  });
});
