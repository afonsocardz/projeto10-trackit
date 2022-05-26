import styled from "styled-components";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {

    const { user } = useUserContext();

    return (
        <Topbar>
            <span>TrackIt</span>
            {!user.isLogged ? <></> : <img src={user.image} alt={"Profile Avatar"}/>}
        </Topbar>
    );
}

const Topbar = styled.header`
    width: 100%;
    height: 84px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0; 
    padding: 8px;    
    font-size: 34px;
    background-color: blue;
    color: white;
`;
