const getTTSConfig = (text: string) => ({
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
});

export { getTTSConfig };
