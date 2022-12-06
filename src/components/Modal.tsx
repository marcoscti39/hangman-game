import React from "react";
import { useHangman } from "../hooks/useHangman";

interface ModalProps {
  variant: "win" | "lose";
  correctWord?: string;
}

const Modal: React.FC<ModalProps> = ({ variant, correctWord }) => {
  const modalTitle = variant === "win" ? "You Won" : "You Lost";
  return (
    <div className="flex justify-center absolute bottom-0 top-0 left-0 right-0 bg-[rgba(0,0,0,0.4)] w-full h-full">
      <div className="w-[50%] relative z-10 bg-white rounded p-4 h-[max-content] mt-16 animate-modal">
        <h2
          className={`text-4xl font-semibold text-center ${
            variant === "win" ? "text-green-500" : "text-red-500"
          }`}
        >
          {modalTitle}
        </h2>

        {variant === "lose" && (
          <p className="text-center font-medium mt-8">
            The answer was{" "}
            <span className="text-green-500 font-medium">{correctWord}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Modal;
