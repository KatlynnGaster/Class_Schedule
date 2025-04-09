import { useState, useEffect } from 'react';
import { uploadClass } from './api';  //uploadClass goes here

const postTableData = (file) => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
          const data = await uploadClass(file);
          setTableData(data);
          setError(null)
      }
      catch (error) {
        console.error('Error fetching from table data:', error);
        setError("Failed to fetch data")
        setTableData([])
      }
    };

    if (file) {
        fetchTableData(data);
    }
  }, [file]);

  return { tableData, error}  
};

export default postTableData;