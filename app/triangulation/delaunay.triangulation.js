/**
 * Created by gime on 3/4/2016.
 */


function DelaunayTriangulation(vertices) {
    this.verticies = vertices;
    this.triangles = [];
}


/**
 * create super trianle which covers all the verticies;
 */
DelaunayTriangulation.prototype.superTriangle = function () {
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
     * */
    var cx = (maxx - minx) / 2;
    var cy = (maxy - miny) / 2;
    var r = dx / 2;

    var circle = new Circle(new Point(cx, cy),r);

    /**
     * lower point of circle: lower_point = { x: c.x,  y: c.y - r};
     */
    var lowerPoint = new Point(circle.center.x, circle.center.y - circle.radius);

    /**
     * inner circle radius of normal triangle = sqrt(3) * a / 6
     * r = sqrt(3) * a / 6
     * 6r = a * sqrt(3)
     * a = 6r / sqrt(3);
     * h = sqrt(3) / 2 * a;
     */
    var normalTriangleSide = 6 * circle.radius / Math.sqrt(3);
    var height = Math.sqrt(3) / 2 * normalTriangleSide;

    /**
     * now lets draw normal triangle with side a
     * vertex A = {x: lowerPoint.x - a / 2,  y: lowerPoint.y }
     * vertex B = {x: lowerPoint.x + a / 2,  y: lowerPoint.y }
     * vertex C = {x: lowerPoint.x,  y: lowerPoint.y + h }
     */
    var A = new Point(
        lowerPoint.x - normalTriangleSide / 2,
        lowerPoint.y
    );

    var B = new Point(
        lowerPoint.x + normalTriangleSide / 2,
        lowerPoint.y
    );

    var C = new Point(
        lowerPoint.x,
        lowerPoint.y + height
    );

    return new Triangle(A, B, C);
};


/**
 * triangulate set
 */
DelaunayTriangulation.prototype.triangulate = function () {
    /**
     * create first super triangle which will cover all points
     */
    this.triangles.push( this.superTriangle() );
};

