var options = {
    sizeX: 80,
    sizeY: 60
}

function loadGame() {
    //TODO: use some neat transitions to show rules then launch game board:
    // transition show rules (one by one);
    // transition rules div width to be what they are normally.
        // meanwhile transition board to slide open from center:
            // transition width
            // transition border opacity
            // transition tiles opacity
    // transition go button

    $('.game-board').on('click', '.tile', clickTile);
    generateTiles();
    $('.go-button-wrapper').html('<button class="go-button">START GAME</button>');
}

function generateTiles() {
    allIDs.clear();
    let gameElement = $('.game-board');
    for(i=0; i<options.sizeX; i++) {
        let column = $('<div class="col-wrapper"></div>');
        for(j=0; j<options.sizeY; j++) {
            var coord = 100*i+j;
            let row = $('<div class="tile selectable" data-coords="'+coord+'"></div>');
            row.appendTo(column);
            allIDs.add(coord);
            deadIDs.add(coord);
        }
        column.appendTo(gameElement);
    }
    console.log('tile generation complete. All IDs: ', allIDs);
};

function clickTile() {
    $(this).toggleClass('alive-tile');
    if($(this).hasClass('alive-tile')) {
        console.log('this tile is now ALIVE');
        aliveIDs.add($(this).data('coords'));
        deadIDs.delete($(this).data('coords'));
    } else {
        console.log('this tile is now DEAD');
        aliveIDs.delete($(this).data('coords'));
        deadIDs.add($(this).data('coords'));
    };
    console.log('alive IDs set: ', aliveIDs);
    console.log('dead IDs set: ', deadIDs);
}

function startGame() {
    $('.go-button-wrapper').html('');
    $('.game-board').off('click', '.tile', clickTile);
    $('.tile').toggleClass('selectable');
    console.log('starting game!');
}

function nextGen() {

    // have the IDs of all ALIVE tiles
    // have the IDs of DEAD tiles

    // for each ALIVE ID, generate NEW ALIVE IDs (1) based on condition 2 (EXACTLY 2 neighbours only, which also accounts for conditions 1, 3)
    // for each DEAD ID, generate NEW ALIVE IDs (2) based on condition 4.
    // merge NEW ALIVE IDs (1) and (2), and fill out NEW DEAD IDs using (allIDs - NEW alive IDs).

    // update classes with NEW ALIVE IDs
    // for(let alive in newAliveIds) {
    //      find div by id=alive, and addClass('alive-tile')
    // }

    // update classes with NEW DEAD IDs
    // for(let dead in newDeadIds) {
    //      find div by id=dead, and;       deadTile = $('.tile[id="'+dead+'"]');
    //      removeClass('alive-tile')       deadTile.removeClass('alive-tile');
    // }

    // A way to filter entries between two sets:
        //var validList = completedList.filter((item) => {
        //   return !invalidList.has(item);
        // })

    // old ALIVE IDs = new ALIVE IDs;
    // new ALIVE IDs = [];
    // old DEAD IDs = new DEAD IDs;
    // new DEAD IDs = [];


    /* ~~~~~~~~~~~~ CONDITIONS ~~~~~~~~~~~~
    1. Any live cell with fewer than two live neighbours DIES, as if caused by underpopulation.
    2. Any live cell with two or three live neighbours LIVES on to the next generation.
    3. Any live cell with more than three live neighbours DIES, as if by overpopulation.
    4. Any dead cell with exactly three live neighbours BECOMES ALIVE, as if by reproduction.
    */

}