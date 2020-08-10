import React from 'react';
import Cell from './components/Cell'
import Grid from './components/Grid'
import ResetButton from './components/ResetButton'
import Counter from './components/Counter'
import Header from './components/Header'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "seven-segment";
    src: url("/fonts/seven-segment.ttf") format("truetype");
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header>
        <Counter>30</Counter>
        <ResetButton state={'🙂'} onClick={() => alert('Me han resetado')} />
        <Counter>5000</Counter>
      </Header>
      <Grid>
        <Cell isOpen={false} state={'💣'} onClick={() => alert('Celda clickeada')} />
        <Cell isOpen={false} state={'💣'} onClick={() => alert('Celda clickeada')} />
        <Cell isOpen={false} state={'💣'} onClick={() => alert('Celda clickeada')} />
        <Cell isOpen={false} state={'💣'} onClick={() => alert('Celda clickeada')} />
      </Grid>
    </div>
  );
}

export default App;
