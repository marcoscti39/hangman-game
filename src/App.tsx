import React, { useEffect, useState } from "react";
import Back from "./components/Back";
import BodyContainer from "./components/BodyContainer";
import Head from "./components/Head";
import LeftArm from "./components/LeftArm";
import LeftLeg from "./components/LeftLeg";
import Modal from "./components/Modal";
import RightArm from "./components/RightArm";
import RightLeg from "./components/RightLeg";
import { useHangman } from "./hooks/useHangman";
import { alphabet } from "./utils/alphabet";
import { createWordLength } from "./utils/createWordLength";

const App = () => {
  const {
    mistakesCount,
    verifyLetter,
    isGameFinished,
    hasPlayerWon,
    answer,
    correctAnswer,
  } = useHangman();

  return (
    <div>
      {isGameFinished ? (
        hasPlayerWon ? (
          <Modal variant="win" />
        ) : (
          <Modal variant="lose" correctWord={correctAnswer} />
        )
      ) : undefined}

      <div className="w-[350px] h-[300px] relative mx-auto mt-4">
        <div className="absolute w-[70%] h-[5px] bg-black bottom-0 left-[50%] translate-x-[-50%]"></div>
        <div className="absolute h-full w-[5px] bg-black bottom-0 left-[50%] translate-x-[-50%]"></div>
        <div className="absolute h-[5px] w-[50%] bg-black right-0 "></div>
        <div className="absolute h-[20%] w-[5px] right-0 bg-black"></div>
        <BodyContainer>
          {mistakesCount >= 1 && <Head />}
          {mistakesCount >= 2 && <Back />}
          {mistakesCount >= 3 && <RightArm />}
          {mistakesCount >= 4 && <LeftArm />}
          {mistakesCount >= 5 && <RightLeg />}
          {mistakesCount >= 6 && <LeftLeg />}
        </BodyContainer>
      </div>

      <div className="flex gap-4 mx-auto my-4 justify-center w-[50%]">
        {answer?.map((letter, index) => (
          <div
            className="flex justify-center leading-[4rem] align-bottom text-4xl w-[50px] h-[50px] border-black border-b-[4px]"
            key={index}
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-9  max-w-[650px] mx-auto mt-8 gap-2">
        {alphabet.map((letter, index) => (
          <button
            key={index}
            onClick={(e) => verifyLetter(e)}
            className="h-[65px] rounded border-black border-[3px] hover:bg-blue-300 hover:text-white disabled:bg-gray-300 disabled:opacity-[.6] disabled:hover:text-black"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
