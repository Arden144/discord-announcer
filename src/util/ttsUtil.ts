import { protos } from '@google-cloud/text-to-speech';

const getTTSConfig = (
  text: string,
): protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest => ({
  input: {
    text,
  },
  voice: {
    languageCode: 'en-US',
    name: 'en-US-Wavenet-J',
  },
  audioConfig: {
    audioEncoding: 'OGG_OPUS',
  },
});

export { getTTSConfig };
