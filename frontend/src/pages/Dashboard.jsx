// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../constants/config";
// import christmasImage from "../assets/photo5.jpg";

// function Dashboard() {
//   const location = useLocation();
//   const { score, username } = location.state || {};
//   const navigate = useNavigate();

//   const [questionCount, setQuestionCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [questionsClicked, setQuestionsClicked] = useState(() => {
//     // Retrieve the value from localStorage, defaulting to 0 if not found
//     return parseInt(localStorage.getItem("questionsClicked") || "0", 10);
//   });

//   // Fetch question count from API
//   useEffect(() => {
//     const fetchQuestionCount = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/dashboard/questioncount`);
//         const data = await response.json();
//         setQuestionCount(data.count);
//       } catch (error) {
//         console.error("Error fetching question count:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestionCount();
//   }, []);

//   const handleFinalScore = async (score) => {
  
//       // Update score in the backend
//       try {
//         await fetch(`${BASE_URL}/dashboard/finalscore`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ username, score: score-30 }),
//         });
//       } catch (error) {
//         console.error("Error updating score:", error);
//       }
  
//   };

//   const handleQuestionClick = (questionNumber) => {
//     const updatedCount = questionsClicked + 1;
//     setQuestionsClicked(updatedCount);

//     // Save the updated count to localStorage
//     localStorage.setItem("questionsClicked", updatedCount);

//     if(updatedCount>3)
//     {
      
//       alert(`You have reached the maximum number of questions! ${score} Try Again... Merry christmas`);
//       if(score>=30)
//       {
//         alert(`Congratulations! You have won the game!`);
//         handleFinalScore(score);
        
//         // score=score-30;
//       }

//       setQuestionsClicked(0);
//       // Clear `questionsClicked` and user authentication data
//       localStorage.removeItem("questionsClicked");
//       // Clear user authentication data (e.g., token)
//       localStorage.removeItem("token");
//       // Navigate to the login page
//       navigate("/login");
//       return;

//     }
//     setQuestionsClicked(updatedCount);
//     localStorage.setItem("questionsClicked", updatedCount);

//     // Navigate to the question page
//     navigate("/questionpage", { state: { questionNumber, score, username } });
//   };

//   return (
//     <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//       <div
//         className="w-screen h-[25vh] bg-cover bg-no-repeat bg-center"
//         style={{
//           backgroundImage: `url(${christmasImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       ></div>

//       <div className="mb-4 sm:mb-0">
//         <h1 className="text-5xl">Welcome, {username}!</h1>
//         <p className="text-2xl font-bold">Available Points: {score}</p>
//         <p className="text-xl mt-2">
//           Questions Answered: <span className="font-bold">{questionsClicked}/3</span>
//         </p>
//       </div>

//       {loading ? (
//         <div className="text-center text-lg">Loading questions...</div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
//           {Array.from({ length: questionCount }, (_, i) => i + 1)
//             .sort(() => Math.random() - 0.5)
//             .slice(0, 10)
//             .map((number) => (
//               <button
//                 key={number}
//                 onClick={() => handleQuestionClick(number)}
//                 className="flex items-center justify-center w-full h-40 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-400 transition duration-200"
//               >
//                 {number}
//               </button>
//             ))}
//         </div>
//       )}
      
//     </div>
    
//   );
// }

// export default Dashboard;


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
        body: JSON.stringify({ username, score: score - 30 }),
      });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

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
      }
      else{
        setFeedback1("SEE YOU NEXT TIME!");
        setFeedback2("You've Reached Maximum Number of Questions!");
        setShowModal(true);
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
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <div
        className="w-screen h-[25vh] bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${christmasImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="mb-4 sm:mb-0">
        <h1 className="text-5xl">Welcome, {username}!</h1>
        <p className="text-2xl font-bold">Available Points: {score}</p>
        <p className="text-xl mt-2">
          Questions Answered: <span className="font-bold">{questionsClicked}/3</span>
        </p>
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
                className="flex items-center justify-center w-full h-40 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-400 transition duration-200"
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
