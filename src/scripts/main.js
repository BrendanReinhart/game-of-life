var tileIDs = [];
// var tileNumVals = {};

jQuery(document).ready(function() {

    loadGame();
});

$('.go-button-wrapper').on('click', '.start-game', startGame);