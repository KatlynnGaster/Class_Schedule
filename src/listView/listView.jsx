import React from "react";
import "./listView.css"; // Ensure the CSS is linked

const mathCourses = [
  { MATH: "Calc I", Core: "Core", Code: "MATH 101", Name: "Calculus I", Sec: "A", Term: "Fall", Days: "MWF", Time: "10-11:30", Cap: 30, Credit: 3, Room: "B101", Instr: "Dr. Smith", Sched: "Online" },
  { MATH: "Lin Alg", Core: "Elective", Code: "MATH 210", Name: "Linear Algebra", Sec: "B", Term: "Spring", Days: "TTh", Time: "1-2:30", Cap: 25, Credit: 3, Room: "C202", Instr: "Prof. Johnson", Sched: "In-Person" }
];

const physicsCourses = [
  { PHYS: "Mechanics", Core: "Core", Code: "PHYS 101", Name: "Mechanics", Sec: "A", Term: "Fall", Days: "MWF", Time: "9-10:30", Cap: 35, Credit: 4, Room: "D101", Instr: "Dr. Lee", Sched: "In-Person" },
  { PHYS: "Electromagnetism", Core: "Core", Code: "PHYS 201", Name: "Electromagnetism", Sec: "B", Term: "Spring", Days: "TTh", Time: "2-3:30", Cap: 40, Credit: 4, Room: "E202", Instr: "Prof. Wang", Sched: "Online" }
];

const CourseList = () => {
  return (
    <div className="list-container">
      <table className="course-table">
        <thead>
          <tr>
            <th>MATH</th>
            <th>Core</th>
            <th>Code</th>
            <th>Name</th>
            <th>Sec</th>
            <th>Term</th>
            <th>Days</th>
            <th>Time</th>
            <th>Cap</th>
            <th>Credit</th>
            <th>Room</th>
            <th>Instr</th>
            <th>Sched</th>
          </tr>
        </thead>
        <tbody>
          {mathCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.MATH}</td>
              <td>{course.Core}</td>
              <td>{course.Code}</td>
              <td>{course.Name}</td>
              <td>{course.Sec}</td>
              <td>{course.Term}</td>
              <td>{course.Days}</td>
              <td>{course.Time}</td>
              <td>{course.Cap}</td>
              <td>{course.Credit}</td>
              <td>{course.Room}</td>
              <td>{course.Instr}</td>
              <td>{course.Sched}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="course-table physics-table">
        <thead>
          <tr>
            <th>PHYS</th>
            <th>Core</th>
            <th>Code</th>
            <th>Name</th>
            <th>Sec</th>
            <th>Term</th>
            <th>Days</th>
            <th>Time</th>
            <th>Cap</th>
            <th>Credit</th>
            <th>Room</th>
            <th>Instr</th>
            <th>Sched</th>
          </tr>
        </thead>
        <tbody>
          {physicsCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.PHYS}</td>
              <td>{course.Core}</td>
              <td>{course.Code}</td>
              <td>{course.Name}</td>
              <td>{course.Sec}</td>
              <td>{course.Term}</td>
              <td>{course.Days}</td>
              <td>{course.Time}</td>
              <td>{course.Cap}</td>
              <td>{course.Credit}</td>
              <td>{course.Room}</td>
              <td>{course.Instr}</td>
              <td>{course.Sched}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
