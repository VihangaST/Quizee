import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../constants/config";
import christmasImage from "../assets/photo.jpg"; // Adjust the path as needed

function Dashboard() {
  const location = useLocation();
  const { score, username } = location.state || {};
  const navigate = useNavigate();

  const [questionCount, setQuestionCount] = useState(0); // State to store the question count
  const [loading, setLoading] = useState(true); // State to track loading state

  // Fetch question count from API
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dashboard/questioncount`); // Adjust the API URL
        const data = await response.json();
        alert(`Response: ${JSON.stringify(data)}`);
        setQuestionCount(data.count); // Assuming the API returns { count: number }
      } catch (error) {
        console.error("Error fetching question count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionCount();
  }, []);

  const handleQuestionClick = (questionNumber) => {
    navigate("/questionpage", { state: { questionNumber } });
  };

  return (
    <>
      {/* Christmas Image */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div
          className="w-screen h-[25vh] bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${christmasImage})` }}
        ></div>

        <div className="mb-4 sm:mb-0">
          <h1 className="ml-4 text-2xl md:text-3xl text-primary-light dark:text-primary-lighter font-bold"></h1>
          <h1>Welcome, {username}!</h1>
          <p>Your score is: {score}</p>
        </div>

        {/* Question Cards */}
        {loading ? (
          <div className="text-center text-lg">Loading questions...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
            {Array.from({ length: questionCount }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleQuestionClick(i + 1)}
                className="flex items-center justify-center w-full h-30 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-500 transition duration-200"
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
