/**
 * Created by gime on 3/4/2016.
 */


function DelaunayTriangulation(vertices) {
    var me = this;
    me.vertices = vertices;
    me.triangles = [];
    me.count = me.vertices.length;
    me.ids = [];
    initConnections();

    function initConnections() {
        me.connections = [];
        for (var i=0; i<me.count + 3; i++) {
            me.connections.push([]);
            for (var j=0; j<me.count + 3; j++)
                me.connections.push(false);
            if (i < me.count)
                me.vertices[i].id = i;
        }
    }

}


/**
 * create super trianle which covers all the verticies;
 */
DelaunayTriangulation.prototype.superTriangle = function () {
    var minx = this.vertices[0].x;
    var maxx = this.vertices[0].x;
    var miny = this.vertices[0].y;
    var maxy = this.vertices[0].y;
    for (var i=1; i<this.vertices.length; i++) {
        if (this.vertices[i].x < minx) minx = this.vertices[i].x;
        if (this.vertices[i].x > maxx) maxx = this.vertices[i].x;
        if (this.vertices[i].y < miny) miny = this.vertices[i].y;
        if (this.vertices[i].y > maxy) maxy = this.vertices[i].y;
    }

    /**
     * make it fit
     */
    minx --;
    maxx ++;
    miny --;
    maxy ++;

    /**
     *  make it square: dx = dy
     */
    var dx = maxx - minx;
    var dy = maxy - miny;
    if (dx > dy) {
        dy = dx;
    } else {
        dx = dy;
    }
    maxx = minx + dx;
    maxy = miny + dy;

    /**
     * calculate circle containing the square
     * r = diagonal / 2;
     * diagonal = sqrt(2) * a;
     */
    var cx = (maxx - minx) / 2;
    var cy = (maxy - miny) / 2;
    var r = ( Math.sqrt(2) * dx ) / 2;
    var circle = new Circle(new Point(cx, cy),r);

    return Triangle.getNormalTriangleByInnerCircle(circle);
};

/**
 * adds a connections by triangle
 * @param triangle
 * @returns {*}
 */
DelaunayTriangulation.prototype.connectTriangle = function (triangle) {
    var me = this;

    if (triangle.a.id == -1) {
        triangle.a.id = me.vertices.length;
        me.vertices.push(triangle.c);
    }

    if (triangle.b.id == -1) {
        triangle.b.id = me.vertices.length;
        me.vertices.push(triangle.c);
    }

    if (triangle.c.id == -1) {
        triangle.c.id = me.vertices.length;
        me.vertices.push(triangle.c);
    }

    connect(triangle.a.id, triangle.b.id);
    connect(triangle.a.id, triangle.c.id);
    connect(triangle.b.id, triangle.c.id);

    return triangle;

    function connect(i, j) {
        me.connections[i][j] = me.connections[j][i] = true;
    }
};

/**
 * removes connection by triangle's index
 * @param index
 */
DelaunayTriangulation.prototype.removeConnection = function (index) {
    var me = this;
    var tri = me.triangles[index];

    disconnect(tri.a.id, tri.b.id);
    disconnect(tri.a.id, tri.c.id);
    disconnect(tri.b.id, tri.c.id);

    function disconnect(i, j) {
        me.connections[i][j] = me.connections[j][i] = false;
    }
};


/**
 * triangulate set
 */
DelaunayTriangulation.prototype.triangulate = function () {
    /**
     * create first super triangle which will cover all points
     * add it to existed triangles
     */
    this.triangles.push(this.connectTriangle(this.superTriangle()));

    for ( var i=0; i<this.count; i++ ) {
        var bad = [], v = this.vertices[i];

        for ( var j = 0; j < this.triangles.length; j++ )
            if ( this.triangles[j].circumscribingCircle().containsPoint(v) )
                bad.push(j);

        var newTri = [];
        for ( var j = 0, k = 0; j<this.triangles.length && k < bad.length; j++) {
            var tri = this.triangles[j];
            if (bad[k] == j) {
                k++;
                newTri.push( this.connectTriangle( new Triangle(tri.a, tri.b, v) ) );
                newTri.push( this.connectTriangle( new Triangle(tri.a, tri.c, v) ) );
                newTri.push( this.connectTriangle( new Triangle(tri.b, tri.c, v) ) );
                this.removeConnection(j);
            } else {
                newTri.push(tri);
            }
        }
        this.triangles = [];
        this.triangles = newTri;
    }
    return this.extractEdges();
};

DelaunayTriangulation.prototype.extractEdges = function () {
    var edges = [];
    for (var i=0; i<this.count; i++)
        for (var j=i+1; j<this.count; j++)
            if (this.connections[i][j]) {
                edges.push({a: this.vertices[i], b: this.vertices[j]});
            }
    return edges;
};

