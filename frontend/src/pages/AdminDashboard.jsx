import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../constants/config";

function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


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
 
  const filteredRecords = records.filter((record) =>
    record.PhoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[1200px] p-4 overflow-y-auto overflow-x-hidden bg-teal-700 h-screen">

      <div className="m-10 mt-20 rounded-md sm:mb-0">   
      <div className="flex align-middle justify-between">
      <input
        type="text"
        placeholder="Search by phone number"
        className="m-4 h-8 p-2 rounded w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />    
      <h2 className="text-xl font-bold text-black m-4">Logged Users</h2>
      </div><div className="overflow-x-auto">
      <table className="bg-teal-700 table-auto w-full p-2 border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Phone Number</th>
            <th className="px-4 py-2 border">Points</th>
            <th className="px-4 py-2 border">Is Winner</th>
            <th className="px-4 py-2 border">Claim</th>
            
            {/* Add more headers as needed */}
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
                onClick={()=>handleClaim({PhoneNumber:record.PhoneNumber})}>{record.IsClaimed ? 'Already Claimed' : 'Claim'}</button></td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
        </div>
      </div>
  );
}

export default AdminDashboard;
