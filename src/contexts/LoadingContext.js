import { useContext, createContext, useState } from "react";

const loadingContext = createContext();

export const useLoadingContext = () => useContext(loadingContext);

export default function LoadingContextProvider({children}) {
    const [status, setStatus] = useState(false);
    return(
        <loadingContext.Provider value={{status, setStatus}}>
            {children}
        </loadingContext.Provider>
    );
}