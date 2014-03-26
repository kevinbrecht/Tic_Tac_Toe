//Global Variables
var painted;
var content;
var winningCombinations;
var turn = 0;
var theCanvas;
var c;
var cxt;
var squaresFilled = 0;
var w;
var y;
var name1;
var name2;
var count = 0;
//Instanciate Arrays
window.onload = function () {
    painted = new Array();
    content = new Array();
    winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var l = 0; l <= 8; l++) {
        painted[l] = false;
        content[l] = '';
    }
}
//Kevin: loadcanvas() reseted das Speilfeld, unvollständig
function loadCanvas() {
    for (var l = 0; l < 9; l++) {
        painted[l] = false;
        content[l] = '';
    }
    squaresFilled = 0;
    ClearField();
}

function clearField() {
    //todo
}

//Game methods
function canvasClicked(canvasNumber) {
    theCanvas = "canvas" + canvasNumber;
    c = document.getElementById(theCanvas);
    cxt = c.getContext("2d");

    if (painted[canvasNumber - 1] == false) {
        if (turn % 2 == 0) {
            cxt.beginPath();
            cxt.moveTo(10, 10);
            cxt.lineTo(90, 90);
            cxt.moveTo(90, 10);
            cxt.lineTo(10, 90);
            cxt.stroke();
            cxt.closePath();
            content[canvasNumber - 1] = 'X';
        } else {
            cxt.beginPath();
            cxt.arc(50, 50, 45, 0, Math.PI * 2, true);
            cxt.stroke();
            cxt.closePath();
            content[canvasNumber - 1] = 'O';
        }

        turn++;
        count++;
        DisplayPlayer();
        painted[canvasNumber - 1] = true;
        squaresFilled++;
        checkForWinners(content[canvasNumber - 1]);

        if (squaresFilled == 9) {
            alert("Das Spiel ist vorbei!");
            location.reload(true);
        }

    } else {
        alert("Das Feld ist bereits belegt!");
    }

}

function Start() {
    //Kevin: Random Abfrage + Start des Spiels
    if (count == 0) {
        count = Math.floor((Math.random() * 2) + 1);
    }
    name1 = document.getElementById("name1").value;
    name2 = document.getElementById("name2").value;
    DisplayPlayer();
}

function DisplayPlayer() {
    if (count != 0) {
        //Kevin: count wurde kompatible gemacht mit mehr als 9 Spielzügen da count nach dem speil NICHT reseted wird
        if (count % 2 == 1)
            document.getElementById("caption").innerHTML = name1 + " ist an der Reihe";
        else
            document.getElementById("caption").innerHTML = name2 + " ist an der Reihe";
    }
}

function checkForWinners(symbol) {

    for (var a = 0; a < winningCombinations.length; a++) {
        if (content[winningCombinations[a][0]] == symbol && content[winningCombinations[a][1]] == symbol && content[winningCombinations[a][2]] == symbol) {
            alert(symbol + " WON!");
            playAgain();
        }
    }

}

function playAgain() {
    y = confirm("Noch einmal?");
    if (y == true) {
        //location.reload(true);
        //Kevin: loadCanvas wird aufgerufen um nicht alle bisherigen daten zu verlieren
        //vorher war es jedesmal ein reload der page
        loadCanvas();
    } else {
        alert("Schade...");
    }

}