import React, { useEffect,useState } from 'react'
import CustomCalendar from '../components/Calender';
import { useParams } from "react-router-dom";
import StatusCard from '../components/StatusCard';
function Property() {
    const { propertyId } = useParams();

    const [property, setProperty] = useState({
        list_ID:'',
        list_name:'',
        host_ID:'',
        host_name:'',
        neighbourhood:'',
        latitude:'',
        longitude:'',
        room_type:'',
        price:''
        
    });
    const [dates, setDates] = useState({ fromDate: "", endDate: "" });
    const [dateList, setDateList] = useState([]);

    const [occupancyPredictions, setOccupancyPredictions] = useState([]);

    const generateDateArray = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateList = [];
    
        // Ensure the dates are valid
        if (start && end && start <= end) {
          while (start <= end) {
            dateList.push(new Date(start).toISOString().split('T')[0]); // Format as YYYY-MM-DD
            start.setDate(start.getDate() + 1);
          }
        }
    
        return dateList;
      };
    
      const handleSubmit = () => {
        if (dates.fromDate && dates.endDate) {
          const generatedDates = generateDateArray(dates.fromDate, dates.endDate);
          setDateList(generatedDates);
          console.log("Generated Dates:", generatedDates); 
          getOccupancyPrediction();
        }
      };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDates((prevDates) => ({
          ...prevDates,
          [name]: value,
        }));
      };

    const fetchProperty = async () => {     
        try {
            // alert(propertyId)
            const response = await fetch(`http://localhost:5000/property/${propertyId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(data);
            setProperty(data.property);
            return data; // optional, in case you want to use the fetched data
        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property data. Please try again later.");
            // Optional: log error to an external service or update the state to show an error message in the UI
        }
    };

    async function getOccupancyPrediction() {
    try {
        const response = await fetch("http://localhost:5000/availability", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            list_ID: property.list_ID,
            dates: dateList,
        }),
        });
    
        if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
        }
    
        const predictions = await response.json();
        console.log("Predictions:", predictions);
        setOccupancyPredictions(predictions);
        return predictions; // Returns the predictions JSON array to be used in your frontend
    } catch (error) {
        console.error("Error fetching predictions:", error);
        return null;
    }
    }

    useEffect(() => {
        fetchProperty();
    }, []);

    // useEffect(() => {
    //     getOccupancyPrediction(2352, '2024-12-31');
    // }
    // , []);
    

  return (
    <>
    <div className="flex w-full h-full overflow-hidden m-8 ">
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    <main className="grow">
        <h2 className="text-3xl font-bold mb-2">PROPERTY DETAILS</h2>

        <div className="grid grid-cols-2 gap-6 ">
        {/* Left Column */}
        <div className="mx-auto my-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{property.list_name}</h2>
        <div className="space-y-3">
            <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Host:</span> {property.host_name}
            </p>
            <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Location:</span> {property.neighbourhood}
            </p>
            <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Coordinates:</span> {property.latitude}, {property.longitude}
            </p>
            <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Room Type:</span> {property.room_type}
            </p>
            <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Price per Night:</span> ${property.price}
            </p>
            <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Neighbourhood</span> {property.neighbourhood}
            </p>
        </div>
        <div className="flex justify-between items-center mt-6">
            <button className="px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-lg text-sm font-medium transition duration-200">
            Book Now
            </button>
            <p className="text-sm text-gray-500">
            <span className="font-semibold">Rating:</span> 4.5 / 5 (200 reviews)
            </p>
        </div>
        </div>
        {/* right column */}
        <div className=' mx-auto my-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200'>
            <div className="flex items-center space-x-4 mt-4">
            <label htmlFor="fromDate" className="text-sm font-medium text-gray-700">From Date</label>
            <input
                type="date"
                id="fromDate"
                name="fromDate"
                value={dates.fromDate}
                onChange={handleDateChange}
                className="w-3/4 px-3 py-2 border border-gray-300 shadow-sm rounded-md"
            />
            </div>

            <div className="flex items-center space-x-4 mt-4">
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700">End Date</label>
            <input
                type="date"
                id="endDate"
                name="endDate"
                value={dates.endDate}
                onChange={handleDateChange}
                className="w-3/4 px-3 py-2 border border-gray-300 shadow-sm rounded-md"
            />
            </div>

            <button
            type="submit"
            className="h-8 mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-white font-semibold rounded-md bg-primary hover:bg-primary-dark focus:ring focus:ring-primary-dark"
            onClick={handleSubmit}
            >
            Check Availability
            </button>
        </div>
        {/* Occupancy Prediction Cards */}
        {/* <div className=' mx-auto my-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200'>
            <div className="flex items-center space-x-4 mt-4">
            <label htmlFor="fromDate" className="text-sm font-medium text-gray-700">From Date</label>
            <input
                type="date"
                id="fromDate"
                name="fromDate"
                value={dates.fromDate}
                onChange={handleDateChange}
                className="w-3/4 px-3 py-2 border border-gray-300 shadow-sm rounded-md"
            />
            </div>

            <div className="flex items-center space-x-4 mt-4">
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700">End Date</label>
            <input
                type="date"
                id="endDate"
                name="endDate"
                value={dates.endDate}
                onChange={handleDateChange}
                className="w-3/4 px-3 py-2 border border-gray-300 shadow-sm rounded-md"
            />
            </div>

            <button
            type="submit"
            className="h-8 mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-white font-semibold rounded-md bg-primary hover:bg-primary-dark focus:ring focus:ring-primary-dark"
            onClick={handleSubmit}
            >
            Check Availability
            </button>
        </div> */}
        <div className="space-y-4 mt-6 mx-auto my-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200 w-full max-w-full max-h-[400px] overflow-y-auto">
        {occupancyPredictions.map((prediction, index) => (
            <StatusCard
            key={index}
            date={new Date(prediction.ds).toDateString()}
            percentage={(prediction.availability_chance * 100).toFixed(2)}
            text={prediction.availability_status}
            />
        ))}
        </div>
        </div> 
</main>
</div>
    </div>
  </>
  
  )
}

export default Property