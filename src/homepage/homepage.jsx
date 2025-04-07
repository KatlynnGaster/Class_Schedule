import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import ScheduleGrid from '../gridView/gridView';
import CourseList from '../listView/listView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import * as XLSX from 'xlsx'; // ← for parsing Excel files


const App = () => {
  const [view, setView] = useState('grid'); // Track the current view
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // ← success state

  const handleViewSwitch = (viewType) => {
    setView(viewType);
    setUploadSuccess(false);
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("Selected file:", selectedFile);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Parsed Excel Data:", jsonData);
      alert("File has been uploaded successfully!");
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
            <Nav.Link onClick={() => handleViewSwitch('grid')}>Grid View</Nav.Link>
            <Nav.Link onClick={() => handleViewSwitch('calendar')}>Calendar View</Nav.Link>
            <Nav.Link onClick={() => handleViewSwitch('list')}>List View</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Content Area */}
      <Container className="mt-5"> {/* Increase margin to prevent content from being hidden behind navbar */}
        {view === 'grid' ? <ScheduleGrid /> : null}
      </Container>
      <Container className="mt-5">
      {view === 'list' && <CourseList />} {/* Use CourseList here */}
      </Container>


      <Container className="mt-5">
        {view === 'uploadFile' && (
          <div className="mt-4">
            <h3>Upload Excel File</h3>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select Excel File</Form.Label>
                <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileChange}/>
              </Form.Group>
              <Button onClick={handleFileUpload}>Upload</Button>
            </Form>
            {uploadSuccess && (
              <Alert variant="success" className="mt-3">
                File has been uploaded successfully!
              </Alert>
            )}
          </div>
        )}
      </Container>

    </div>
  );
};

export default App;