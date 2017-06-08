var gameField = new Array();
var board = document.getElementById("game-table");
var currentCol;
var currentRow;
var id = 1;

/*
	Loads the Game title dynamically adds id's
*/

function loadBoard() {

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            $("#gameboard").append('<div id="' + i + j + '"class="tile"></div>');
        }

    }
}

loadBoard();

var tiles = $('.tile');
var game = {
    player1: "red",
    player2: "black"
}
game.currentPlayer = game.player1

function switchTurns() {
    if (game.currentPlayer == game.player1) {
        game.currentPlayer = game.player2
    } else {
        game.currentPlayer = game.player1
    }
}

for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', boxClickHandler)
}

var bb = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
var color = [
    ["w", "w", "w", "w"],
    ["w", "w", "w", "w"],
    ["w", "w", "w", "w"],
    ["w", "w", "w", "w"],
    ["w", "w", "w", "w"],
    ["w", "w", "w", "w"],
];
// what happens when a box is clicked
function boxClickHandler(event) {
    //console.log('the box has been clicked.')
    //console.log(event.srcElement.id);
    var boardId = event.srcElement.id;

    var firstId = boardId.substring(0, 1);
    var lastId = boardId.substring(1, 2);
    console.log(lastId);

    // Any last row circle is allowed to click first
    if (firstId == 5) {
        bb[firstId][lastId] = 1;
    }

    // Check if the below box is empty? or not filled yet
    if (firstId != 5 && bb[Number(firstId) + 1][Number(lastId)] !== 1) {
        return;
    }


    if (game.currentPlayer == game.player1) {
        $(this).addClass('red');
        bb[firstId][lastId] = 1;
        color[firstId][lastId] = "r";
        checkRedIsWinner();
    } else if (game.currentPlayer == game.player2) {
        $(this).addClass('black');
        bb[firstId][lastId] = 1;
        color[firstId][lastId] = "b";
        checkBlackIsWinner();
    }
    this.removeEventListener('click', boxClickHandler)
    switchTurns();

}


function checkRedIsWinner() {


    //Vertical Winner Check
    for (var i = 0; i < 7; i++) {
        var verticalCount = 0;
        for (var k = 0; k < 6; k++) {
            if (color[k][i] == "r") {
                verticalCount++;
            } else {
                verticalCount = 0;
            }
            if (verticalCount == 4) {
                announceWinner("red");
                return;
            }
        }
    }



    //Horizontal winner check
    for (var i = 0; i < 6; i++) {
        var horizontalCount = 0;
        for (var j = 0; j < 7; j++) {

            if (color[i][j] == "r") {
                horizontalCount++;
            } else {
                horizontalCount = 0;
            }

            if (horizontalCount == 4) {
                announceWinner("red");
                return;
            }

        }

    }

    // Daigonal Checking for winner in all possible cases starting first column

    for (var k = 3; k <= 5; k++) {

        var i = k;
        var count = 0;
        for (var j = 0; j <= k && i >= 0; j++) {
            if (color[i][j] == "r") {
                count++;
            } else {
                count = 0;
            }
            i--;
            if (count == 4) {
                announceWinner("red");
                return;
            }
        }

    }

    // Daigonal Checking for winner in all possible cases starting last row, 2nd column
    for (var k = 0; k < 3; k++) {
        var i = 5;
        var count = 0;
        for (var j = 1; j <= 6 && i >= k; j++) {
            if (color[i][j] == "r") {
                count++;
            } else {
                count = 0;
            }
            i--;
            if (count == 4) {
                announceWinner("red");
                return;
            }
        }
    }



}

function checkBlackIsWinner() {

    //Vertical Winner Check for black
    for (var i = 0; i < 7; i++) {
        var verticalCount = 0;
        for (var k = 0; k < 6; k++) {
            if (color[k][i] == "b") {
                verticalCount++;
            } else {
                verticalCount = 0;
            }
            if (verticalCount == 4) {
                announceWinner("black");
                return;

            }
        }
    }

    //Horizontal winner check for black
    for (var i = 0; i < 6; i++) {
        var horizontalCount = 0;
        for (var j = 0; j < 7; j++) {

            if (color[i][j] == "b") {
                horizontalCount++;
            } else {
                horizontalCount = 0;
            }
            if (horizontalCount == 4) {
                announceWinner("black");
                return;
            }

        }


    }

    // Daigonal Checking for winner in all possible cases starting first column

    for (var k = 3; k <= 5; k++) {

        var i = k;
        var count = 0;
        for (var j = 0; j <= k && i >= 0; j++) {
            if (color[i][j] == "b") {
                count++;
            } else {
                count = 0;
            }
            i--;
            if (count == 4) {
                announceWinner("black");
                return;
            }
        }

    }

    // Daigonal Checking for winner in all possible cases starting last row, 2nd column
    for (var k = 0; k < 3; k++) {
        var i = 5;
        var count = 0;
        for (var j = 1; j <= 6 && i >= k; j++) {
            if (color[i][j] == "b") {
                count++;
            } else {
                count = 0;
            }
            i--;
            if (count == 4) {
                announceWinner("black");
                return;
            }
        }
    }

}


function announceWinner(color) {
    alert(color + " is winner");
    setTimeout(function() {
        location.reload();
    }, 1200);
}
