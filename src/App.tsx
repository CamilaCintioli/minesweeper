import React from 'react';
import { createGlobalStyle } from 'styled-components'

import Minesweeper from './components/Minesweeper'

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
      <Minesweeper/>
    </div>
  );
}

export default App;
