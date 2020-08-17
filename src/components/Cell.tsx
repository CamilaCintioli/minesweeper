import React, { useCallback } from 'react'
import styled from 'styled-components';

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

interface Props extends React.Props<never> {
    state: '💣' | '🚩' | null | number,
    isOpen: boolean,
    x: number,
    y: number,
    onOpen: (x: number, y: number) => void,
    onFlag: (x: number, y: number) => void,
}

export default function Cell({
    x, y,
    state, isOpen, onOpen, onFlag,
}: Props){
    const openCell = useCallback(() => {
        onOpen(x, y);
    }, [onOpen, x, y]);

    const toggleFlag = useCallback((event) => {
        event.stopPropagation()
        event.preventDefault()
        onFlag(x,y);
    }, [onFlag, x, y])

    return(
        <Button disabled={isOpen} onClick={openCell} onContextMenu={!isOpen ? toggleFlag : undefined}><ButtonInner>{state}</ButtonInner></Button>
    )
}

Cell.defaultProps = {
    state: null,
    isOpen: false,
}
