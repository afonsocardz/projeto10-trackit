import { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

export const useProgressContext = () => useContext(ProgressContext);

export default function ProgressContextProvider({ children }) {
    const [progress, setProgress] = useState(0);
    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {children}
        </ProgressContext.Provider>
    );
}