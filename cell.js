class Cell {
    constructor(x, y, size, i, j) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.i = i;
        this.j = j;
        this.isSource = false;
        this.isDestination = false;
        this.visited = false;
        this.isPath = false;
        this.g = Infinity; // Cost from start to this cell
        this.h = 0; // Heuristic: estimated cost to the goal
        this.f = Infinity; // Total cost (g + h)
    }

    show() {
        stroke(0);
        if (this.isSource) {
            fill(0, 255, 0); // Green for source
        } else if (this.isDestination) {
            fill(255, 0, 0); // Red for destination
        } else if (this.isPath) {
            fill(255, 215, 0); // Gold for the final path
        } else if (this.visited) {
            fill(173, 216, 230); // Light blue for visited cells
        } else {
            fill(255); // White for empty cells
        }
        rect(this.x, this.y, this.size, this.size);
    }

    setSource() {
        this.isSource = true;
        this.g = 0; // Start cell has zero cost
    }

    setDestination() {
        this.isDestination = true;
    }

    setPath() {
        this.isPath = true;
    }

    clicked(mx, my) {
        return mx > this.x && mx < this.x + this.size &&
               my > this.y && my < this.y + this.size;
    }
}
