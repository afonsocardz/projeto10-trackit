import styled from "styled-components";

const Button = styled.button`
    width: ${({ width }) => width ? width : "100%"};
    height: ${({ height }) => height ? height : "0"};
    background-color: #52B6FF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size:${({fontSize}) => fontSize};
    font-family: 'Lexend Deca', sans-serif;;
`;

export default Button;