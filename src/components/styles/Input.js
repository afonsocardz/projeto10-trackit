import styled from "styled-components";

const Input = styled.input`
    width: 200px;
    height: 45px;
    border-radius: 12px;
    border: 2px solid lightgray;
    padding: 12px;

    ::placeholder{
        color: lightgray;
        font-size: 16px;
    }
`;

export default Input;