import styled from "styled-components";

const Input = styled.input`
    width: 303px;
    height: 45px;
    border-radius: 5px;
    border: 2px solid #D4D4D4;
    padding: 12px;
    margin-bottom: 6px;
    background-color: ${({isLoading}) => isLoading ? "#F2F2F2" : "white"};
    pointer-events: ${({isLoading}) => isLoading ? "none" : "initial"};

    ::placeholder{
        color: #DBDBDB;
        font-size: 19.98px;
    }
`;

export default Input;