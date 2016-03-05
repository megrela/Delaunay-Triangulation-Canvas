/**
 * Created by gime on 3/4/2016.
 */

function Graph(vertexCount) {
    var me = this;
    me.vertices = [];
    me.edges = [];
    me.vertexCount = vertexCount;
    me.table = [];
    me.randomHits = 0;
    initTable();
    function initTable() {
        for (var i=0; i<=app.config.MAX_X; i++) {
            me.table.push([]);
            for (var j=0; j<=app.config.MAX_Y; j++) {
                me.table[i].push(0);
            }
        }
    }
}

Graph.prototype.vertexExists = function (p) {
    return this.table[p.x][p.y] !== 0;
};

Graph.prototype.addVertex = function (p) {
    this.vertices.push(p);
    p.id = this.vertices.length;
    this.table[p.x][p.y] = p.id;
};

Graph.prototype.randomizeVertices = function () {
    var cnt = this.vertexCount;
    while (cnt) {
        var p = Point.randomPoint();
        if (!this.vertexExists(p)) {
            this.addVertex(p);
            cnt--
        }
        this.randomHits++;
    }
    app.appendLog(""+this.vertexCount + " random points generated in " + this.randomHits + " tries", "info");
};

Graph.prototype.triangulate = function (algorithm) {
    this.edges = (new algorithm(this.vertices)).triangulate();
    app.appendLog(""+this.edges.length + " edges created after triangulation", "info");
};

