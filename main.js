let currentPlayer = 1;
let matrix = Array(6).fill().map(() => Array(7).fill(0)); //make a 2d array of the board and fill it with 0s

function cursorMove() {
  let circle = document.querySelector("#circle");
  const onMouseMove = (e) => {
    circle.style.left = e.pageX + "px";
    circle.style.top = e.pageY + "px";
  };
  document.addEventListener("mousemove", onMouseMove);
}

function place(columnID) {
  let column = document.querySelector("#" + columnID);
  let columnRows = column.children;
  let rowIndex = null;
  let circle = document.querySelector("#circle");
  let currentPlayerCircle = document.querySelector('.chip');
  let currentPlayerText = document.querySelector('#playerText');
  let currentColumnIndex = columnID.slice(6) - 1; //because we get the current column as a string 'column1' 'column4'.. etc

  for (let i = columnRows.length - 1; i >= 0; i--) {
    if (
      window.getComputedStyle(columnRows[i]).backgroundColor !=
      "rgb(255, 255, 255)"
    ) {
    } else {
      rowIndex = i;
      isGameFinished(columnID, rowIndex);
      break;
    }
  }
  if (this.currentPlayer == 1) {
    currentPlayerText.innerText = "Player 1";
    circle.style.backgroundColor = "red";
    currentPlayerCircle.style.backgroundColor ="red";
    currentPlayerCircle.style.boxShadow = "inset 5px 0px 5px rgb(128, 0, 0)";
    matrix[rowIndex][currentColumnIndex] = 2;
  } else {
    currentPlayerText.innerText = "Player 2";
    circle.style.backgroundColor = "yellow";
    currentPlayerCircle.style.backgroundColor ="yellow";
    currentPlayerCircle.style.boxShadow = "inset 5px 0px 5px rgb(145, 145, 7)";
    matrix[rowIndex][currentColumnIndex] = 1;
  }

  this.currentPlayer == 1 ? (this.currentPlayer = 2) : (this.currentPlayer = 1);
  fillTable();
  console.table(matrix);
}

function isGameFinished(currentColumn, currentRow) {
  let currentColumnIndex = currentColumn.slice(6) - 1; //because we get the current column as a string 'column1' 'column4'.. etc
  let columnArray = [];
  for (let i = 1; i <= 7; i++) {
    columnArray.push(document.querySelector("#column" + i));
  }

  const initialColumnIndex = currentColumnIndex;
  const initialRow = currentRow;
 
  let count = 1; //count starts at 1 because there is always one chip that we just inserted
    
    //first check right and left
    while(currentColumnIndex != 6  && isPoint(columnArray[currentColumnIndex + 1].children[currentRow])) {
      count ++;
      currentColumnIndex++;
    }
      currentColumnIndex = initialColumnIndex; //start at the initial chip location and check left
      while(currentColumnIndex != 0 && isPoint(columnArray[currentColumnIndex - 1].children[currentRow])) {
        currentColumnIndex --;
        count ++;
      }
      if(count >= 4) {
       playerWins()
      }
      //if there aren't 4 connected right and left, we check if there are 4 connected downwards
      //we don't check up because it isn't possible to insert a circle on the bottom
      else {
        //reset count and current column, because we start the count over once we change directions
        currentColumnIndex = initialColumnIndex;
        count = 1;
        while(currentRow != 5 && isPoint(columnArray[currentColumnIndex].children[currentRow + 1])){
          currentRow ++;
          count ++;
        }
        if(count >= 4) {
          playerWins()
        }
        //if there aren't 4 connected downwards, we check if there are 4 connected right diagonally
        else {
          currentColumnIndex = initialColumnIndex;
          currentRow = initialRow;
          count = 1;
          //first start right diagonally up
          while(currentRow != 0 && currentColumnIndex != 6 &&
            isPoint(columnArray[currentColumnIndex+1].children[currentRow-1]))
            {
              count ++;
              currentColumnIndex ++;
              currentRow --;
            }
          //start from the initial position and check right diagonally down
          currentColumnIndex = initialColumnIndex;
          currentRow = initialRow;
          while(currentRow !=5 && currentColumnIndex != 0 &&
            isPoint(columnArray[currentColumnIndex-1].children[currentRow+1])){
              count++;
              currentColumnIndex--;
              currentRow++;
            }
            if(count >= 4) {
              playerWins()
            }
            //if there aren't 4 connected right diagonally, we check if there are 4 connected left diagonally
            else {
             currentColumnIndex = initialColumnIndex;
             currentRow = initialRow;
             count = 1;
             //first start left diagonally up
             while(currentRow != 0 && currentColumnIndex != 0 &&
              isPoint(columnArray[currentColumnIndex-1].children[currentRow-1])) {
                count ++;
                currentColumnIndex --;
                currentRow --;
             }
             //start from the initial position and check left diagonally down
             currentColumnIndex = initialColumnIndex;
             currentRow = initialRow;

             while(currentRow != 5 && currentColumnIndex != 6 &&
              isPoint(columnArray[currentColumnIndex+1].children[currentRow+1])) {
                count ++;
                currentColumnIndex ++;
                currentRow ++;
             }
             if(count >= 4) {
              playerWins()
            }
        }
      }
}
}

