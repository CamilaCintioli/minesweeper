import React from 'react'
import styled from 'styled-components';

const Pepita = styled.button`
    margin: 0;
    padding: 0;
    border: 0;
    background-color: gray;
    border-radius: 0;
    font-size: 16px;

    :disabled {
        background-color: darkgray;
    }
`;


interface Props extends React.Props<never> {
    state: '💣' | '🚩' | null | number,
    isOpen: boolean,
    onClick: () => void,
}

export default function Cell({
    state, isOpen, onClick
}: Props){
    return(
        <Pepita disabled={isOpen} onClick={onClick}>{state}</Pepita>
    )
}

Cell.defaultProps = {
    state: null,
    isOpen: false,
}
