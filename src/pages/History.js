import styled from "styled-components";
import TitlePage from "../components/styles/TitlePage";

export default function History() {
    return (
        <>
            <TopContainer>
                <TitlePage>Histórico</TitlePage>
            </TopContainer>
            <span style={{fontSize:"18px"}}>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
        </>
    );
}

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: auto;
    margin-bottom: 17px;
`;