import styled from "styled-components";

const Frame = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction:column;
    margin-top: 84px;
    margin-bottom: 70px;
    padding: 17px;
    background-color: ${({isLogged}) => isLogged  ? "#f2f2f2" : "white"};
`;

export default Frame;