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

  //if(possibleMoves)console.log("possible Moves", possibleMoves)
  //if(checkerToMove)console.log("checker to Move", checkerToMove)
  //if(piceToTake)console.log("pice To Take", piceToTake)

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
      console.log("Takeing stage")
      //checking to see if a pice is going to be taken 
      //if so move player checker and delete oponent checker 
      console.log(checkerToMove!.position[0], i )
      if((checkerToMove!.type === red && checkerToMove!.position[0] - i > 1) || (checkerToMove!.type === black && i - checkerToMove!.position[0] > 1)){
      let updatedGame = [...board]
      updatedGame[checkerToMove!.position[0]][checkerToMove!.position[1]] = "";
      updatedGame[i][j] = checkerToMove!.type
      updatedGame[piceToTake[0]][piceToTake[1]] = ""
      setPossibleMoves([])
      setBoard(updatedGame)

      //checking for double jump 
      let doublejumpArr = []
      if(checkerToMove?.type === red){
        let up = i - 1;
        let left = j - 1;
        let right = j + 1;
        if(left >= 0 &&  up <= 7 && board[up][left] === black){
          let moreUp = up - 1;
          let moreLeft = left -1;
          if(moreLeft >= 0 && moreUp <= 7 && board[moreUp][moreLeft] === ""){
            //if it is add that to the possible moves
            //store the pice to take cordinates
            console.log("here")
            setPiceToTake([up,left])
            doublejumpArr.push([moreUp , moreLeft])
          }
        }
          if(right >= 7 &&  up <= 7 && board[up][right] === black){
            let moreUp = up - 1;
            let moreRight = right -1;
            if(moreRight >= 0 && moreUp <= 7 && board[moreUp][moreRight] === ""){
              //if it is add that to the possible moves
              //store the pice to take cordinates
              console.log("here")
              setPiceToTake([up,left])
              doublejumpArr.push([moreUp , moreRight])
            }
          }
        } else if(checkerToMove?.type === black){
            let down = i - 1;
            let left = j - 1;
            let right = j + 1;
            if(left >= 0 &&  down > 0 && board[down][left] === red){
              let moreDown = down + 1;
              let moreLeft = left - 1;
              if(moreLeft >= 0 && moreDown <= 7 && board[moreDown][moreLeft] === ""){
                setPiceToTake([down,left])
                doublejumpArr.push([moreDown , moreLeft])
              }
            }
              if(right >= 7 &&  down <= 7 && board[down][right] === black){
                let moreDown = down + 1;
                let moreRight = right -1;
                if(moreRight >= 0 && moreDown <= 7 && board[moreDown][moreRight] === ""){
                  setPiceToTake([down,left])
                  doublejumpArr.push([moreDown , moreRight])
                }
              }
            }
          
    
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

    //this arr will store our possible moves 
    const movesArr = []
    //pice at the top of board cancle 
    if (i === 0) return;
    if(cell === red){
      let up = i - 1;
      let left = j - 1;
      let right = j + 1;
      //if move does not go off screen and is not occupied by other red checker  
      if(left >= 0 && board[up][left] !== red){
        //if the space is occupide by a black checker 
        if(board[up][left] === black){
          let moreUp = up - 1;
          let moreLeft = left -1;
          //console.log(moreLeft >= 0 && moreUp <= 7 && board[moreUp][moreLeft] === "")
          //change the target to the diagonal beyond that pice and see if it is empty 
          if(moreLeft >= 0 && moreUp <= 7 && board[moreUp][moreLeft] === ""){
            //if it is add that to the possible moves
            //store the pice to take cordinates
            console.log("here")
            setPiceToTake([up,left])
            movesArr.push([moreUp , moreLeft])
          }
        }else{
          //nevermind forget the stored pice we could have taken 
          
          movesArr.push([up,left])
        }
      }
      if(right <= 7 && board[up][right] !== red){
        if(board[up][right] === black){
          setPiceToTake([up,right])
          let moreUp = up - 1;
          let moreRight = right + 1;
          if(moreRight <= 7 && moreUp <= 7 && board[moreUp][moreRight] === ""){
            movesArr.push([moreUp , moreRight])
          }
        }else{
          movesArr.push([up,right])
        }
      }
    }
    else if(cell === black){
      let down = i + 1;
      let left = j - 1;
      let right = j + 1; 
      //if the possible move is not off the board or a black pice is already their.
      if(left >= 0 && board[down][left] !== black){
        //if a red pice is their check to see if it can be jumped else ignore 
        if(board[down][left] === red){
          setPiceToTake([down, left])
          let moreDown = down + 1
          let moreLeft = left - 1
          if(moreLeft >= 0 && moreDown >= 0 && board[moreDown][moreLeft] === ""){
            movesArr.push([moreDown, moreLeft])
          }
        }else{
          movesArr.push([down,left])
        }
      }
      if(right <= 7 && board[down][right] !== black){
        if(board[down][right] === red){   
          setPiceToTake([down, right])
          let moreDown = down + 1
          let moreRight = right + 1
          if(moreRight <= 7 && moreDown <= 7 && board[moreDown][moreRight] === ""){
            movesArr.push([moreDown,moreRight])
          }
        }else{
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
