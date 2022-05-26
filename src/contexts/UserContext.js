import { createContext, useState, useContext } from "react";
import { useLoadingContext } from "./LoadingContext";


const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const {status, setStatus} = useLoadingContext();
    
    return (
        <UserContext.Provider value={{user, setUser, status, setStatus}}>
            {children}
        </UserContext.Provider>
    );
}