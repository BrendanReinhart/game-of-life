var allIDs =  [];
var aliveIDs = [];
var deadIDs = [];
let cellMatrix = [];
let randDec = 0.25;
let speed = 200;

var canvas = document.getElementById("game-window");
var ctx = canvas.getContext("2d"); 

var options = {
    sizeX: 80,
    sizeY: 60
}

var runGame;

$(document).ready(function() {
    loadGame();
});

$('.go-button-wrapper').on('click', '.go-button', startGame);
$('.clear-button').on('click', clearCells);
$('.randomize-button').on('click', randomizeCells);
$('#speed-slider').on('change', updateSpeed);
$('#randSlider').on('change', updateRandDec);
canvas.addEventListener('click', canvasClick);