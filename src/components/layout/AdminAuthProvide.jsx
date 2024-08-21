/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AdminAuthContext = createContext(null);

const AdminAuthProvider = ({ children }) => {
    const [authToken, setToken] = useState('');
    const [isLoading,setIsLoading]=useState(false)

    return (
        <AdminAuthContext.Provider value={{ authToken, setToken ,setIsLoading,isLoading}}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export default AdminAuthProvider;
