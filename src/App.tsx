import { useState } from 'react'

import './App.css'

const black =  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="40" fill="#050224" />
<circle cx="50" cy="50" r="32" fill="#8881c9" />
<circle cx="50" cy="50" r="24" fill="#050224" />
</svg>

const red = <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="40" fill="#FF0000" />
<circle cx="50" cy="50" r="32" fill="#fc8b8b" />
<circle cx="50" cy="50" r="24" fill="#FF0000" />
</svg>

function App() {
  const[board, setBoard] = useState([
    ['',black,'',black,'',black,'',black],
    [black,'',black,'',black,'',black,''],
    ['',black,'',black,'',black,'',black],
    ['','','','','','','',''],
    ['','','','','','','',''],
    [red,'',red,'',red,'',red,''],
    ['',red,'',red,'',red,'',red],
    [red,'',red,'',red,'',red,''],
  ])

  const [moves, setMoves] = useState<number[][]>([])

  /**
   * this is a helper function which gives the cells of the board their correct color.
   * @param i row number
   * @param j colum number
   * @returns string with correct class name to color board
   */
  const colorBoard = (i : number, j: number) =>{
    let className = "cell"
    if(i % 2 == 0){
      if(j % 2 == 0) className += " brown"
      else className += " white"
    }else{
      if(j % 2 == 0) className += " white"
      else className += " brown"
    }

    if (moves.some(([x, y]) => x === i && y === j)) {
      className = "cell green"
    }

    return className
  }

  const showRedMove = (i : number, j: number, cell : (string | JSX.Element)) =>{
    const movesArr = []
    if (i === 0) return;
    if(cell === red){
      let up = i - 1;
      let left = j - 1;
      let right = j + 1; 
      if(left >= 0 && board[up][left] !== red) movesArr.push([up,left])
      if(right <= 7 && board[up][right] !== red) movesArr.push([up,right])
      console.log(...movesArr);
    }
    if(cell === black){
      let down = i + 1;
      let left = j - 1;
      let right = j + 1; 
      if(left >= 0 && board[down][left] !== black) movesArr.push([down,left])
      if(right <= 7 && board[down][right] !== black) movesArr.push([down,right])
      console.log(...movesArr);
    }
    setMoves(movesArr);
  }

  return (
    <>
       <div className='container'>
        <div className='game-board'> 
          {board.map((row, i) => 
            row.map((cell, j) =>{
              return <div onClick={() => showRedMove(i,j, cell)} className={`${colorBoard(i,j)}`}>{cell}{`r : ${i}, c : ${j}`}</div>;
            })
          )}
        </div>
        
       
      </div> 
    </>
  )
}

export default App
