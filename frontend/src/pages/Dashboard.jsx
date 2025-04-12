import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../constants/config";
import christmasImage from "../assets/photo5.jpg";
import finalImageSanta from "../assets/finalpagesanta.png"
import santaDiscount from "../assets/santadiscount.jpg"

function Dashboard() {
  const location = useLocation();
  const { score, username } = location.state || {};
  const navigate = useNavigate();

  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedback1, setFeedback1] = useState("");
  const [feedback2, setFeedback2] = useState("");
  const [questionsClicked, setQuestionsClicked] = useState(() => {
    return parseInt(localStorage.getItem("questionsClicked") || "0", 10);
  });
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dashboard/questioncount`);
        const data = await response.json();
        setQuestionCount(data.count);
      } catch (error) {
        console.error("Error fetching question count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionCount();
  }, []);

  const handleFinalScore = async (score) => {
    try {
      await fetch(`${BASE_URL}/dashboard/finalscore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score: score - 30 ,isWinner:true}),
      });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  // const sendSMS = async (message) => {
  //   // alert("Sending SMS...");
  //   try {
  //     const response = await fetch(`${BASE_URL}/dashboard/send-sms`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ mobile_number: username, message: message }),
  //     });

      
  //     const data = await response.json();
  //     if (data.success) {
  //       alert("SMS Sent Successfully!");
  //     } else {
  //       alert("Failed to send SMS: " + data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error sending SMS:", error);
  //     alert("Error sending SMS");
  //   }
  // };


  const handleQuestionClick = (questionNumber) => {
    const updatedCount = questionsClicked + 1;
    setQuestionsClicked(updatedCount);

    localStorage.setItem("questionsClicked", updatedCount);

    if (updatedCount > 3) {
      if (score >= 30) {
        setFeedback1("CONGRATULATIONS!");
        setFeedback2("You've Earned 5% DISCOUNT on Your Next Purchase! 🎉");
        setShowModal(true); // Show modal when the user wins
        handleFinalScore(score);
        // sendSMS("Congratulations! You've earned 5% discount on your next purchase. Merry Christmas!");
      }
      else{
        setFeedback1("SEE YOU NEXT TIME!");
        setFeedback2("You've Reached Maximum Number of Questions!");
        setShowModal(true);
        // sendSMS("You've Reached Maximum Number of Questions!..SEE YOU NEXT TIME!... Merry Christmas! Available Points: "+score);
        
      }
      
      setQuestionsClicked(0);
      localStorage.removeItem("questionsClicked");
      localStorage.removeItem("token");
      return;
    }

    navigate("/questionpage", { state: { questionNumber, score, username } });
  };

  const closeModalAndNavigate = () => {
    setShowModal(false); // Close the modal
    setFeedback1("");
    setFeedback2("");
    navigate("/"); // Navigate to the login page
  };

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-teal-700 p-4 h-screen">
      <div
        className="w-screen h-[25vh] bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${christmasImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="mb-3 mt-3 bg-teal-600 rounded-md sm:mb-0">
        <h1 className="text-5xl font-serif text-black font-semibold shadow-sm">Welcome, {username}!</h1>
        <div className="m-2">
        <p className="text-2xl font-bold">Available Points: {score}</p>
        <p className="text-xl mt-2">
          Questions Answered: <span className="font-bold">{questionsClicked}/3</span>
        </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-lg">Loading questions...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
          {Array.from({ length: questionCount }, (_, i) => i + 1)
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)
            .map((number) => (
              <button
                key={number}
                onClick={() => handleQuestionClick(number)}
                className="flex items-center justify-center w-full h-40 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:bg-teal-100 hover:text-black transition duration-200"
              >
                {number}
              </button>
            ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-2xl text-gray-700 font-bold mb-4">{feedback1}</h2>
            <img
                // src={finalImageSanta}
                src={feedback1.includes("CONGRATULATIONS!") ? santaDiscount : finalImageSanta}
                alt="Feedback Illustration"
                className="w-full h-40 object-cover my-4"
              />
            <p className="text-lg font-semibold text-red-600 mb-4">{feedback2}</p>
            <div className="mt-0">
                <p className="text-gray-700">
                  <strong>Username:</strong> {username}
                </p>
                <p className="text-gray-700">
                  <strong>Remaining Score:</strong> {score >= 30 ? score - 30 : score}
                </p>
              </div>
            <p className="text-lg font-bold text-gray-500 mb-5 mt-3">Merry Christmas!</p> 
            
            <button
              onClick={closeModalAndNavigate}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
