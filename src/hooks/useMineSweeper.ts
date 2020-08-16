import { useMemo, useState, useCallback } from 'react';
import { create } from 'domain';

interface MineSweeperConfig {
  width: number;
  height: number;
  bombs: number;
}

type MineSweeperState = '🙂' | '😨'

type CellState = '💣' | '🚩' | null | number

interface Cell {
  x: number
  y: number
  state: CellState
  isOpen: boolean
  isBomb: boolean
}

interface MineSweeperBag {
  cells: Cell[]
  state: MineSweeperState
  expirationDate: Date
  bombsRemaining: number
  putFlag: (x: number, y: number) => void;
  openCell: (x: number, y: number) => void;
  reset: () => void;
}

function generateBombsIndexes(maxIndex:number, bombs:number){
  let bombsIndexed = new Set()
  while(bombsIndexed.size < bombs){
    bombsIndexed.add(Math.floor(Math.random()*maxIndex))
  }

  return bombsIndexed
}

function createCells(width: number, height: number, bombs: number){

  const bombsIndexes = generateBombsIndexes(width*height, bombs)

  return new Array(height*width).fill(null).map((_,index) => ({
    x: index % width, 
    y: Math.floor(index/width),
    state: null,
    isOpen: false,
    isBomb : bombsIndexes.has(index)
  }))

}

function getRemainingBombs(cells: Cell[]){
  return 90
}

function putFlagAt(x: number,y: number,cells: Cell[]):Cell[]{

  return cells.map(cell => cell.x === x && cell.y === y ? {...cell,state:'🚩'} : cell)

}

function openCellAt(x: number,y: number,cells: Cell[]):Cell[]{

  return cells.map(cell => cell.x === x && cell.y === y ? openCell(cell,cells) : cell)

}

function openCell(cell:Cell,cells:Cell[]): Cell{

  if(cell.isBomb){
    return {...cell,state:'💣',isOpen:true}
  }

  return {...cell,isOpen:true,state:calculateCellState(cell,cells)}

}

function getSurroundingCells({ x, y }:Cell, cells:Cell[]) {
  return cells.filter((cell) => Math.abs(cell.x - x) <= 1 && Math.abs(cell.y - y) <= 1 && !(cell.x === x && cell.y === y)) 
}

function calculateCellState(cell:Cell,cells:Cell[]){
  return getSurroundingCells(cell,cells).filter(({ isBomb }) => isBomb).length
}


export default function useMineSweeper({
  width = 5,
  height = 5,
  bombs = 5,
}: MineSweeperConfig): MineSweeperBag {
  const expirationDate = useMemo(() => new Date(Date.now() + (5 * 60 * 1000)), []);

  const [cells, setCells] = useState<Cell[]>(() => createCells(width, height, bombs))
  const [gameState, setGameState] = useState<MineSweeperState>('🙂')

  const bombsRemaining = useMemo(() => getRemainingBombs(cells), [cells])

  const putFlag = useCallback((x, y) => {
    setCells(putFlagAt(x, y, cells))
  }, [cells])

  const openCell = useCallback((x,y) => {
    setCells(openCellAt(x,y,cells))
  }, [cells])

  const reset = useCallback(() => {
    setGameState('🙂')
    setCells(createCells(width,height,bombs))
  }, [width,height,bombs])

  return {
    cells,
    state: gameState,
    expirationDate,
    bombsRemaining,
    putFlag,
    openCell,
    reset
  }
}
