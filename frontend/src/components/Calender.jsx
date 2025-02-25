import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const CustomCalendar = () => {
  const [value, setValue] = useState(new Date());
  

  // Define color-coded dates and styles for the calendar
  // const coloredDays = {
  //   '2024-10-01': 'bg-red-500', // High Occupancy
  //   '2024-10-02': 'bg-yellow-400', // Moderate Availability
  //   '2024-10-03': 'bg-green-400', // High Availability
  //   // Add more dates and colors as needed
  // };

  // const getTileClass = ({ date, view }) => {
  //   if (view === 'month') { // Only apply to month view
  //     const dateString = date.toISOString().split('T')[0];
  //     return coloredDays[dateString] || 'bg-yellow-100 text-white'; // Apply color class if date matches
  //   }
  //   return '';
  // };
  const getTileClass = ({ date, view }) => {
    if (view === 'month') {
      return 'bg-yellow-100 text-white'; // Light yellow background and white text for all dates
    }
    return '';
  };
  const tileContent = ({ date, view }) => {
    if (view === 'month') { // Only add button in month view
      return (
        <button className="w-full h-full bg-blue-500 text-white rounded-full flex items-center justify-center">
        <span>{date.getDate()}</span>
        <i className="fas fa-check-circle ml-1"></i> {/* Optional icon */}
      </button>
      );
    }
    return null;
  };

  return (
    <div className="calendar-container w-full max-w-lg mx-auto" style={{ height: '500px' }}>
      <Calendar 
        onChange={setValue} 
        value={value} 
        tileClassName={getTileClass}
        tileContent={tileContent}       
      />
    </div>
  );
};

export default CustomCalendar;
