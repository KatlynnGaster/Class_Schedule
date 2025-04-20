import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";

import "ag-grid-community/styles/ag-theme-alpine.css";
import { getDataContext } from "../api/APIDataProvider";
ModuleRegistry.registerModules([AllCommunityModule]);

const CourseList = () => {
  const { classes, faculty, schedules } = getDataContext();
  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
    { field: "subject", headerName: "WCU Prefix" },
    { field: "code", headerName: "Course Code" },
    { field: "name", headerName: "Course Name" },
    { field: "year", headerName: "Year" },
    { field: "section", headerName: "Section" },
    { field: "term", headerName: "Term" },
    { field: "days", headerName: "Days" },
    { field: "time", headerName: "Time" },
    { field: "cap", headerName: "Capacity" },
    { field: "credit", headerName: "Credit Hours" },
    { field: "room", headerName: "Room Number" },
    { field: "instructor", headerName: "Instructor" }
  ]);

  useEffect(() => {
    console.log("Classes data from getDataContext:", classes);
    console.log("Faculty data from getDataContext:", faculty);
    console.log("Schedules data from getDataContext:", schedules);

    if (classes && Array.isArray(classes) && classes.length > 0) {
     
      const mapped = classes.map((cls) => {
        const instructorData = faculty?.find((f) => f?.id === cls?.id);
        const scheduleData = schedules?.find((s) => s?.id === cls?.id);

        return {
          subject: cls?.data?.kind,
          code: cls?.data?.code,
          name: cls?.data?.name,
          year: cls?.data?.year,  // there is still no year in table
          section: cls?.data?.section,
          term: cls?.data?.term,
          days: scheduleData ? scheduleData?.data?.days : "unassigned",     
          time: scheduleData ? `${scheduleData?.data?.start?.hour}:${String(scheduleData?.data?.start?.minute).padStart(2,"0")}-${scheduleData?.data?.end?.hour}:${String(scheduleData?.data?.end?.minute).padStart(2,"0")}` : "unassigned",
          cap: cls?.data?.capacity,
          credit: cls?.data?.credit, // there is still no credit in table
          room: cls?.data?.room, // there is rooms in table, but not assigned to classes yet
          instructor: instructorData ? instructorData?.data?.name : "unassigned",
        };
      });
      console.log("Mapped data for AG Grid:", mapped);
      setRowData(mapped);
    } else {
      setRowData([]);
    }
  }, [classes, faculty, schedules]);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "100vw",     // full viewport width
        height: "100vh",    // or whatever height you want
        margin: 0,
        padding: 0,
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        
      />
    </div>
  );
};


export default CourseList;
