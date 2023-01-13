let currentPlayer = 1;

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
    columnRows[rowIndex].style.backgroundColor = "yellow";
    circle.style.backgroundColor = "red";
  } else {
    columnRows[rowIndex].style.backgroundColor = "red";
    circle.style.backgroundColor = "yellow";
  }
  this.currentPlayer == 1 ? (this.currentPlayer = 2) : (this.currentPlayer = 1);
}

function isGameFinished(currentColumn, currentRow) {
  let currentColumnIndex = currentColumn.slice(6) - 1; //because we get the current column as a string 'column1' 'column4'.. etc
  let columnArray = [];
  for (let i = 1; i <= 7; i++) {
    columnArray.push(document.querySelector("#column" + i));
  }

  //left right check
  if (currentColumnIndex != 0 && currentColumnIndex != 6) {
    count = 1;
    //check left first
    while (isPoint(columnArray[currentColumnIndex - 1].children[currentRow])) {
      count++;
      currentColumnIndex++;
      console.log(count);
    }
    if (count == 4) {
      console.log("u win retard");
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

// function isYellow(circle) {
//   return window.getComputedStyle(circle).backgroundColor == "rgb(255, 255, 0)";
// }

// function isEmpty(circle) {
//   return (
//     window.getComputedStyle(circle).backgroundColor == "rgb(255, 255, 255)"
//   );
// }
