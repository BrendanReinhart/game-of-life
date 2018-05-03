
function loadGame() {
    //TODO: use some neat transitions to show rules then launch game board:
    // transition show rules (one by one);
    // transition rules div width to be what they are normally.
        // meanwhile transition board to slide open from center:
            // transition width
            // transition border opacity
            // transition tiles opacity
    // transition go button

    // $('.game-board').on('click', '.tile', clickTile);
    // $('.game-board').on('click', '.tile', clickCell);
    // generateTiles();
    generateCells();
    drawCanvas();
    $('.go-button-wrapper').html('<button class="go-button">START GAME</button>');
}

function generateTiles() { // DEPRECATED
    // allIDs = [];
    let gameElement = $('.game-board');
    for(i=0; i<options.sizeX; i++) {
        let column = $('<div class="col-wrapper"></div>');
        for(j=0; j<options.sizeY; j++) {
            var coord = 1000*i+j;
            let row = $('<div class="tile selectable" data-coords="'+coord+'"></div>');
            row.appendTo(column);
            // allIDs.push(coord);
            // deadIDs.push(coord);
        }
        column.appendTo(gameElement);
    }
};

function clickTile() { // DEPRECATED
    $(this).toggleClass('alive-tile');
    if($(this).hasClass('alive-tile')) {
        console.log('this tile is now ALIVE');
        aliveIDs.push($(this).data('coords'));
        deadIDs = deadIDs.filter(item => item !== $(this).data('coords'))
    } else {
        console.log('this tile is now DEAD');
        aliveIDs = aliveIDs.filter(item => item !== $(this).data('coords'))
        deadIDs.push($(this).data('coords'));
    };
    console.log('alive IDs set: ', aliveIDs);
    console.log('dead IDs set: ', deadIDs);
}

function startGame() {
    // thrunGame = true;
    // $('.go-button-wrapper').html('');
    // $('.go-button-wrapper').html('<button class="stop-button">STOP</button>')
    // gameLoop();

    if (runGame === undefined) {
        runGame = setInterval(nextGenCellMatrix, 100);
        $('.go-button').text("Stop");
      } else {
        clearInterval(runGame);
        runGame = undefined;
        $('.go-button').text("Stop");
      }
}

/*
function nextGen() {
    let timeA = new Date();
    console.log('in Next Gen!');
    // have the IDs of all ALIVE tiles
    // have the IDs of DEAD tiles

    // for each ALIVE ID, generate NEW ALIVE IDs (1) based on conditions 1, 2, 3
    let newAliveIds1 =[];
    for(let i = 0; i < aliveIDs.length; i++) {
        let timeAliveA = new Date();
        console.log(aliveIDs);
        var neighbours = [aliveIDs[i]-1, aliveIDs[i]+99, aliveIDs[i]+100, aliveIDs[i]+101, aliveIDs[i]+1, aliveIDs[i]-99, aliveIDs[i]-100, aliveIDs[i]-101];
        aliveNeighbourCount = 0;
        for(let j = 0; j < neighbours.length; j++) {
            if (aliveIDs.includes(neighbours[j])) { aliveNeighbourCount++ };
            // deadNeighbourTileTest = $('*[data-coords="'+ID+'"]');
        }
        // console.log('Alive tile: ', alive, ' has ', aliveNeighbourCount, ' alive neighbours.');

        // Condition 1: Underpopulation     --->    do not add to next generation's aliveIDs
        // Condition 3: Overpopulation      --->    do not add to next generation's aliveIDs
        // Condition 2: Survival            --->    add to next generation's aliveIDs:
        if (aliveNeighbourCount === 2 || aliveNeighbourCount === 3) {
            newAliveIds1.push(aliveIDs[i]);
        }
        let timeAliveB = new Date();
        console.log('time for a single ALIVE calculation: ', timeAliveB-timeAliveA, ' ms');
    }
    let timeB = new Date();
    console.log('next gen ALIVE calculations time: ', timeB-timeA, ' ms');

    // for each DEAD ID, generate NEW ALIVE IDs (2) based on condition 4.
    let newAliveIds2 = [];
    for(dead of deadIDs) {
        let timeDeadA = new Date();
        // Condition 4: Reproduction
        var neighbours = [dead-1, dead+99, dead+100, dead+101, dead+1, dead-99, dead-100, dead-101];
        aliveNeighbourCount = 0;
        for(let ID of neighbours) {
            if (aliveIDs.includes(ID)) { aliveNeighbourCount++ };
            // deadNeighbourTileTest = $('*[data-coords="'+ID+'"]');
        }
        // console.log('Dead tile: ', dead, ' has ', aliveNeighbourCount, ' alive neighbours.');
        if(aliveNeighbourCount === 3) {
            console.log('DEAD TILE: ', dead, ' WILL COME TO LIVE MWAHAHAHHA');
        }
        let timeDeadB = new Date();
        console.log('time for a single DEAD calculation: ', timeDeadB-timeDeadA, ' ms');
    }
    var timeC = new Date();
    console.log('next gen DEAD calculations time: ', timeC-timeB, ' ms');




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


    // ~~~~~~~~~~~~~~~~~~~~~~ CONDITIONS ~~~~~~~~~~~~~~~~~~~~~~
    // 1. Any live cell with fewer than two live neighbours DIES, as if caused by underpopulation.
    // 2. Any live cell with two or three live neighbours LIVES on to the next generation.
    // 3. Any live cell with more than three live neighbours DIES, as if by overpopulation.
    // 4. Any dead cell with exactly three live neighbours BECOMES ALIVE, as if by reproduction.
    

}*/



