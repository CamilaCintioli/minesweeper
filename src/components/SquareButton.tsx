import React from 'react'
import styled from "styled-components";

const Button = styled.button`
margin: 0;
padding: 0;
padding-top:100%;
border: 1px outset;
background-color: lightgray;
border-radius: 0;
font-size: 16px;
min-height: 1em;
position: relative;
outline: none;

:disabled {
    background-color: darkgray;
    border: 1px dashed gray;
}

:active {
    border: 1px inset;
}
`;

const ButtonInner = styled.div`
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;

display: grid;
justify-items: center;
align-items:center;
`

export default function SquareButton({ children, ...props}: any) {
    return <Button {...props}><ButtonInner>{children}</ButtonInner></Button>
}