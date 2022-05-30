import styled from "styled-components";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {

    const { user } = useUserContext();
    console.log(user);

    return (
        <> {
            user &&
            <Topbar>
                <Logo>TrackIt</Logo>
                {!user ? <></> :
                    <AvatarContainer>
                        <Avatar src={user.image} alt={"Profile Avatar"} />
                    </AvatarContainer>}
            </Topbar>
        }

        </>
    );
}

const AvatarContainer = styled.div`
    overflow: hidden;
    width: 51px;
    height: 51px;
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
    padding: 11px 17px;    
    font-size: 34px;
    background-color: #126BA5;
    color: white;
    filter:  drop-shadow(0 4px 4px rgba(0,0,0,0.3));
`;

const Logo = styled.span`
    font-size: 40px;
    color: white;
    font-family: 'Playball', cursive;
`;

