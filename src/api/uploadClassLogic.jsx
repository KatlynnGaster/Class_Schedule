import { useState, useEffect } from 'react';
import { uploadClass } from './api';  //uploadClass goes here

const postTableData = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

 const fetchTableData = async (oneJsonElement) => {
  try {
    const data = await uploadClass(oneJsonElement);
    setTableData((prevData) => [...prevData, data]);
    setError(null);
  } catch(err) {
    console.error("Error POST xlsx data", err);
    setError("Failed to POST data");
    return null;
  }
 };

  return { tableData, error, fetchTableData}  
};

export default postTableData;