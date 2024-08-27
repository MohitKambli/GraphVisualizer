let grid;
let cols = 10;
let rows = 10;
let cellSize = 50;

let bfsStep;
let dfsStep;
let dijkstraStep;
let aStarStep;
let algorithmRunning = false;
let algorithmSelect;

function setup() {
    createCanvas(cols * cellSize, rows * cellSize);
    grid = new Grid(cols, rows, cellSize);

    // Create dropdown menu
    algorithmSelect = createSelect();
    algorithmSelect.option('Select Algorithm');
    algorithmSelect.option('BFS');
    algorithmSelect.option('DFS');
    algorithmSelect.option('Dijkstra');
    algorithmSelect.option('A*');

    // Create visualize button
    let visualizeButton = createButton('Visualize');
    visualizeButton.mousePressed(() => {
        if (!algorithmRunning) {
            grid.clearPaths(); // Clear any previous paths

            let selectedAlgorithm = algorithmSelect.value();
            let startCell = grid.cells.flat().find(cell => cell.isSource);

            if (selectedAlgorithm === 'BFS') {
                bfsStep = bfs(grid, startCell);
                algorithmRunning = true;
            } else if (selectedAlgorithm === 'DFS') {
                dfsStep = dfs(grid, startCell);
                algorithmRunning = true;
            } else if (selectedAlgorithm === 'Dijkstra') {
                dijkstraStep = dijkstra(grid, startCell);
                algorithmRunning = true;
            } else if (selectedAlgorithm === 'A*') {
                aStarStep = aStar(grid, startCell);
                algorithmRunning = true;
            }
        }
    });

    // Create reset button
    /*let resetButton = createButton('Reset');
    resetButton.mousePressed(() => {
        resetGrid();
    });*/
}

function draw() {
    background(255);
    grid.show();

    if (bfsStep) {
        bfsStep();
    }

    if (dfsStep) {
        dfsStep();
    }

    if(dijkstraStep) {
        dijkstraStep();
    }

    if(aStarStep) {
        aStarStep();
    }
}

function mousePressed() {
    grid.handleClick(mouseX, mouseY);
}

function resetGrid() {
    // Stop any ongoing algorithm or animation
    if (algorithmRunning) {
        noLoop(); // Stop the draw loop to halt the visualization
        bfsStep = null;
        dfsStep = null;
        algorithmRunning = false;
    }

    // Clear source and destination cells
    grid.cells.flat().forEach(cell => {
        cell.isSource = false;
        cell.isDestination = false;
        cell.visited = false;
    });

    // Reinitialize the grid display and allow for a new start
    loop(); // Restart the draw loop
}
