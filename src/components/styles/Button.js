import styled from "styled-components";

const Button = styled.button`
    width: ${({ width }) => width ? width : "100%"};
    height: ${({ height }) => height ? height : "0"};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({color}) => color ? "red" : "#52B6FF"};
    opacity: ${({isLoading}) => isLoading ? "0.7" : "1"};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size:${({fontSize}) => fontSize};
    font-family: 'Lexend Deca', sans-serif;
    pointer-events: ${({isLoading})=> isLoading ? "none" : "initial"};
`;

export default Button;