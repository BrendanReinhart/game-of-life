var tileIDs = [];
// var tileNumVals = {};

jQuery(document).ready(function() {
    loadGame();
});

$('.game-board').on('click', '.tile', clickTile);