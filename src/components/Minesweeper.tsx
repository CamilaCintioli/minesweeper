import React from 'react'

import useMineSweeper from '../hooks/useMineSweeper';

import Cell from './Cell'
import Grid from './Grid'
import ResetButton from './ResetButton'
import Counter from './Counter'
import Countdown from './Countdown'
import Header from './Header'


export default function Minesweeper() {

    const width = 5;
    const height = 5;
    const bombs = 3;
    const {
      state,
      cells,
      expirationDate,
      bombsRemaining,
      putFlag,
      openCell,
      reset,
    } = useMineSweeper({ width, height, bombs })
 

    return (
        <div>
            <Header>
                <Counter>{bombsRemaining}</Counter>
                <ResetButton state={state} onClick={(reset)} />
                <Countdown to={expirationDate} component={Counter} />
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
                        onFlag={putFlag}
                    />
                ))}
            </Grid>
        </div>
    )

}