import { joinVoice } from '@src/discord';
import { voiceStateUpdate } from '@src/events/voiceStateUpdate';
import { getQueue } from '@src/queue';
import { Queue } from '@src/queue/interfaces';
import { VoiceConnection, VoiceState } from 'discord.js';
import { mocked } from 'ts-jest/utils';
jest.mock('discord.js');
jest.mock('@src/queue');
jest.mock('@src/discord');

const getQueueMock = mocked(getQueue);
const joinVoiceMock = mocked(joinVoice);
const MockVoiceState = mocked(VoiceState);

describe('onVoiceChannelJoin', () => {
  it("Creates a new voiceConnection if one doesn't exist", async () => {
    const queue: Queue = {
      _queue: [],
      add: jest.fn(),
      _playNext: jest.fn(),
      get connection(): VoiceConnection | undefined {
        return this._connection;
      },
      set connection(connection: VoiceConnection | undefined) {
        this._connection = connection;
      },
    };

    getQueueMock.mockReturnValueOnce(queue);

    MockVoiceState.mockImplementation(
      jest.fn(() => ({
        guild: {
          id: '1234',
        },
        channel: {
          id: '1234',
        },
      }) as VoiceState),
    );

    /// @ts-expect-error Constructor doesn't require arguments
    const voiceConnection = new VoiceConnection();

    joinVoiceMock.mockReturnValueOnce(
      new Promise((resolve) => resolve(voiceConnection)),
    );

    const queueConnectionSetter = jest.spyOn(queue, 'connection', 'set');

    /// @ts-expect-error Constructor doesn't require arguments
    await voiceStateUpdate(new VoiceState(), new VoiceState());

    expect(queueConnectionSetter).toHaveBeenCalledWith(voiceConnection);
  });
});
