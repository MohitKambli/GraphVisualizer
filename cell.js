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
    }

    show() {
        stroke(0);
        if (this.isSource) {
            fill(0, 255, 0); // Green for source
        } else if (this.isDestination) {
            fill(255, 0, 0); // Red for destination
        } else if (this.visited) {
            fill(173, 216, 230); // Light blue for visited cells
        } else {
            fill(255); // White for empty cells
        }
        rect(this.x, this.y, this.size, this.size);
    }

    setSource() {
        this.isSource = true;
    }

    setDestination() {
        this.isDestination = true;
    }

    clicked(mx, my) {
        return mx > this.x && mx < this.x + this.size &&
               my > this.y && my < this.y + this.size;
    }
}