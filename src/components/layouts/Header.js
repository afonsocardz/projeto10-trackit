import styled from "styled-components";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {

    const { user } = useUserContext();

    return (
        <Topbar>
            <span>TrackIt</span>
            {!user.isLogged ? <></> :
                <AvatarContainer>
                    <Avatar src={user.image} alt={"Profile Avatar"} />
                </AvatarContainer>}
        </Topbar>
    );
}

const AvatarContainer = styled.div`
    overflow: hidden;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
`;

const Avatar = styled.img`
    object-fit: contain;
    width: auto;
    height: 100%;
`;

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
