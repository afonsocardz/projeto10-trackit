import styled from "styled-components";

const Button = styled.button`
    width: ${({ width }) => width ? width : "100%"};
    height: ${({ height }) => height ? height : "0"};
    background-color: #03a9f4;
    color: white;
`;