import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const question = "What is the capital of France?";
  const options = [
    { id: 1, text: "Berlin" },
    { id: 2, text: "Madrid" },
    { id: 3, text: "Paris" },
    { id: 4, text: "Rome" },
  ];
  const correctOption = 3;

  const handleAnswer = (optionId) => {
    setSelectedOption(optionId);
    setIsAnswered(true);
    setModalOpen(true);

    if (optionId === correctOption) {
      setFeedback("Correct! 🎉");
    } else {
      setFeedback("Wrong! ❌");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (isAnswered) {
      // Reset for the next question
      setSelectedOption(null);
      setIsAnswered(false);
      setFeedback("");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        {/* Question */}
        <h1 className="text-xl font-bold text-gray-800 mb-4">{question}</h1>

        {/* Options */}
        <div className="grid grid-cols-1 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className={`w-full text-left py-3 px-4 border rounded-md ${
                selectedOption === option.id
                  ? option.id === correctOption
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                  : "hover:bg-gray-100"
              }`}
              disabled={isAnswered}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Feedback Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                {feedback === "Correct! 🎉" ? "Great Job!" : "Try Again!"}
              </h2>
              <p className="mt-4 text-gray-600">{feedback}</p>
              <button
                onClick={closeModal}
                className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                {isAnswered ? "Next Question" : "Close"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
