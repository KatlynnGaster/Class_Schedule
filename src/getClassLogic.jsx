import { useState, useEffect } from 'react';
import { getAllClass } from './api/api';

const getClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const fetchClasses = await getAllClass();
        setClasses(fetchClasses);
      }
      catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  return { classes }  
};

export default getClasses;
