
function loadGame() {
    //TODO: use some neat transitions to show rules then launch game board:
    // transition show rules (one by one);
    // transition rules div width to be what they are normally.
        // meanwhile transition board to slide open from center:
            // transition width
            // transition border opacity
            // transition tiles opacity
    // transition go button

    generateCells(0.25);
    drawCanvas();
    $('.go-button-wrapper').html('<button class="go-button">Start</button>');
}

function startGame() {
    if (runGame === undefined) {
        runGame = setInterval(nextGenCellMatrix, speed);
        $('.go-button').text("Stop");
      } else {
        clearInterval(runGame);
        runGame = undefined;
        $('.go-button').text("Start");
      }
}

function clearCells() {
    generateCells(0);
    drawCanvas();
}

function randomizeCells() {
    console.log(randDec);
    generateCells(randDec);
    drawCanvas();
}

function updateRandDec() {
    randDec = Number($(this).val());
    $('.randDecStatement').html(Math.floor(randDec*100)+'% initial population.');
}

function updateSpeed() {
    speed = Number($(this).val());
    $('.speed-title').html('Step Speed: '+speed/1000+'s');
    // clearInterval(runGame);
    // runGame = undefined;
    startGame();
    startGame();
}

function generateCells(randDec) {
    console.log(randDec)
    console.log(Math.floor(Math.random()+randDec));
    for (x=0; x<options.sizeX; x++) {
        cellMatrix[x] = [];
        for(y=0;y<options.sizeY;y++) {
            // Initialise the board with randDec (decimal between 0 and 1) randomized:
            cellMatrix[x][y] = Math.floor(Math.random()+randDec);
        }
    }
    console.log(cellMatrix);
}

function clickCell() {
    let x = Math.floor($(this).data('coords')/1000);
    let y = $(this).data('coords')%1000;
    cellMatrix[x][y] = 1 - cellMatrix[x][y];
}

function getNeighbourCount(xID, yID) { // needs refactoring, can be simpler if using modulo to wrap edges --> eg top left neighbour: if (cellMatrix[options.sizeX%(xID-1)][options.sizeY%(yID-1)]) { aliveNeighbourCount++ }
    let aliveNeighbourCount = 0;

    // get TOP neighbour:
    if(yID>0) {
        if (cellMatrix[xID][yID-1]) { aliveNeighbourCount++ };              // Above
    } else {
        if (cellMatrix[xID][options.sizeY-1]) { aliveNeighbourCount++ };    // Wrap Above
    }

    // get TOP RIGHT neighbour:
    if (yID>0 && xID<options.sizeX-1) {
        if (cellMatrix[xID+1][yID-1]) { aliveNeighbourCount++ };
    } else if (yID>0 && xID==options.sizeX-1) { // right col but not top row
        if (cellMatrix[0][yID-1]) { aliveNeighbourCount++ };
    } else if (yID==0 && xID<options.sizeX-1) { // top row but not right col
        if (cellMatrix[xID+1][options.sizeY-1]) { aliveNeighbourCount++ };
    } else {                                    // top right corner:
        if (cellMatrix[0][options.sizeY-1]) { aliveNeighbourCount++ };
    }

    // get RIGHT neighbour:
    if(xID<options.sizeX-1) {
        if (cellMatrix[xID+1][yID]) { aliveNeighbourCount++ };  // Right
    } else {
        if (cellMatrix[0][yID]) { aliveNeighbourCount++ };      // Wrap Right
    }

    // get BOTTOM RIGHT neighbour:
    if (yID<options.sizeY-1 && xID<options.sizeX-1) {
        if (cellMatrix[xID+1][yID+1]) { aliveNeighbourCount++ };
    } else if (yID<options.sizeY-1 && xID==options.sizeX-1) {   // right col but not bottom row
        if (cellMatrix[0][yID+1]) { aliveNeighbourCount++ };
    } else if (yID==options.sizeY-1 && xID<options.sizeX-1) {   // bottom row but not right col
        if (cellMatrix[xID+1][0]) { aliveNeighbourCount++ };
    } else {                                                    // bottom right corner:
        if (cellMatrix[0][0]) { aliveNeighbourCount++ };
    }

    // get BOTTOM neighbour:
    if(yID<options.sizeY-1) {
        if (cellMatrix[xID][yID+1]) { aliveNeighbourCount++ };  // Below
    } else {
        if (cellMatrix[xID][0]) { aliveNeighbourCount++ };      // Wrap Below
    }

    // get BOTTOM LEFT neighbour:
    if (yID<options.sizeY-1 && xID>0) {
        if (cellMatrix[xID-1][yID+1]) { aliveNeighbourCount++ };
    } else if (yID<options.sizeY-1 && xID==0) {     // left col but not bottom row
        if (cellMatrix[options.sizeX-1][yID+1]) { aliveNeighbourCount++ };
    } else if (yID==options.sizeY-1 && xID>0) {     // bottom row but not left col
        if (cellMatrix[xID-1][0]) { aliveNeighbourCount++ };
    } else {                                        // bottom left corner:
        if (cellMatrix[options.sizeX-1][0]) { aliveNeighbourCount++ };
    }

    // get LEFT neighour:
    if(xID>0) {
        if (cellMatrix[xID-1][yID]) { aliveNeighbourCount++ };              // Left
    } else {
        if (cellMatrix[options.sizeX-1][yID]) { aliveNeighbourCount++ };    // Wrap Left
    }

    // get TOP LEFT neighbour:
    if (yID>0 && xID>0) {
        if (cellMatrix[xID-1][yID-1]) { aliveNeighbourCount++ };
    } else if (yID>0 && xID==0) {   // left col but not top row
        if (cellMatrix[options.sizeX-1][yID-1]) { aliveNeighbourCount++ };
    } else if (yID==0 && xID>0) {   // top row but not left col
        if (cellMatrix[xID-1][options.sizeY-1]) { aliveNeighbourCount++ };
    } else {                        // top left corner:
        if (cellMatrix[options.sizeX-1][options.sizeY-1]) { aliveNeighbourCount++ };
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

            if(cellMatrix[x][y] === 0) {
                if(cellNeighbours === 3) {                          // Reproduction (Condition 4)
                    tempMatrix[x][y] = 1;
                } else {
                    tempMatrix[x][y] = 0;
                }
            } else {
                if(cellNeighbours === 2 || cellNeighbours === 3) {  // Sustainment (Condition 2)
                    tempMatrix[x][y] = 1;
                } else {
                    tempMatrix[x][y] = 0;                           // Over/Underpopulation (Condition 1,3)
                }
            }
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

/*
    // ~~~~~~~~~~~~~~~~~~~~~~ CONDITIONS ~~~~~~~~~~~~~~~~~~~~~~
    // 1. Any live cell with fewer than two live neighbours DIES, as if caused by underpopulation.
    // 2. Any live cell with two or three live neighbours LIVES on to the next generation.
    // 3. Any live cell with more than three live neighbours DIES, as if by overpopulation.
    // 4. Any dead cell with exactly three live neighbours BECOMES ALIVE, as if by reproduction.
}*/