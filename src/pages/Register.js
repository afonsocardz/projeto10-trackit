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
import { ThreeDots } from "react-loader-spinner";
import Frame from "../components/styles/Frame";

export default function Register() {
    const { status, setStatus } = useUserContext();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        promise.then(res => {
            const { data } = res;
            console.log(data);
            setIsLoading(false);
            navigate("/");
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
            const { response } = err;
            const { data } = response;
            const { details } = data;
            details.map(detail =>  alert(detail));
        });
    };

    return (
        <Frame isLogged={false}>
            <form onSubmit={handleRegister}>
                <Container>
                    <MainLogo />
                    <Input isLoading={isLoading} type={"email"} value={email} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} />
                    <Input isLoading={isLoading} type={"password"} security={true} value={password} placeholder={"Senha"} onChange={(e) => setPassword(e.target.value)} />
                    <Input isLoading={isLoading} value={name} placeholder={"Nome"} onChange={(e) => setName(e.target.value)} />
                    <Input isLoading={isLoading} value={image} placeholder={"Imagem"} onChange={(e) => setImage(e.target.value)} />
                    <Button width={'303px'} height={"45px"} fontSize={"21px"} isLoading={isLoading}>{isLoading ? <ThreeDots color={"white"} /> : "Registrar"}</Button>
                    <RegOrLog onClick={() => navigate("/")}>Já tem uma conta? Faça login!</RegOrLog>
                </Container>
            </form>
        </Frame>
    );
}