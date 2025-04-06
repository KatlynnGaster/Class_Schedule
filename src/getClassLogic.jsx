import { useState, useEffect } from 'react';
import { getAllClass } from './api/api';

const getClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const fetchClasses = await getAllClass();
        console.log('classes in the get logic', fetchClasses)
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
