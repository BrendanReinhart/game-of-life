// var tileIDs = [];
var allIDs =  [];
var aliveIDs = [];
var deadIDs = [];
let cellMatrix = [];

var canvas = document.getElementById("game-window");
var ctx = canvas.getContext("2d");

var options = {
    sizeX: 80,
    sizeY: 60
}

var runGame;

jQuery(document).ready(function() {
    loadGame();
});

$('.go-button-wrapper').on('click', '.go-button', startGame);
// $('.go-button-wrapper').on('click', '.stop-button', stopGame);
canvas.addEventListener('click', canvasClick);