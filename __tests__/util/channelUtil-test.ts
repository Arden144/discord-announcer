import { channelNameIs, getTextChannelName } from '@src/util/channelUtil';
import { TextChannel } from 'eris';
jest.mock('eris', () => ({
  TextChannel: jest.fn(() => ({
    name: 'example-name',
  })),
}));

test('getTextChannelName: Lowercase and spaces become dashes', () => {
  expect(getTextChannelName('Example Voice Channel')).toEqual(
    'example-voice-channel',
  );
});

test('channelNameIs: Check if channel name matches given string', () => {
  /// @ts-expect-error No need to provide arguments for the TextChannel constructor
  expect(channelNameIs('example-name')(new TextChannel())).toBe(true);
});
