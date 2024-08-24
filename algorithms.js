function bfs(grid, startCell) {
    let queue = [];
    let visited = new Set();
    queue.push(startCell);
    visited.add(startCell);

    function step() {
        if (queue.length > 0) {
            let currentCell = queue.shift();
            currentCell.visited = true;

            if (currentCell.isDestination) {
                noLoop(); // Stop the draw loop when destination is found
                return;
            }

            for (let neighbor of grid.getNeighbors(currentCell)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }

    return step;
}

function dfs(grid, startCell) {
    let stack = [];
    let visited = new Set();
    stack.push(startCell);
    visited.add(startCell);

    function step() {
        if (stack.length > 0) {
            let currentCell = stack.pop();
            currentCell.visited = true;

            if (currentCell.isDestination) {
                noLoop(); // Stop the draw loop when destination is found
                return;
            }

            for (let neighbor of grid.getNeighbors(currentCell)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }
        }
    }

    return step;
}

