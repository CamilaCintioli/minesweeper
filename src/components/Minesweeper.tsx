import React from 'react'
import styled from 'styled-components';

import useMineSweeper from '../hooks/useMineSweeper';

import Cell from './Cell'
import Grid from './Grid'
import ResetButton from './ResetButton'
import Counter from './Counter'
import Header from './Header'


const MinesweeperWrapper = styled.div`
    display: grid;
    grid-gap: 1em;
    margin: auto;
    padding: 0.5em;
    border: 3px outset;
    max-width: 300px;
    background-color: darkgray;
`

export default function Minesweeper() {

    const width = 5;
    const height = 5;
    const bombs = 3;
    const {
      state,
      cells,
      secondsElapsed,
      bombsRemaining,
      toggleFlag,
      openCell,
      reset,
    } = useMineSweeper({ width, height, bombs })
 

    return (
        <MinesweeperWrapper>
            <Header>
                <Counter value={bombsRemaining} size={3} />
                <ResetButton state={state} onClick={(reset)} />
                <Counter value={secondsElapsed} size={3} />
            </Header>
            <Grid >
                {cells.map(({ x, y, state, isOpen }) => (
                    <Cell
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        isOpen={isOpen}
                        state={state}
                        onOpen={openCell}
                        onFlag={toggleFlag}
                    />
                ))}
            </Grid>
        </MinesweeperWrapper>
    )

}