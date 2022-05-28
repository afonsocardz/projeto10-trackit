import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import API from "../API";
import Input from "../components/styles/Input";
import Container from "../components/styles/Container";
import Button from "../components/styles/Button";
import MainLogo from "../components/MainLogo";



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(()=>{
        if (user !== null) {
            navigate("/hoje")
        }
    },[])
    
    function handleLogin(e) {
        e.preventDefault();
        const body = {
            email,
            password
        };
        const promise = axios.post(`${API}/auth/login`, body);
        //setStatus(true);
        promise.then(res => {
            const { data } = res;
            const obj = {
                id: data.id,
                name: data.name,
                image: data.image,
                email: data.email,
                token: { headers: { "Authorization": `Bearer ${data.token}` } },
                isLogged: true,
            }
            setUser( {...obj, password: data.password});
            localStorage.setItem("user", JSON.stringify(obj));
            //setStatus(false);
            navigate("/hoje")
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <Container>
                    <MainLogo/>
                    <Input value={email} placeholder={"E-mail"} onChange={(e) => setEmail(e.target.value)} />
                    <Input value={password} placeholder={"Senha"} onChange={(e) => setPassword(e.target.value)} />
                    <Button width={'303px'} height={"45px"} fontSize={"21px"}>Entrar</Button>
                </Container>
            </form>
        </>
    );
}