// NEW method for storing cells. Let's see if it works.

function generateCells() {
    // cellMatrix = [];
    for (x=0; x<options.sizeX; x++) {
        cellMatrix[x] = [];
        for(y=0;y<options.sizeY;y++) {
            cellMatrix[x][y] = 0;
        }
    }
}

function clickCell() {
    $(this).toggleClass('alive-tile');
    let x = Math.floor($(this).data('coords')/1000);
    let y = $(this).data('coords')%1000;
    cellMatrix[x][y] = 1 - cellMatrix[x][y];
}

function getNeighbourCount(xID, yID) {
    // var neighbours = [ID-1, ID+99, ID+100, ID+101, ID+1, ID-99, ID-100, ID-101];
    let aliveNeighbourCount = 0;
    if(xID>0) {
        if (cellMatrix[xID-1][yID-1]) { aliveNeighbourCount++ };    // Above Left
        if (cellMatrix[xID-1][yID]) { aliveNeighbourCount++ };      // Left
        if (cellMatrix[xID-1][yID+1]) { aliveNeighbourCount++ };    // Below Left
    }

    if (cellMatrix[xID][yID-1]) { aliveNeighbourCount++ };      // Above
    if (cellMatrix[xID][yID+1]) { aliveNeighbourCount++ };      // Below

    if(xID<options.sizeX-1) {
        if (cellMatrix[xID+1][yID-1]) { aliveNeighbourCount++ };    // Above Right
        if (cellMatrix[xID+1][yID]) { aliveNeighbourCount++ };      // Right
        if (cellMatrix[xID+1][yID+1]) { aliveNeighbourCount++ };    // Below Right
    }
    return aliveNeighbourCount;
}

function nextGenCellMatrix() {
    let timeA = new Date();

    let tempMatrix = [];
    for (x=0; x<options.sizeX; x++) {
        tempMatrix[x] = [];
        for(y=0;y<options.sizeY;y++) {
            let cellNeighbours = getNeighbourCount(x,y);
            let coord = x*1000+y;
            // let tile = $('*[data-coords="'+coord+'"]')

            if(cellMatrix[x][y] === 0) {
                if(cellNeighbours === 3) {                          // Reproduction (Condition 4)
                    tempMatrix[x][y] = 1;
                    // tile.addClass('alive-tile');
                } else {
                    tempMatrix[x][y] = 0;
                    // tile.removeClass('alive-tile');
                }
            } else {
                if(cellNeighbours === 2 || cellNeighbours === 3) {  // Sustainment (Condition 2)
                    tempMatrix[x][y] = 1;
                    // tile.addClass('alive-tile');
                } else {
                    tempMatrix[x][y] = 0;                           // Over/Underpopulation (Condition 1,3)
                    // tile.removeClass('alive-tile');
                }
            }
            // tile.addClass('alive-tile');
        }
    }

    cellMatrix = tempMatrix;
    var timeC = new Date();
    console.log('next gen all calculations time: ', timeC-timeA, ' ms');
    // console.log('next gen Cell Matrix: ', cellMatrix);
    drawCanvas();
}

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(x=0; x<options.sizeX; x++) {
        for(y=0; y<options.sizeY; y++) {
            if(cellMatrix[x][y] === 1) {
                ctx.beginPath();
                ctx.rect(10*x, 10*y, 10, 10);
                ctx.fillStyle = "#000000";
                ctx.fill();
                ctx.closePath();
            } else {
                ctx.beginPath();
                ctx.rect(10*x, 10*y, 10, 10);
                ctx.strokeStyle = "#898989";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function canvasClick(e) {
    var element = canvas;
    var offsetX = 0, offsetY = 0

    if (element.offsetParent) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }

    x = Math.floor((e.pageX - offsetX)/10);
    y = Math.floor((e.pageY - offsetY)/10);
    cellMatrix[x][y] = 1-cellMatrix[x][y];
    drawCanvas();
}