import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants/config";

function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionsFile, setQuestionsFile] = useState(null);
  const [optionsFile, setOptionsFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {    
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users_list`);
      const data = await response.json();
      console.log("Fetched data:", data); // Log the fetched data
      setRecords(data.users_list);
    } catch (error) {
      console.error("Error fetching question count:", error);
      }
  };

  const handleClaim = async ({PhoneNumber}) => {
    console.log('PhoneNumber:', PhoneNumber); // Log the phone number
    try {
      const response = await fetch(`${BASE_URL}/admin/claimed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ PhoneNumber: PhoneNumber }),
      });
      const data = await response.json();
      console.log("Claimed data:", data); // Log the claimed data
      if(response.ok){
        alert("Claimed successfully!");
        fetchUsers(); // Refresh the list after claiming
      }
      else{
        alert("Error claiming! Please try again.");
      }
    } catch (error) {
      console.error("Error claiming:", error);
    }
  }

  const handleAddQuestions = async (e) => {
    e.preventDefault();
    if (!questionsFile || !optionsFile) {
      setMessage("Please select both files.");
      return;
    }

    const formData = new FormData();
    formData.append("questions", questionsFile);
    formData.append("options", optionsFile);

    try {
      const response = await fetch("http://localhost:5000/upload-questions-options", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || result.error);
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("Upload failed. Try again.");
    }
  };
 
  const filteredRecords = records.filter((record) =>
    record.PhoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <div className="w-[1200px] p-4 overflow-y-auto overflow-x-hidden bg-teal-700 h-screen">
    <div className="m-10 mt-20 rounded-md sm:mb-0">
    <div className="pt-8 pb-8 mb-8 bg-teal-800 rounded-md shadow-md">
      <h1 className="text-xl font-bold">Upload Quiz Excel Files</h1>
      <form onSubmit={handleAddQuestions} className="p-4 space-y-4">
        <div className="ml-20 mr-20 bg-gray-100 border border-gray-300 rounded-md p-4">
          <label className="block text-sm font-medium text-teal-800">Upload Questions File</label>
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setQuestionsFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-700"
          />
        </div>
        <div className="ml-20 mr-20 bg-gray-100 border border-gray-300 rounded-md p-4">
          <label className="block text-sm font-medium text-teal-800">Upload Options File</label>
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setOptionsFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-gray-100">{message}</p>}
    </div>
    <div className="pt-8 pb-8 mb-8 bg-teal-800 rounded-md shadow-md">
    <div className="">
    <h2 className="text-2xl font-bold text-white">Logged Users</h2>

    <input
      type="text"
      placeholder="Search by phone number"
      className="m-4 h-8 p-2 rounded w-full max-w-md"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />    
    </div>

    <div className="overflow-x-auto">
    <table className="bg-teal-800 table-auto w-full p-2 border border-gray-300 rounded-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Phone Number</th>
          <th className="px-4 py-2 border">Points</th>
          <th className="px-4 py-2 border">Is Winner</th>
          <th className="px-4 py-2 border">Claim</th>
        </tr>
      </thead>
      <tbody>
        {filteredRecords.map((record) => (
          <tr key={record.PhoneNumber} >
            <td className="px-4 py-2 border">{record.PhoneNumber}</td>
            <td className="px-4 py-2 border">{record.Points}</td>
            <td className="px-4 py-2 border">{record.IsWinner === true ? 'Winner': 'Not a Winner'}</td>
            <td className="px-4 py-2 border">
              <button 
              className="align-middle px-2 py-1 rounded bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"                
              disabled={!record.IsWinner || record.IsClaimed}
              onClick={()=>handleClaim({PhoneNumber:record.PhoneNumber})}>{!record.IsWinner ? 'Not a Winner' :(record.IsClaimed ? 'Already Claimed' : 'Claim')}</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </div>
</div>

    </div>
  );
}

export default AdminDashboard;
