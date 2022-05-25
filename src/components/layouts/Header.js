import styled from "styled-components";

export default function Header() {
    return (
        <Header>
            <span>TrackIt</span>
        </Header>
    );
}

const Header = styled.header`
    width: 100%;
    position: fixed;
    display: flex;
    padding: 8px;
    justify-content: space-between;
    align-items: center;
    height: 84px;
    font-size: 34px;
    background-color: blue;
`;