// red = rgb(255, 0, 0) has to have spaces
//yellow = rgb(255, 255, 0)
//white = rgb(255, 255, 255)

function isPoint(circle) {
  if (this.currentPlayer == 1) {
    return (
      window.getComputedStyle(circle).backgroundColor == "rgb(255, 255, 0)"
    );
  } else {
    return window.getComputedStyle(circle).backgroundColor == "rgb(255, 0, 0)";
  }
}

function playerWins() {
  let wrapper = document.querySelector(".board-wrapper");
  wrapper.style.display = 'none';

  let winScreen = document.querySelector('.win-screen');
  winScreen.style.display = 'flex';
  let winScreenPlayer = document.querySelector("#win-screen-player");
  if(this.currentPlayer == 1){
    winScreenPlayer.style.color = 'yellow';
    winScreenPlayer.innerText = 'Player 2'
  }
  else {
    winScreenPlayer.style.color = 'red';
    winScreenPlayer.innerText = 'Player 1';
  }
}

function playAgain() {
  resetTable();
  resetMatrix();
  let wrapper = document.querySelector(".board-wrapper");
  wrapper.style.display = 'block';

  let winScreen = document.querySelector('.win-screen');
  winScreen.style.display = 'none';
}

function resetTable() {
  let columnArray = [];
  for (let i = 1; i <= 7; i++) {
    columnArray.push(document.querySelector("#column" + i));
  }
  for(let i = 0; i<7; i++) {
    for(let j = 0; j<6; j++) {
      columnArray[i].children[j].style.backgroundColor = 'white';
    }
  }
}

function resetMatrix() {
  for(let i = 0; i < 6; i++) {
    for(let j = 0; j < 7; j++) {
      matrix[i][j] = 0;
    }
  }
}

function fillTable() {
  //create a 2d array of the board containing the div elements
  let columnArray = [];
  for (let i = 1; i <= 7; i++) {
    columnArray.push(document.querySelector("#column" + i));
  }
  //to get the specific position use columnArray[ColumnIndex].children[RowIndex]

  //fill the current position with the appropriate color based on the 2d array
  for(let i = 0; i < 6; i++) {
    for(let j = 0; j < 7; j++) {
      if(matrix[i][j] == 2) {
        let column = document.querySelector("#column" + (j+1));
        column.children[i].style.backgroundColor = "yellow";
      }
      else if(matrix[i][j] == 1) {
        let column = document.querySelector("#column" + (j+1));
        column.children[i].style.backgroundColor = "red";
      }
    }
  }
}

