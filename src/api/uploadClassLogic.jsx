import { useState, useEffect } from 'react';
import { addClass } from './api';  //uploadClass goes here

const postTableData = (file) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        if (file) {
            const data = await addClass(file);
            setTableData(data);
        }
      }
      catch (error) {
        console.error('Error fetching from table data:', error);
        setTableData([])
      }
    };

    if (file) {
        fetchTableData(data);
    }
    
  }, [file]);

  return { tableData }  
};

export default postTableData;