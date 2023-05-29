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

type checkerToMove = {
  position:number[],
  type: string | JSX.Element 
}

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

  const [possibleMoves, setPossibleMoves] = useState<number[][]>([])
  const [checkerToMove, setCheckerToMove] = useState<checkerToMove>()
  const [piceToTake, setPiceToTake] = useState<number[]>([])

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

    if (possibleMoves.some(([x, y]) => x === i && y === j)) {
      className = "cell green"
    }

    return className
  }

  const showRedMove = (i : number, j: number, cell : (string | JSX.Element)) =>{
    if(possibleMoves.some(([x, y]) => x === i && y === j)){
      //checking to see if a pice is going to be taken 
      //if so move player checker and delete oponent checker 
      if(i - 1 > checkerToMove!.position[0]){
      let updatedGame = [...board]
      updatedGame[checkerToMove!.position[0]][checkerToMove!.position[1]] = "";
      updatedGame[i][j] = checkerToMove!.type
      updatedGame[piceToTake[0]][piceToTake[1]] = ""
      setBoard(updatedGame)
        return;
      }
      console.log("cool")
      let updatedGame = [...board]
      updatedGame[checkerToMove!.position[0]][checkerToMove!.position[1]] = "";
      updatedGame[i][j] = checkerToMove!.type
      setBoard(updatedGame)
      setCheckerToMove({position:[], type:""})
      setPossibleMoves([])
      return;
    }

    const movesArr = []
    if (i === 0) return;
    if(cell === red){
      let up = i - 1;
      let left = j - 1;
      let right = j + 1; 
      if(left >= 0 && board[up][left] !== red){
        if(board[up][left] === black){
          setPiceToTake([up,left])
          up--;
          left--;
          if(left >= 0 && board[up][left] === ""){
            movesArr.push([up,left])
          }
        }else{
          setPiceToTake([])
          movesArr.push([up,left])
        }
      }
      if(right <= 7 && board[up][right] !== red){
        if(board[up][right] === red){
          setPiceToTake([up,right])
          up--;
          right++;
          if(right <= 7 && board[up][right] === ""){
            movesArr.push([up,right])
          }
        }
        movesArr.push([up,right])
      }
    }
    if(cell === black){
      let down = i + 1;
      let left = j - 1;
      let right = j + 1; 
      //if the possible move is not off the board or a black pice is already their.
      if(left >= 0 && board[down][left] !== black){
        //if a red pice is their check to see if it can be jumped else ignore 
        if(board[down][left] === red){
          setPiceToTake([down, left])
          down++;
          left--;
          if(left >= 0 && board[down][left] === ""){
            movesArr.push([down,left])
          }
        }else{
          setPiceToTake([])
          movesArr.push([down,left])
        }
      }
      if(right <= 7 && board[down][right] !== black){
        if(board[down][right] === red){   
          setPiceToTake([down, right])
          down++;
          right++;
          if(right <= 7 && board[down][right] === ""){
            movesArr.push([down,right])
          }
        }else{
          setPiceToTake([])
          movesArr.push([down,right]);
        }
      }
      //logic for showing if a jump to take pice is avilable 
        
    }
    //if their are no possible moves forget the location of the last clicked checker 
    if(movesArr.length === 0){
      setCheckerToMove({position:[], type:""})
    }else{
      setCheckerToMove({position:[i,j], type: cell})
    }
    setPossibleMoves(movesArr);
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
