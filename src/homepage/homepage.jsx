import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Alert } from 'react-bootstrap';
import ScheduleGrid from '../gridView/gridView';
import CourseList from '../listView/listView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import * as XLSX from 'xlsx'; // ← for parsing Excel files
import postTableData from '../api/uploadClassLogic';


const App = () => {
  const [view, setView] = useState('grid'); // Track the current view
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // ← success state
  const [parsedData, setParsedData] = useState(null);
  const [fileError, setFileError] = useState(null);

 //custom hook for backend interaction
  const { table, error, fetchTableData } = postTableData();

  const handleViewSwitch = (viewType) => {
    setView(viewType);
    setUploadSuccess(false);
    setParsedData(null);
  };

  
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileError(null);
    setUploadSuccess(false);
    setParsedData(null);
    console.log("Selected file:", selectedFile);
  };
  // Handle file upload and parsing
  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setFileError(null);
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(worksheet, {defval: "unknown"});
        


        const normalizeTime = (timeStr) => {
          if (!timeStr) return "";
          let cleanedString = timeStr.replace(/[^0-9:-]/g, "");
          let [start, end] = cleanedString.split("-") || [];
          if (!start || !end) {
            console.error("Error: start or end is undefined.");
            return "";
          }

          let startHasColon = start.includes(":");
          let endHasColon = end.includes(":");
          if(!startHasColon) {
            if(start.length === 4){
              start = start.slice(0,2) + ":" + start.slice(2);
            }
            else if(start.length === 3){
              start = start.slice(0,1) + ":" + start.slice(1);
            }
            else {
              start = start + ":00"
            }
          }
          if(!endHasColon) {
            if(end.length === 4){
              end = end.slice(0,2) + ":" + end.slice(2);
            }
            else if(end.length === 3){
              end = end.slice(0,1) + ":" + end.slice(1);
            }
            else {
              end = end + ":00"
            }
          }
          return `${start}-${end}`;
        };


        // Clean up JSON data
        jsonData = jsonData.map(entry => {
        // Remove __EMPTY fields
          Object.keys(entry).forEach(key => {
            if (key.startsWith("__EMPTY")) {
              delete entry[key];
            }
          });

          // Assign specific values to Capacity and Instructor
          entry["Capacity"] = entry["Capacity"] === "unknown" ? 0 : entry["Capacity"];
          entry["Instructor"] = entry["Instructor"] === "unknown" ? "unassigned" : entry["Instructor"];
          entry["Credit Hrs"] = entry["Credit Hrs"] === "unknown" ? 0 : entry["Credit Hrs"];
          entry["Credit Hrs"] = entry["Credit Hrs"] === "-" ? 0 : entry["Credit Hrs"];
          entry["Times"] = entry["Times"] === "unknown" ? "0:00-0:00" : entry["Times"];
          entry["Days"] = entry["Days"] === "unknown" ? "MTWRF" : entry["Days"];
          entry["Course Code"] = String(entry["Course Code"]);

          if (entry["Times"]) {
            entry["Times"] = normalizeTime(entry["Times"]);
          }
          
          if (entry["Days"]) {
            entry["Days"] = entry["Days"].split("").filter(char => "MTWRF".includes(char)).join("")
          }

          return entry;
        });

        console.log("Parsed Excel Data:", jsonData);

        setParsedData(jsonData);       
        setUploadSuccess(true);

        for (const element of jsonData) {
          const response = await fetchTableData(element); // Use the updated hook
          if (response) {
            responses.push(response); // Collect successful responses
          }
        }
      } catch (err) {
        alert("Error parsing the file.");
        setFileError("Error parsing the file or uploading data.");
        console.error(err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>Class Scheduling</Navbar.Brand>
          <Nav className="mr-auto"> {/* This ensures the links are left-aligned */}
            <Nav.Link onClick={() => handleViewSwitch('uploadFile')}>Upload File</Nav.Link>
            <Nav.Link onClick={() => handleViewSwitch('grid')}>Room View</Nav.Link>
            <Nav.Link onClick={() => handleViewSwitch('calendar')}>Calendar View</Nav.Link>
            <Nav.Link onClick={() => handleViewSwitch('list')}>List View</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Content Area */}
      <Container className="mt-5"> {/* Increase margin to prevent content from being hidden behind navbar */}
        {view === 'grid' ? <ScheduleGrid /> : null}
      </Container>
      
      {view === 'list' && <CourseList />}
      
      {/* Upload View */}
      <Container className="mt-5">
        {view === 'uploadFile' && (
          <div className="mt-4">
            <h3>Upload Excel File</h3>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select Excel File</Form.Label>
                <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
              </Form.Group>
              <Button onClick={handleFileUpload}>Upload</Button>
            </Form>

            {fileError && (
              <Alert variant="danger" className="mt-3">
                {fileError}
              </Alert>
            )}


            {uploadSuccess && (
              <Alert variant="success" className="mt-3">
                File has been uploaded and parsed successfully!
              </Alert>
            )}

            {parsedData && (
              <div className="mt-3">
                <h5>Parsed Data Preview:</h5>
                <pre className="bg-light p-2 border rounded" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                  {JSON.stringify(parsedData.slice(0, 5), null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;

