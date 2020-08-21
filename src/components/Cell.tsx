import React, { useCallback } from 'react'
import SquareButton from './SquareButton';

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
        <SquareButton disabled={isOpen} onClick={openCell} onContextMenu={!isOpen ? toggleFlag : undefined}>{state}</SquareButton>
    )
}

Cell.defaultProps = {
    state: null,
    isOpen: false,
}
