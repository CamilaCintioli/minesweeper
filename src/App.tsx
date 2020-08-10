import React from 'react';
import { createGlobalStyle } from 'styled-components'

import Cell from './components/Cell'
import Grid from './components/Grid'
import ResetButton from './components/ResetButton'
import Counter from './components/Counter'
import Header from './components/Header'

import useMineSweeper from './hooks/useMineSweeper';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "seven-segment";
    src: url("/fonts/seven-segment.ttf") format("truetype");
  }
`;

function App() {
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
      <GlobalStyle />
      <Header>
        <Counter>{bombsRemaining}</Counter>
        <ResetButton state={state} onClick={(reset)} />
        <Counter>5000</Counter>
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
  );
}

export default App;
