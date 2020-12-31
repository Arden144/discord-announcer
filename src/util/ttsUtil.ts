import type { protos } from '@google-cloud/text-to-speech';

const getTTSConfig = (
  text: string,
): protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest => {
  return {
    input: {
      text,
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-D',
    },
    audioConfig: {
      audioEncoding: 'OGG_OPUS',
    },
  };
};

export { getTTSConfig };
