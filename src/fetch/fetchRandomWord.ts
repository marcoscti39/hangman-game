const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_KEY,
    "X-RapidAPI-Host": "random-word-generator2.p.rapidapi.com",
  },
};

interface RandomWordResponse {
  word: string;
}

export const fetchRandomWord = async () => {
  const response = await fetch(
    `https://random-word-generator2.p.rapidapi.com/word.php?generator=words&api_key=${
      import.meta.env.VITE_RANDOM_WORD_API_KEY
    }`,
    options
  );
  const data: RandomWordResponse = await response.json();
  return data;
};
