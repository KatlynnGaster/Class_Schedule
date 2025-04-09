import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ScheduleGrid from '../gridView/gridView';
import CourseList from '../listView/listView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';

const App = () => {
  const [view, setView] = useState('grid'); // Track the current view

  const handleViewSwitch = (viewType) => {
    setView(viewType);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>Class Scheduling</Navbar.Brand>
          <Nav className="mr-auto"> {/* This ensures the links are left-aligned */}
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
      <Container className="mt-5">
      {view === 'list' && <CourseList />} {/* Use CourseList here */}
      </Container>
    </div>
  );
};

export default App;