import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import { useGridExport } from "../DownloadData/GridExportContent";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getDataContext } from "../api/APIDataProvider";

const CourseList = () => {
  const { nclasses } = getDataContext();
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
    console.log("Classes data from getDataContext:", nclasses);



    if (nclasses && Array.isArray(nclasses) && nclasses.length > 0) {
     
      const mapped = nclasses.map((cls) => {

        return {
          subject: cls.class_type,
          code: cls.code,
          name: cls.name,
          year: cls.year,  // there is still no year in table
          section: cls.section,
          term: cls.term,
          days: cls.schedule[0].days,     
          time: cls.schedule[0].start_hour + ":" + String(cls.schedule[0].start_minute).padStart(2,"0") + " - " + cls.schedule[0].end_hour + ":" + String(cls.schedule[0].end_minute).padStart(2,"0"),
          cap: cls.capacity,
          credit: cls.credit, // there is still no credit in table
          room: cls.room[0].room_number, // there is rooms in table, but not assigned to classes yet
          instructor: cls.faculty[0].name,
        };
      });
      console.log("Mapped data for AG Grid:", mapped);
      setRowData(mapped);
    } else {
      setRowData([]);
    }
  }, [nclasses]);

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
