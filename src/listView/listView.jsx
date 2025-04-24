import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import { useGridExport } from "../DownloadData/GridExportContent";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getDataContext } from "../api/APIDataProvider";

const CourseList = () => {
  const { classes, faculty, schedules } = getDataContext();
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(); //ref for the grid

  const { setGrid } = useGridExport();

  const [colDefs, setColDefs] = useState([
    { field: "subject", headerName: "WCU Prefix"},
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
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    console.log("Grid is ready!")
  }, []);

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

  useEffect(() => {
    if (gridRef.current) {
      setGrid(gridRef.current); // set it in context
    }
  }, [gridRef.current]); // runs once after mount

  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{
          width: "100vw",     // full screen width
          height: "calc(100vh - 60px)",  // fill most of screen minus space for button
          overflow: "hidden"
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          domLayout="autoHeight"
          modules={[AllCommunityModule]}  

        />
      </div>
    </>
  );
}; 


export default CourseList;
