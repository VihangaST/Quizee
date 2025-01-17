// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { BASE_URL } from "../constants/config";
// import christmasImage from "../assets/photo5.jpg"; // Adjust the path as needed

// function Dashboard() {
//   const location = useLocation();
//   const { score, username } = location.state || {};
//   const navigate = useNavigate();

//   const [questionCount, setQuestionCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const [questionsClicked, setQuestionsClicked] = useState(0); 

//   // Fetch question count from API
//   useEffect(() => {
//     const fetchQuestionCount = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/dashboard/questioncount`); // Adjust the API URL
//         const data = await response.json();
//         alert(`Response: ${JSON.stringify(data)}`);
//         setQuestionCount(data.count); // Assuming the API returns { count: number }
//       } catch (error) {
//         console.error("Error fetching question count:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestionCount();
//   }, []);

//   const handleQuestionClick = (questionNumber) => {
//     // setQuestionsClicked((prevCount) => prevCount + 1);
//     // alert(`Navigating to question ${questionNumber} count: ${questionsClicked}`);
//     console.log("Question clicked:", questionsClicked);
//     setQuestionsClicked((prevCount) => {
//       console.log("Previous count:", prevCount);
//       return prevCount + 1;
//     });
    
//     navigate("/questionpage", { state: { questionNumber,score, username } });
//   // Check the current state value before updating
//   // if (questionsAnswered < 3) {
//     // Increment questionsAnswered
//     // setQuestionsAnswered((prev) => prev + 1);
//   //   questionsAnswered += 1;
//   //   console.log("Questions answered:", questionsAnswered);

//   //   // Navigate to the question page
//   //   navigate("/questionpage", { state: { questionNumber, score, username } });
//   // } else {
//   //   alert("You have reached the maximum number of questions!");
//   // }
//   };

//   return (
//     <>
      
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         <div
//           className="w-screen h-[25vh] bg-cover bg-no-repeat bg-center"
//           style={{
//             backgroundImage: `url(${christmasImage})`,
//             backgroundSize: "cover", 
//             backgroundPosition: "center", 
//           }}
//         ></div>

//         <div className="mb-4 sm:mb-0">
//           <h1 className="ml-4 mt-5 text-2xl md:text-3xl text-primary-light dark:text-primary-lighter font-bold"></h1>
//           <h1 className="text-5xl">Welcome, {username}!</h1>
//           <p className="text-2xl font-bold">Available Points: {score}</p>
//           <p className="text-xl mt-2">
//             Questions Clicked: <span className="font-bold">{questionsClicked}</span>
//           </p>
//         </div>

//         {/* Question Cards */}
//         {loading ? (
//           <div className="text-center text-lg">Loading questions...</div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
//             {Array.from({ length: questionCount }, (_, i) => i + 1)
//           .sort(() => Math.random() - 0.5) // Randomize the array
//           .slice(0, 10) // Take the first 10 items
//           .map((number) => (
//             <button
//               key={number}
//               onClick={() => handleQuestionClick(number)}
//               className="flex items-center justify-center w-full h-40 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-400 transition duration-200" // Increased height with h-40
//             >
//               {number}
//             </button>
//           ))}
//           </div>

//         )}
//       </div>
//     </>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../constants/config";
import christmasImage from "../assets/photo5.jpg";

function Dashboard() {
  const location = useLocation();
  const { score, username } = location.state || {};
  const navigate = useNavigate();

  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questionsClicked, setQuestionsClicked] = useState(() => {
    // Retrieve the value from localStorage, defaulting to 0 if not found
    return parseInt(localStorage.getItem("questionsClicked") || "0", 10);
  });

  // Fetch question count from API
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

  const handleQuestionClick = (questionNumber) => {
    const updatedCount = questionsClicked + 1;
    setQuestionsClicked(updatedCount);

    // Save the updated count to localStorage
    localStorage.setItem("questionsClicked", updatedCount);

    if(updatedCount>3)
    {
      alert("You have reached the maximum number of questions!");
      setQuestionsClicked(0);
      // Clear `questionsClicked` and user authentication data
      localStorage.removeItem("questionsClicked");
      // Clear user authentication data (e.g., token)
      localStorage.removeItem("token");
      // Navigate to the login page
      navigate("/login");
      return;

    }
    setQuestionsClicked(updatedCount);
    localStorage.setItem("questionsClicked", updatedCount);

    // Navigate to the question page
    navigate("/questionpage", { state: { questionNumber, score, username } });
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
    </div>
  );
}

export default Dashboard;
