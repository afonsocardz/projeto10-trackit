import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useUserContext } from "../../contexts/UserContext";
import { useProgressContext } from "../../contexts/ProgressContext";


export default function Menu() {
    const { user } = useUserContext();
    const { progress } = useProgressContext();
    const navigate = useNavigate();
    const percentage = progress;
    return (
        <>
            {user &&
                <Footer>
                    <span onClick={() => navigate("/habitos")}>Hábitos</span>
                    <TodayButton onClick={() => navigate("/hoje")}>
                        <CircularProgressbar
                            value={percentage}
                            text={`Hoje`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })}
                        />
                    </TodayButton>
                    <span onClick={() => navigate("/historico")}>Histórico</span>
                </Footer >
            }
        </>
    );
}

const TodayButton = styled.div`
    width: 100px;
    height: 100px;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 10%;
`;

const Footer = styled.footer`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0; 
    padding: 8px;    
    font-size: 18px;
    background-color: white;
    color: blue;
`;