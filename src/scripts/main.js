var tileIDs = [];
// var tileNumVals = {};

jQuery(document).ready(function() {
    //TODO: use some neat transitions to show rules then launch game board:
        // transition show rules (one by one);
        // transition rules div width to be what they are normally.
            // meanwhile transition board to slide open from center:
                // transition width
                // transition border opacity
                // transition tiles opacity
        // transition go button

    loadGame();
});

$('.go-button-wrapper').on('click', '.go-button', startGame);