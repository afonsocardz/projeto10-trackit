import styled from "styled-components";

const Frame = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 84px;
    margin-bottom: 70px;
    padding: 8px;
    background-color: ${localStorage.getItem("user") !== null ? "#f2f2f2" : "white"};
`;

export default Frame;