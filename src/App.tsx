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

  /**
   * this is a helper function which gives the cells of the board their correct color.
   * @param i row number
   * @param j colum number
   * @returns string with correct class name to color board
   */
  const colorBoard = (i : number, j: number) =>{
    let clasName = "cell"
    if(i % 2 == 0){
      if(j % 2 == 0) clasName += " brown"
      else clasName += " white"
    }else{
      if(j % 2 == 0) clasName += " white"
      else clasName += " brown"
    }
    return clasName
  }

  return (
    <>
       <div className='container'>
        <div className='game-board'> 
          {board.map((row, i) => 
            row.map((cell, j) =>{
              return <div className={`${colorBoard(i,j)}`}>{cell}</div>;
            })
          )}
        </div>
        
       
      </div> 
    </>
  )
}

export default App
