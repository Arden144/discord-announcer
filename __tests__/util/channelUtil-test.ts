import { channelNameIs, getTextChannelName } from '@src/util/channelUtil';
import type { TextChannel } from 'eris';

test('getTextChannelName: Lowercase and spaces become dashes', () => {
  expect(getTextChannelName('Example Voice Channel')).toEqual(
    'example-voice-channel',
  );
});

test('channelNameIs: Check if channel name matches given string', () => {
  expect(
    channelNameIs('example-name')({ name: 'example-name' } as TextChannel),
  ).toBeTruthy();
});
