/**
 * Created by gime on 3/4/2016.
 */


function DelaunayTriangulation(vertices) {
    this.verticies = vertices;
}


/**
 * create super trianle which covers all the verticies;
 */
DelaunayTriangulation.prototype.createSuperTriangle = function () {
    var minx = this.verticies[0].x;
    var maxx = this.verticies[0].x;
    var miny = this.verticies[0].y;
    var maxy = this.verticies[0].y;
    for (var i=1; i<this.verticies.length; i++) {
        if (this.verticies[i].x < minx) minx = this.verticies[i].x;
        if (this.verticies[i].x > maxx) maxx = this.verticies[i].x;
        if (this.verticies[i].y < miny) miny = this.verticies[i].y;
        if (this.verticies[i].y > maxy) maxy = this.verticies[i].y;
    }

    /* make it fit */
    minx --;
    maxx ++;
    miny --;
    maxy ++;

    /* make it square: dx = dy */
    dx = Math.abs(maxx - minx);
    dy = Math.abs(maxy - miny);
    if (dx > dy) {
        dy = dx;
    } else {
        dx = dy;
    }
    maxx = minx + dx;
    maxy = miny + dy;

    /* calculate circle containing the square */
    var cx = (maxx - minx) / 2;
    var cy = (maxy - miny) / 2;
    var r = dx / 2;

    var circle = new Circle(
        new Point(cx, cy),
        r
    );
    
};

DelaunayTriangulation.prototype.triangulate = function () {

};

