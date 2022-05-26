import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import API from "../API";
import Input from "../components/styles/Input";
import Container from "../components/styles/Container";
import Button from "../components/styles/Button";



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
                <Container>
                    <Input value={email} placeholder={"E-mail"} onChange={(e) => setEmail(e.target.value)} />
                    <Input value={password} placeholder={"Senha"} onChange={(e) => setPassword(e.target.value)} />
                    <Button width={'200px'} height={"25px"}>Logar</Button>
                </Container>
            </form>
        </>
    );
}