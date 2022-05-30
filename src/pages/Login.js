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
import RegOrLog from "../components/styles/RegOrLog";


import { ThreeDots } from 'react-loader-spinner';




export default function Login({setIsLogged}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null) {
            navigate("/hoje")
        }
    }, [])

    function handleLogin(e) {
        e.preventDefault();
        const body = {
            email,
            password
        };
        const promise = axios.post(`${API}/auth/login`, body);
        setIsLoading(true);
        promise.then(res => {
            const { data } = res;
            const obj = {
                id: data.id,
                name: data.name,
                image: data.image,
                email: data.email,
                token: { headers: { "Authorization": `Bearer ${data.token}` } },
                habits: [],
            }
            setUser(obj);
            localStorage.setItem("user", JSON.stringify(obj));
            setIsLoading(false);
            setIsLogged(true);
            navigate("/hoje")
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
            const { response } = err;
            const { data } = response;
            const { message } = data;
            alert(message);
        });
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <Container>
                    <MainLogo />
                    <Input isLoading={isLoading} type={"email"} value={email} placeholder={"E-mail"} onChange={(e) => setEmail(e.target.value)} />
                    <Input isLoading={isLoading} type={"password"} security={true} value={password} placeholder={"Senha"} onChange={(e) => setPassword(e.target.value)} />
                    <Button width={'303px'} isLoading={isLoading} height={"45px"} fontSize={"21px"}>{isLoading ?
                        <ThreeDots
                            color='white'
                            ariaLabel='loading' /> :
                        "Entrar"}
                    </Button>
                    <RegOrLog onClick={() => navigate("/cadastro")}>Não tem uma conta? Cadastre-se!</RegOrLog>
                </Container>
            </form>
        </>
    );
}


