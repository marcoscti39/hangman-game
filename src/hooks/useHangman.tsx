import { useEffect, useState } from "react";
import { fetchRandomWord } from "../fetch/fetchRandomWord";
import { createWordLength } from "../utils/createWordLength";

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface IGameStatus {
  isGameFinished: boolean;
  hasPlayerWon: boolean;
  mistakesCount: number;
}

export const useHangman = () => {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);

  useEffect(() => {
    if (correctAnswer) {
      setAnswer(createWordLength(correctAnswer.length));
    }
  }, [correctAnswer]);

  useEffect(() => {
    const getRandomWord = async () => {
      setCorrectAnswer((await fetchRandomWord()).word.toUpperCase());
    };
    getRandomWord();
  }, []);

  const [gameStatus, setGameStatus] = useState<IGameStatus>({
    isGameFinished: false,
    hasPlayerWon: false,
    mistakesCount: 0,
  });

  const verifyLetter = (event: ButtonClickEvent) => {
    const letter = event.currentTarget.textContent;

    if (letter && correctAnswer.includes(letter)) {
      correctAnswer.split("").forEach((answerLetter, index) => {
        if (letter === answerLetter) {
          answer.splice(index, 1, letter);
          setAnswer([...answer]);
        }
      });
      if (!answer.includes("")) {
        setGameStatus({
          isGameFinished: true,
          hasPlayerWon: true,
          mistakesCount: gameStatus.mistakesCount,
        });
        return;
      }
      event.currentTarget.style.backgroundColor = "#3b82f6";
      event.currentTarget.style.opacity = "1";
      event.currentTarget.setAttribute("disabled", "disabled");
      return;
    }
    if (gameStatus.mistakesCount + 1 === 6) {
      setGameStatus({
        isGameFinished: true,
        hasPlayerWon: false,
        mistakesCount: gameStatus.mistakesCount + 1,
      });
      return;
    }
    event.currentTarget.setAttribute("disabled", "disabled");
    setGameStatus({
      ...gameStatus,
      mistakesCount: gameStatus.mistakesCount + 1,
    });
  };

  return {
    answer,
    mistakesCount: gameStatus.mistakesCount,
    verifyLetter,
    isGameFinished: gameStatus.isGameFinished,
    hasPlayerWon: gameStatus.hasPlayerWon,
    correctAnswer,
  };
};
