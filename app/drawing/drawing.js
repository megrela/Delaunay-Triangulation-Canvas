/**
 * Created by gime on 3/4/2016.
 */

function Drawing(dom) {
    this.dom = dom;

    this.config = {
        POINT_SIZE: 4
    }
}

Drawing.prototype.dot = function (point) {
    var p = point.scale();
    var ctx = this.dom.getContext("2d");
    ctx.fillRect(
        p.x - this.config.POINT_SIZE / 2,
        p.y - this.config.POINT_SIZE / 2,
        this.config.POINT_SIZE,
        this.config.POINT_SIZE
    )
};

Drawing.prototype.line = function (a, b) {
    var p1 = a.scale();
    var p2 = b.scale();
    var ctx = this.dom.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
};

Drawing.prototype.drawGraphVertices = function (graph) {
    for (var i=0; i<graph.vertices.length; i++) {
        this.dot(graph.vertices[i]);
    }
};

Drawing.prototype.drawGraphEdges = function (graph) {
    for (var i=0; i<graph.edges.length; i++) {
        this.line(graph.edges[i].a, graph.edges[i].b);
    }
};

Drawing.prototype.reset = function () {
    var ctx = this.dom.getContext("2d");
    ctx.clearRect(0, 0, this.dom.width, this.dom.height);
};