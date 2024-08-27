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

function dijkstra(grid, startCell) {
    let pq = new PriorityQueue(); // You can use the existing PriorityQueue class.
    let distances = new Map();
    let visited = new Set();

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
                return;
            }

            // Process neighbors
            for (let neighbor of grid.getNeighbors(currentCell)) {
                if (!visited.has(neighbor)) {
                    let tentativeDistance = distances.get(currentCell) + 1; // +1 since all edges have weight 1

                    if (tentativeDistance < distances.get(neighbor)) {
                        distances.set(neighbor, tentativeDistance);
                        pq.enqueue(neighbor, tentativeDistance);
                    }
                }
            }
            visited.add(currentCell);
        }
    }
    return step;
}

function aStar(grid, startCell) {
    let openSet = new PriorityQueue(); // Priority Queue to manage the open set
    let cameFrom = new Map();
    let visited = new Set();

    // Initialize the start cell
    startCell.g = 0;
    startCell.h = heuristic(startCell, grid.destinationCell); // You need to define the heuristic function
    startCell.f = startCell.g + startCell.h;
    openSet.enqueue(startCell, startCell.f);

    function heuristic(cell, goal) {
        // Manhattan Distance heuristic for a grid-based pathfinding
        return Math.abs(cell.i - goal.i) + Math.abs(cell.j - goal.j);
    }

    function step() {
        if (!openSet.isEmpty()) {
            let currentCell = openSet.dequeue();
            currentCell.visited = true;

            if (currentCell.isDestination) {
                noLoop(); // Stop the draw loop
                tracePath(cameFrom, currentCell); // Trace back the path
                return;
            }

            for (let neighbor of grid.getNeighbors(currentCell)) {
                let tentativeG = currentCell.g + 1; // Assuming uniform cost (e.g., 1 per move)

                if (tentativeG < neighbor.g) {
                    // This path to the neighbor is better than any previous one
                    cameFrom.set(neighbor, currentCell);
                    neighbor.g = tentativeG;
                    neighbor.h = heuristic(neighbor, grid.destinationCell);
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!visited.has(neighbor)) {
                        openSet.enqueue(neighbor, neighbor.f);
                        visited.add(neighbor);
                    }
                }
            }
        }
    }

    return step;
}

function tracePath(cameFrom, currentCell) {
    while (cameFrom.has(currentCell)) {
        currentCell.setPath();
        currentCell = cameFrom.get(currentCell);
    }
    currentCell.setPath(); // Mark the start cell as part of the path
}
