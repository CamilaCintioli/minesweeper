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
  toggleFlag: (x: number, y: number) => void;
  openCell: (x: number, y: number) => void;
  reset: () => void;
}

function generateBombsIndexes(maxIndex: number, bombs: number) {
  let bombsIndexed = new Set()
  while (bombsIndexed.size < bombs) {
    bombsIndexed.add(Math.floor(Math.random() * maxIndex))
  }

  return bombsIndexed
}

function createCells(width: number, height: number, bombs: number) {

  const bombsIndexes = generateBombsIndexes(width * height, bombs)

  return new Array(height * width).fill(null).map((_, index) => ({
    x: index % width,
    y: Math.floor(index / width),
    state: null,
    isOpen: false,
    isBomb: bombsIndexes.has(index)
  }))

}

function getRemainingBombs(cells: Cell[]) {
  return cells.reduce((bombsRemaining,cell) => {

    if(cell.isBomb && cell.state === '🚩'){
      return bombsRemaining
    }

    if(cell.isBomb){
      return bombsRemaining+1
    }
    if(cell.state === '🚩'){
      return bombsRemaining-1
    }
    return bombsRemaining

  } ,0)
}

function toggleFlagAt(x: number, y: number, cells: Cell[]): Cell[] {

  return cells.map(cell => cell.x === x && cell.y === y ? { ...cell, state: cell.state ? null : '🚩' } : cell)

}

function openCellAt(x: number, y: number, cells: Cell[]): [MineSweeperState, Cell[]] {

  const targetCell = cells.find(cell => cell.x === x && cell.y === y) as Cell

  if (targetCell.isOpen) {
    return ['🙂', cells]
  }

  if (targetCell.isBomb) {
    return ['😨', endGame(cells)]
  }

  const newState = calculateCellState(targetCell, cells)

  if (newState === 0) {
    return ['🙂', getSurroundingCells(targetCell, cells).reduce((acc, { x, y }) => openCellAt(x, y, acc)[1], execOpenCellAt(targetCell, cells))]
  }

  return ['🙂', execOpenCellAt(targetCell, cells)]

}

function execOpenCellAt(targetCell: Cell, cells: Cell[]): Cell[] {
  return cells.map(cell => cell.x === targetCell.x && cell.y === targetCell.y ? openCell(cell, cells) : cell)
}

function openCell(cell: Cell, cells: Cell[]): Cell {

  if (cell.isBomb) {
    return { ...cell, isOpen: true, state: '💣' }
  }

  return { ...cell, isOpen: true, state: calculateCellState(cell, cells) }
}

function getSurroundingCells({ x, y }: Cell, cells: Cell[]) {
  return cells.filter((cell) => Math.abs(cell.x - x) <= 1 && Math.abs(cell.y - y) <= 1 && !(cell.x === x && cell.y === y))
}

function calculateCellState(cell: Cell, cells: Cell[]) {
  return getSurroundingCells(cell, cells).filter(({ isBomb }) => isBomb).length
}

function endGame(cells: Cell[]): Cell[] {
  return cells.map(cell => openCell(cell, cells))
}

export default function useMineSweeper({
  width = 5,
  height = 5,
  bombs = 5,
}: MineSweeperConfig): MineSweeperBag {
  const expirationDate = useMemo(() => new Date(), []);

  const [cells, setCells] = useState<Cell[]>(() => createCells(width, height, bombs))
  const [gameState, setGameState] = useState<MineSweeperState>('🙂')

  const bombsRemaining = useMemo(() => getRemainingBombs(cells), [cells])

  const toggleFlag = useCallback((x, y) => {
    setCells(toggleFlagAt(x, y, cells))
  }, [cells])

  const openCell = useCallback((x, y) => {
    const [newGameState, newCells] = openCellAt(x, y, cells)
    setCells(newCells)
    setGameState(newGameState)
  }, [cells])

  const reset = useCallback(() => {
    setGameState('🙂')
    setCells(createCells(width, height, bombs))
  }, [width, height, bombs])

  return {
    cells,
    state: gameState,
    expirationDate,
    bombsRemaining,
    toggleFlag,
    openCell,
    reset
  }
}
