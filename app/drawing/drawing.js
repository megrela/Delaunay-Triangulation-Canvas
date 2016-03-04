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

Drawing.prototype.drawGraphVertices = function (graph) {
    for (var i=0; i<graph.vertices.length; i++) {
        this.dot(graph.vertices[i]);
    }
};