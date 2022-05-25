import styled from "styled-components";

const Input = styled.input`
    width: 200px;
    height: 84px;
    border-radius: 12px;
    border: 2px solid gray;
    padding: 12px;

    ::placeholder{
        color: gray;
        font-size: 24px;
    }
`;

export default Input;