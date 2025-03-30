import React, { useState } from "react";
import "./weeklyschedule.css"; // Import CSS file

const WeeklySchedule = () => {
  const [scheduleType, setScheduleType] = useState(""); // Stores the selected schedule type
  const [weeklySchedule, setWeeklySchedule] = useState([]); // Stores the fetched schedule

  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Function to fetch the weekly schedule based on user selection
  const fetchSchedule = async () => {
    if (!scheduleType) {
      alert("Please select a schedule type.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/weekly-schedule?type=${scheduleType}`);
      const data = await response.json();

      if (data.weekly_schedule) {
        // Convert object to array and sort it based on predefined day order
        const scheduleArray = Object.keys(data.weekly_schedule)
          .map((day) => ({
            day,
            ...data.weekly_schedule[day],
          }))
          .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)); // Sort based on dayOrder

        setWeeklySchedule(scheduleArray);
      } else {
        setWeeklySchedule([]);
      }
    } catch (error) {
      console.error("Error fetching weekly schedule:", error);
    }
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-heading">Select Your Weekly Meal Plan</h2>

      <div className="selection-container">
        <label>
          <input
            type="radio"
            name="scheduleType"
            value="veg"
            onChange={(e) => setScheduleType(e.target.value)}
          />
          Proper Vegetarian
        </label>

        <label>
          <input
            type="radio"
            name="scheduleType"
            value="nonveg"
            onChange={(e) => setScheduleType(e.target.value)}
          />
          Proper Non-Vegetarian
        </label>

        <label>
          <input
            type="radio"
            name="scheduleType"
            value="mixed"
            onChange={(e) => setScheduleType(e.target.value)}
          />
          Mixed Veg & Non-Veg
        </label>

        <button onClick={fetchSchedule} className="fetch-button">
          Show Schedule
        </button>
      </div>

      <div className="schedule-results">
        {weeklySchedule.length > 0 ? (
          weeklySchedule.map((day, index) => (
            <div key={index} className="schedule-card">
              <h3>{day.day}</h3>
              <p><strong>Breakfast:</strong> {day.breakfast}</p>
              <p><strong>Lunch:</strong> {day.lunch}</p>
              <p><strong>Snack:</strong> {day.snack}</p>
              <p><strong>Dinner:</strong> {day.dinner}</p>
            </div>
          ))
        ) : (
          <p className="no-schedule">No schedule found. Please select an option.</p>
        )}
      </div>
    </div>
  );
};

export default WeeklySchedule;
