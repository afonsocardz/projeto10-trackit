import styled from "styled-components";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {

    const { user } = useUserContext();

    return (
        <Topbar>
            <span>TrackIt</span>
            <div>
                {user}
            </div>
        </Topbar>
    );
}

const Topbar = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    padding: 8px;
    justify-content: space-between;
    align-items: center;
    height: 84px;
    font-size: 34px;
    background-color: blue;
`;
