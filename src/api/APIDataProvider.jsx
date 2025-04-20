import { createContext, useContext, useState, useEffect } from 'react';
import { getAllClass, getFaculty, getSchedules } from './api';

const DataContext = createContext();
const APIDataProvider = ({ children }) => {
    const [classes, setClasses] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedClasses = await getAllClass();
                const fetchedFaculty = await getFaculty();
                const fetchedSchedules = await getSchedules(); // Assuming you have a function to fetch schedules
                setSchedules(fetchedSchedules);
                setFaculty(fetchedFaculty);
                setClasses(fetchedClasses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ classes, faculty, schedules }}>
            {children}
        </DataContext.Provider>
    );
};
export default APIDataProvider;
export const getDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('DataContext must be used within a APIDataProvider');
    }
    return context;
};