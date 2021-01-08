import { getTTSConfig } from '@src/util/ttsUtil';

test('getTTSConfig: Produces a valid TTS Config', () => {
  expect(getTTSConfig('Example Text')).toEqual({
    input: {
      text: 'Example Text',
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-J',
    },
    audioConfig: {
      audioEncoding: 'OGG_OPUS',
    },
  });
});
