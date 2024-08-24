class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
    }

    show() {
        fill(0);
        ellipse(this.x, this.y, this.size, this.size);
    }
}
