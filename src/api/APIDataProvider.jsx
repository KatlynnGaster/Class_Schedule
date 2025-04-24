import { createContext, useContext, useState, useEffect } from 'react';
import { getCombinedClassDetails} from './api';

const DataContext = createContext();
const APIDataProvider = ({ children }) => {
    const [nclasses, setNClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            
                const fetchedNClasses = await getCombinedClassDetails(); // Assuming you have a function to fetch nclasses
               
                setNClasses(fetchedNClasses); // Assuming you have a function to fetch nclasses
                console.log('Fetched classes:', fetchedNClasses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ nclasses }}>
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