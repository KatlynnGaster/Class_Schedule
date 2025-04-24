import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { GridExportContext } from "../DownloadData/GridExportContent"; // Import GridExportContext

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./gridView.css";
import ClassCard from "../ClassCard";
import { getDataContext } from "../api/APIDataProvider";

const GetAllClasses = () => {
  const { nclasses } = getDataContext();
  const classList = nclasses.map((cls) => (
    <div key={cls.id} className="class-container">
    <DragClassCard
      key={cls.id}
      classId={cls.id}
      className={cls.name}
      classDescrpt={cls.description}
      classCap={cls.capacity}
      classCode={cls.code}
      classType={cls.class_type}
      classSec={cls.section}
      classTerm={cls.term}
      classTime={cls.schedule[0].start_hour + ":" + String(cls.schedule[0].start_minute).padStart(2,"0") + " - " + cls.schedule[0].end_hour + ":" + String(cls.schedule[0].end_minute).padStart(2,"0")}      
    />
</div>
  ));
  return <div className="class-list">{classList}</div>;
};

const ItemTypes = {
  CLASS: "class",
};

function DragClassCard({ classId, className, classDescrpt, classCap, classCode, classType, classSec, classTerm, classTime}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CLASS,
    item: { classId, className },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
		ref={drag}
		className="class-card p-2 bg-primary text-white text-center"
		style={{
		opacity: isDragging ? 0.5 : 1,
		cursor: "grab",
		fontSize: "1rem",
		}}
    >
      <ClassCard
      classId={classId}
      className={className}
      classDescrpt={classDescrpt}
      classCap={classCap} 
      classCode={classCode}
      classType={classType}
      classSec={classSec} 
      classTerm={classTerm}
      classTime={classTime}
    />
    </div>
  );
}

function GridCell({ room, time, onDropClass, classInCell }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CLASS,
    drop: (item) => onDropClass(room, time, item.className),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="grid-cell">
      {classInCell && (
        <div className="p-2 bg-success text-white rounded">{classInCell}</div>
      )}
    </div>
  );
}

function ScheduleGrid() {
  const roomNumbers = [
    "020", "022", "023", "025", "033", "035", "037", "039", "041", "106",
    "109", "121", "122", "123", "124", "128", "129", "131", "135", "137", "139",
    "141", "221", "222", "223", "224", "226", "229", "231",
  ];
  const timesOfDay = Array.from({ length: 48 }, (_, i) => 8 * 60 + i * 15);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${mins === 0 ? "00" : mins} ${period}`;
  };

  const [schedule, setSchedule] = useState({});
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const { setCustomExport, setGrid } = useContext(GridExportContext); // Access context

  useEffect(() => {
    if (Object.keys(schedule).length > 0) {
      console.log("Schedule updated:", schedule);
    }
  }, [schedule]);

  useEffect(() => {
    if (gridRef.current) {
      console.log("Grid is set:", gridRef.current);
      setGrid(gridRef.current);
    } else {
      console.log("Grid reference is not yet available.");
    }
  
    if (setCustomExport) {
      setCustomExport(() => exportScheduleToCSV);
    }
  }, [schedule, setCustomExport, setGrid]);


  const handleDropClass = (room, time, className) => {
    console.log(`Dropping ${className} into ${room}-${time}`);
    setSchedule((prev) => {
      const updatedSchedule = {
        ...prev,
        [`${room}-${time}`]: className,
      };
      console.log("Updated schedule:", updatedSchedule); // Log updated state
      return updatedSchedule;
    });
  };

  const exportScheduleToCSV = useCallback(() => {
  setTimeout(() => {
    console.log("Schedule before export:", schedule); // Now always up-to-date

    if (Object.keys(schedule).length === 0) {
      console.warn("Schedule is empty. No data to export.");
      return;
    }

    const gridData = [];
    roomNumbers.forEach((room) => {
      timesOfDay.forEach((time) => {
        const classInCell = schedule[`${room}-${time}`] || "";
        gridData.push([formatTime(time), room, classInCell]);
      });
    });

    const csvContent = [
      ["Time", "Room", "Class"].join(","),
      ...gridData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "schedule.csv";
    link.click();
  }, 100);
}, [schedule]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="schedule-container">
        {/* Room Headers (Scrolls with Grid Body) */}
        <div className="grid-header-container" ref={headerRef}>
          <div className="grid-header">
            <div className="hour-label">Time</div>
            {roomNumbers.map((room) => (
              <div key={room} className="day-header">
                {room}
              </div>
            ))}
          </div>
        </div>

        {/* Single Scrollable Grid Body */}
        <div className="scroll-container" ref={scrollContainerRef}>
          <div className="grid-body" ref={gridRef}>
            {timesOfDay.map((time) => (
              <div className="grid-row" key={time}>
                <div className="hour-label">{formatTime(time)}</div>
                {roomNumbers.map((room) => (
                  <GridCell
                    key={`${time}-${room}`}
                    room={room}
                    time={time}
                    onDropClass={handleDropClass}
                    classInCell={schedule[`${room}-${time}`]}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Class List */}
        <div className="class-list-container">
          <GetAllClasses />
        </div>
      </div>
    </DndProvider>
  );
}

export default ScheduleGrid;