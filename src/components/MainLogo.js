import styled from "styled-components";
import LogoImg from "../assets/imgs/logo.png"

export default function MainLogo() {
    return (
        <>
            <img src={LogoImg} alt={"Logo"}/>
            <Logo>TrackIt</Logo>
        </>
    );
}

const Logo = styled.span`
    font-family: 'Playball', cursive;
    font-size: 70px;
    color: #126BA5;
    height: 86.23px;
    margin-bottom: 32.62px;
    display: flex;
`;