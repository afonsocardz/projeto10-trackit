import styled from "styled-components";
import Frame from "../components/styles/Frame";
import TitlePage from "../components/styles/TitlePage";

export default function History() {
    return (
        <Frame isLogged={true}>
            <TopContainer>
                <TitlePage>Histórico</TitlePage>
            </TopContainer>
            <span style={{fontSize:"18px"}}>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
        </Frame>
    );
}

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: auto;
    margin-bottom: 17px;
`;