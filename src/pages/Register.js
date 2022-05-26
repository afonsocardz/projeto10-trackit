import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import Input from "../components/styles/Input";
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
        const promise = axios.post(API, body);
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
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                <Input value={image} onChange={(e) => setImage(e.target.value)} />
                <button loadingStatus={status}>Registrar</button>
            </form>
        </>
    );
}