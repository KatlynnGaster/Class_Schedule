import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import getClasses from "../getClassLogic";

import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const CourseList = () => {
  const { classes } = getClasses();
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
    console.log("Classes data from getClasses:", classes);

    if (classes && Array.isArray(classes) && classes.length > 0) {
      const mapped = classes.map((cls) => ({
        subject: cls?.data?.kind,
        code: cls?.data?.code,
        name: cls?.data?.name,
        year: cls?.data?.year,
        section: cls?.data?.section,
        term: cls?.data?.term,
        days: cls?.data?.days,     
        time: cls?.data?.time,
        cap: cls?.data?.capacity,
        credit: cls?.data?.credit,
        room: cls?.data?.room,
        instructor: cls?.data?.instructor
      }));
      console.log("Mapped data for AG Grid:", mapped);
      setRowData(mapped);
    } else {
      setRowData([]);
    }
  }, [classes]);

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
