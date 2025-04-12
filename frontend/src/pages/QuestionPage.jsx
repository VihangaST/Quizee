import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../constants/config";
import santaImage from "../assets/santa1.jpg"; 
import santaWrong from "../assets/santawrong.png";

export default function QuestionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionNumber, score: initialScore, username } = location.state || {};
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(initialScore || 0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60); // Initialize timer with 60 seconds

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/questionpage/question?number=${questionNumber}`);
        if (response.ok) {
          const data = await response.json();
          setQuestionData(data);
        } else {
          console.error("Failed to fetch question data");
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionData();
  }, [questionNumber]);

  // Timer Effect
  useEffect(() => {
    if (isAnswered) return; 

    if (timeLeft <= 0) {
      alert("Time is out!");
      navigate("/dashboard", { state: { username, score } });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, [timeLeft, navigate, username, score]);

  const handleAnswer = async (optionId) => {
    setSelectedOption(optionId);
    setIsAnswered(true);
    setModalOpen(true);

    if (optionId === questionData.correctOption) {
      setFeedback("Correct! 🎉 You Earned 10 points.");
      setScore((prevScore) => prevScore + 10);
      // Update score in the backend
      try {
        await fetch(`${BASE_URL}/questionpage/updatescore`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, score: score + 10 }),
        });
      } catch (error) {
        console.error("Error updating score:", error);
      }
    } else {
      setFeedback("Wrong! ❌ Try again.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (isAnswered) {
      setSelectedOption(null);
      setIsAnswered(false);
      setFeedback("");
      navigate("/dashboard", { state: { username, score } });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!questionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load question. Please try again later.</p>
      </div>
    );
  }

  const { question, options } = questionData;

  return (
    <div className="max-h-screen flex items-center justify-center bg-red-500 p-8">
      <div className="max-w-xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">{question}</h1>
        {/* Timer Display */}    
        <div className="grid grid-cols-1 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className={`w-full text-left py-3 px-4 border rounded-md ${
                selectedOption === option.id
                  ? option.id === questionData.correctOption
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                  : "hover:bg-gray-600"
              }`}
              disabled={isAnswered}
            >
              {option.text}
            </button>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-800">
                {feedback.includes("Correct") ? "Great Job!" : "Wrong!"}
              </h2>
              <img
                src={feedback.includes("Correct") ? santaImage : santaWrong}
                alt="Feedback Illustration"
                className="w-full h-40 object-cover my-4"
              />
              <p className="font-bold mt-4 text-gray-600">{feedback}</p>
              {questionData?.description && (
                <p className="mt-2 text-sm text-gray-500">
                  {questionData.description}
                </p>
              )}
              <div className="mt-4">
                <p className="text-gray-700">
                  <strong>Username:</strong> {username}
                </p>
                <p className="text-gray-700">
                  <strong>Score:</strong> {score}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="mt-6 w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-700"
              >
                {isAnswered ? "Next Question" : "Close"}
              </button>
            </div>
          </div>
        )} 
      </div>
      <div className="text-red-300 font-bold m-4">
      <h1>⏳ Time Left: {timeLeft}s</h1>
        </div>
    </div>
  );
}
