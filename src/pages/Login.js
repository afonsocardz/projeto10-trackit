import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import Input from "../components/styles/Input";
import { useUserContext } from "../contexts/UserContext";

export default function Login() {
    const { setUser, setStatus } = useUserContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        const body = {
            email,
            password
        };
        const promise = axios.post(API, body);
        setStatus(true);
        promise.then(res => {
            const { data } = res;
            setUser(
                {
                    id: data.id,
                    name: data.name,
                    image: data.image,
                    email: data.email,
                    password: data.password,
                    token: data.token,
                    isLogged: true,
                }
            );
            setStatus(false);
            navigate("/hoje")
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Logar</button>
            </form>
        </>
    );
}