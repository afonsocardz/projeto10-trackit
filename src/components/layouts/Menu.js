import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Menu() {
    const navigate = useNavigate();
    return (
        <Footer>
            <span onClick={() => navigate("/habitos")}>Hábitos</span>
            <TodayButton>Hoje</TodayButton>
            <span onClick={() => navigate("/historico")}>Histórico</span>
        </Footer>
    );
}

const TodayButton = styled.button`
    width: 100px;
    height: 100px;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 10%;
    border: none;
    border-radius: 50%;
    color: white;
    background-color: blue;

`;

const Footer = styled.footer`
    width: 100%;
    height: 84px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0; 
    padding: 8px;    
    font-size: 18px;
    background-color: lightgray;
    color: blue;
`;