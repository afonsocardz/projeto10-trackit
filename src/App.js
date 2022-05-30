import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState} from "react";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import Habits from "./pages/Habits";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Today from "./pages/Today";
import "./assets/styles/reset.css";
import "./assets/styles/style.css";
import UserContextProvider from "./contexts/UserContext";
import Frame from "./components/styles/Frame";
import ProgressContextProvider from "./contexts/ProgressContext";



export default function App() {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Header />
                <ProgressContextProvider>
                <Frame isLogged={isLogged}>
                        <Routes>
                            <Route path={"/"} element={<Login setIsLogged={setIsLogged} />} />
                            <Route path={"/cadastro"} element={<Register />} />
                            <Route path={"/hoje"} element={<Today />} />
                            <Route path={"/habitos"} element={<Habits />} />
                            <Route path={"/historico"} element={<History />} />
                        </Routes>
                </Frame>
                <Menu />
            </ProgressContextProvider>
        </UserContextProvider>

        </BrowserRouter >
    );
}