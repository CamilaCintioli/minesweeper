import React, { useCallback } from 'react'
import styled from 'styled-components';

const Pepita = styled.button`
    margin: 0;
    padding: 0;
    border: 0;
    background-color: gray;
    border-radius: 0;
    font-size: 16px;
    min-height: 1em;

    :disabled {
        background-color: darkgray;
    }
`;


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

    const putFlag = useCallback(() => {
        onFlag(x,y);
    }, [onFlag, x, y])
    return(
        <Pepita disabled={isOpen} onClick={openCell} onContextMenu={putFlag}>{state}</Pepita>
    )
}

Cell.defaultProps = {
    state: null,
    isOpen: false,
}
