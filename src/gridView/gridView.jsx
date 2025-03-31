import { useState, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./gridView.css";

const ItemTypes = {
  CLASS: "class",
};

function ClassCard({ className }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CLASS,
    item: { className },
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
      {className}
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

  useEffect(() => {
    const syncScroll = () => {
      if (scrollContainerRef.current && headerRef.current) {
        headerRef.current.scrollLeft = scrollContainerRef.current.scrollLeft;
      }
    };

    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", syncScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", syncScroll);
      }
    };
  }, []);

  const handleDropClass = (room, time, className) => {
    setSchedule((prev) => ({
      ...prev,
      [`${room}-${time}`]: className,
    }));
  };

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
          <div className="grid-body">
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
        <div className="class-list">
          <ClassCard className="Math 101" />
          <ClassCard className="Physics 202" />
          <ClassCard className="Chemistry 303" />
        </div>
      </div>
    </DndProvider>
  );
}

export default ScheduleGrid;