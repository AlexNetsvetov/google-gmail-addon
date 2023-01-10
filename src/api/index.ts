export interface Joke {
  setup: string;
  delivery: string;
}

export const getJoke = async (): Promise<Joke> => {
  const url = 'https://v2.jokeapi.dev/joke/Any';
  const res = await UrlFetchApp.fetch(url);

  return JSON.parse(res.getContentText());
};
