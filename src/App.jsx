import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ViewSchedulePage from './ViewSchedulePage';
import ClassCard from './ClassCard';
import './App.css';

function WeekGrid() {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hoursOfDay = Array.from({ length: 13 }, (_, i) => i + 8);

  return (
    <div className="container mt-4">
      <div className="week-grid">
        {/* Grid Header */}
        <div className="grid-header d-flex">
          <div className="hour-label"></div>
          {daysOfWeek.map((day) => (
            <div key={day} className="day-header text-center flex-grow-1">
              {day}
            </div>
          ))}
        </div>

        {/* Grid Body */}
        <div className="grid-body">
          {hoursOfDay.map((hour) => (
            <div className="grid-row d-flex align-items-center" key={hour}>
              <div className="hour-label text-center">{hour}:00</div>
              {daysOfWeek.map((day, index) => (
                <div key={`${hour}-${day}`} className="grid-cell border flex-grow-1"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <ViewSchedulePage />
      <ClassCard />
      <WeekGrid />
    </>
  );
}

export default App;
