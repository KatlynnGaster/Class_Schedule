import React, { useState, useEffect } from 'react';
import { addClass } from './api/api';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: "",
    code: "",
    kind: "",
    section: "",
    term: "",
  });

  useEffect(() => {
    const fetchClasses = async () => {
      const classList = await getClasses();
      setClasses(classList);
    };

    fetchClasses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (!formData.code || isNaN(formData.code)) {
      alert('Class code must be a number.');
      return;
    }

    if (!formData.name || formData.name.trim() === '') {
      alert('Class name is required.');
      return;
    }

    if (!formData.section || !/^[A-Za-z]$/.test(formData.section)) {
      alert('Section must be a single letter (e.g., A, B, C).');
      return;
    }

    if (!formData.days || !/^(M|T|W|R|F)(,(M|T|W|R|F))*$/.test(formData.days)) {
      alert('Days must be one or more from M, T, W, R, F, separated by commas (e.g., M,W,F).');
      return;
    }

    if (!formData.time || !/^\d{4}-\d{4}$/.test(formData.time)) {
      alert('Time must be in military format (e.g., 0900-1000).');
      return;
    }

    if (!formData.room || isNaN(formData.room)) {
      alert('Room must be a number.');
      return;
    }

    const nextId = classes.reduce((maxId, cls) => Math.max(maxId, cls.id), 0) + 1;
    const newClass = { id: nextId, ...formData };

    // Proceed with submission if all checks pass
    const success = await addClassScheduleRoom(newClass); //newClass

    if (success) {
      alert('Class added successfully!');
      setFormData({ code: '', name: '', section: '', days: '', time: '', room: ''});
      const updatedClasses = await getClasses();
      setClasses(updatedClasses);
    } else {
      alert('Failed to add class. Please try again.');
    }
  };

  return (
    <div>
      <h1>Class List</h1>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>
            {cls.time} -- {cls.days} -- {cls.code} -- {cls.name} -- {cls.section} -- {cls.room}
          </li>
        ))}
      </ul>

      <h2>Add a New Class</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="code" value={formData.code} onChange={handleInputChange} placeholder="Class Code" required />
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Class Name" required />
        <input type="text" name="section" value={formData.section} onChange={handleInputChange} placeholder="Section" required />
        <input type="text" name="days" value={formData.days} onChange={handleInputChange} placeholder="Days (e.g., M,T,W,R,F)" required />
        <input type="text" name="time" value={formData.time} onChange={handleInputChange} placeholder="Time (e.g., 0900-1000)" required />
        <input type="text" name="room" value={formData.room} onChange={handleInputChange} placeholder="Room" required />
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default ClassList;
