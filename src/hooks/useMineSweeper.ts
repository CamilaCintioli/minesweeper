
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

export default function useMineSweeper({
  width = 5,
  height = 5,
  bombs = 5,
}: MineSweeperConfig): MineSweeperBag {
  return {
    cells: [
      {
        x: 10,
        y: 10,
        state: 2,
        isOpen: false,
      }
    ],
    state: '🙂',
    expirationDate: new Date(Date.now() + (5*60*1000)),
    bombsRemaining: 3,
    putFlag: (...args: any[]) => {debugger},
    openCell: (...args: any[]) => {debugger},
    reset: (...args: any[]) => {debugger}
  }
}
