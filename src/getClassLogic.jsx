import { useState, useEffect } from 'react';
import { getAllClass } from './api/api';

const useClasses = () => {
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

  // return (
  //   <div>
  //     <h1>Class List</h1>
  //     <ul>
  //       {classes.map((cls) => (
  //         <li key={cls.id}>
  //           {cls.data.name} -- {cls.data.description} -- {cls.data.capacity} -- {cls.data.code} -- {cls.data.kind} -- {cls.data.section} -- {cls.data.term}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default useClasses;
