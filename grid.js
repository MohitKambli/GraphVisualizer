class Grid {
    constructor(cols, rows, cellSize) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.cells = [];
        this.sourceSet = false;
        this.destinationSet = false;

        for (let i = 0; i < this.cols; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.cells[i][j] = new Cell(i * this.cellSize, j * this.cellSize, this.cellSize, i, j);
            }
        }
    }

    show() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.cells[i][j].show();
            }
        }
    }

    clearPaths() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.cells[i][j].isPath = false;
            }
        }
    }

    handleClick(mx, my) {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.cells[i][j].clicked(mx, my)) {
                    if (!this.sourceSet) {
                        this.cells[i][j].setSource();
                        this.sourceSet = true;
                    } else if (!this.destinationSet) {
                        this.cells[i][j].setDestination();
                        this.destinationSet = true;
                    }
                }
            }
        }
    }

    getNeighbors(cell) {
        let neighbors = [];
        let {i, j} = cell;

        if (i > 0) neighbors.push(this.cells[i - 1][j]); // Left
        if (i < this.cols - 1) neighbors.push(this.cells[i + 1][j]); // Right
        if (j > 0) neighbors.push(this.cells[i][j - 1]); // Up
        if (j < this.rows - 1) neighbors.push(this.cells[i][j + 1]); // Down

        return neighbors;
    }
}
