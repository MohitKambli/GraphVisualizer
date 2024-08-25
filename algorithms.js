function bfs(grid, startCell) {
    let queue = [];
    let visited = new Set();
    let cameFrom = new Map(); // To track the path

    queue.push(startCell);
    visited.add(startCell);

    function step() {
        if (queue.length > 0) {
            let currentCell = queue.shift();
            currentCell.visited = true;

            if (currentCell.isDestination) {
                noLoop(); // Stop the draw loop when destination is found

                // Trace the path back to the start
                let pathCell = currentCell;
                while (pathCell !== startCell) {
                    pathCell.isPath = true; // Directly set isPath
                    pathCell = cameFrom.get(pathCell);
                }
                startCell.isPath = true; // Mark the start cell as part of the path
                return;
            }

            for (let neighbor of grid.getNeighbors(currentCell)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                    cameFrom.set(neighbor, currentCell); // Track the cell from where we came
                }
            }
        }
    }

    return step;
}


function dfs(grid, startCell) {
    let stack = [];
    let visited = new Set();
    let cameFrom = new Map(); // To track the path

    stack.push(startCell);
    visited.add(startCell);

    function step() {
        if (stack.length > 0) {
            let currentCell = stack.pop();
            currentCell.visited = true;

            if (currentCell.isDestination) {
                noLoop(); // Stop the draw loop when destination is found

                // Backtrack to mark the path
                while (cameFrom.has(currentCell)) {
                    currentCell = cameFrom.get(currentCell);
                    currentCell.setPath();
                }

                return;
            }

            for (let neighbor of grid.getNeighbors(currentCell)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                    cameFrom.set(neighbor, currentCell); // Track where we came from
                }
            }
        }
    }

    return step;
}


function dijkstra(grid, startCell) {
    let pq = new PriorityQueue();
    let distances = new Map();
    let visited = new Set();
    let cameFrom = new Map(); // To track the path

    // Initialize distances
    for (let i = 0; i < grid.cols; i++) {
        for (let j = 0; j < grid.rows; j++) {
            distances.set(grid.cells[i][j], Infinity);
        }
    }
    distances.set(startCell, 0);

    // Add start cell to priority queue with distance 0
    pq.enqueue(startCell, 0);

    function step() {
        if (!pq.isEmpty()) {
            let currentCell = pq.dequeue();
            currentCell.visited = true;

            // If we reached the destination, stop
            if (currentCell.isDestination) {
                noLoop();

                // Backtrack to mark the path
                while (cameFrom.has(currentCell)) {
                    currentCell = cameFrom.get(currentCell);
                    currentCell.setPath();
                }

                return;
            }

            // Process neighbors
            for (let neighbor of grid.getNeighbors(currentCell)) {
                if (!visited.has(neighbor)) {
                    let tentativeDistance = distances.get(currentCell) + 1; // +1 since all edges have weight 1

                    if (tentativeDistance < distances.get(neighbor)) {
                        distances.set(neighbor, tentativeDistance);
                        pq.enqueue(neighbor, tentativeDistance);
                        cameFrom.set(neighbor, currentCell); // Track where we came from
                    }
                }
            }
            visited.add(currentCell);
        }
    }

    return step;
}

