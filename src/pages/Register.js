import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import MainLogo from "../components/MainLogo";
import Button from "../components/styles/Button";
import Container from "../components/styles/Container";
import Input from "../components/styles/Input";
import RegOrLog from "../components/styles/RegOrLog";
import { useUserContext } from "../contexts/UserContext";

export default function Register() {
    const { status, setStatus } = useUserContext();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();
        const body = {
            email,
            name,
            image,
            password
        };
        const promise = axios.post(`${API}/auth/sign-up`, body);
        setStatus(true);
        promise.then(res => {
            const { data } = res;
            console.log(data);
            setStatus(false);
            navigate("/");
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <>
            <form onSubmit={handleRegister}>
                <Container>
                    <MainLogo/>
                    <Input type={"email"} value={email} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} />
                    <Input type={"password"} security={true} value={password} placeholder={"Senha"} onChange={(e) => setPassword(e.target.value)} />
                    <Input value={name} placeholder={"Nome"} onChange={(e) => setName(e.target.value)} />
                    <Input value={image} placeholder={"Imagem"} onChange={(e) => setImage(e.target.value)} />
                    <Button width={'303px'} height={"45px"} fontSize={"21px"}>Registrar</Button>
                    <RegOrLog onClick={() => navigate("/")}>Já tem uma conta? Faça login!</RegOrLog>
                </Container>
            </form>
        </>
    );
}