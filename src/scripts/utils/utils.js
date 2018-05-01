var options = {
    sizeX: 80,
    sizeY: 60
}

function loadGame() {
    $('.game-board').on('click', '.tile', clickTile);
    generateTiles();
    $('.go-button-wrapper').html('<button class="start-game">START GAME</button>');
}

function generateTiles() {
    tileIDs = [];
    let gameElement = $('.game-board');
    for(i=0; i<options.sizeX; i++) {
        let column = $('<div class="col-wrapper"></div>');
        for(j=0; j<options.sizeY; j++) {
            var coord = 100*i+j;
            let row = $('<div class="tile selectable" data-coords="'+coord+'"></div>');
            row.appendTo(column);
            tileIDs.push(coord);
        }
        column.appendTo(gameElement);
    }
};

function clickTile() {
    $(this).toggleClass('selected-tile');
}

function startGame() {
    $('.game-board').off('click', '.tile', clickTile);
    $('.tile').toggleClass('selectable');
    console.log('starting game!');
}