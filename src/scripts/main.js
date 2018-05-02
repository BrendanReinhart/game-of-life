var tileIDs = [];
var allIDs = new Set([]);
var aliveIDs = new Set([]);
var deadIDs = new Set([]);

jQuery(document).ready(function() {
    loadGame();
});

$('.go-button-wrapper').on('click', '.go-button', startGame);