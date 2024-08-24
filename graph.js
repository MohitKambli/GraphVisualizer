class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    addEdge(node1, node2) {
        this.edges.push([node1, node2]);
    }

    show() {
        for (let edge of this.edges) {
            stroke(0);
            line(edge[0].x, edge[0].y, edge[1].x, edge[1].y);
        }

        for (let node of this.nodes) {
            node.show();
        }
    }
}
