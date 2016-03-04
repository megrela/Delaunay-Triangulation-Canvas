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
        for (var i=0; i<app.config.MAX_X; i++) {
            me.table.push([]);
            for (var j=0; j<app.config.MAX_Y; j++) {
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
    this.table[p.x][p.y] = this.vertices.length;
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
    console.log(""+this.vertexCount + "random points generated in " + this.randomHits + " tries");
};


