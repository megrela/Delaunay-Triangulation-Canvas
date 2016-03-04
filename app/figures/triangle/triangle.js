/**
 * Created by gime on 3/4/2016.
 */

function Triangle(a,b,c) {
    this.a = a;
    this.b = b;
    this.c = c;
}

Triangle.getNormalTriangleByInnerCircle = function (circle) {
    var lowerPoint = circle.lowerPoint();

    /**
     * inner circle radius of normal triangle = sqrt(3) * a / 6
     * r = sqrt(3) * a / 6
     * 6r = a * sqrt(3)
     * a = 6r / sqrt(3);
     * h = sqrt(3) / 2 * a;
     */
    var a = 6 * circle.radius / Math.sqrt(3);
    var h = Math.sqrt(3) / 2 * a;


    /**
     * now lets draw normal triangle with side a
     * vertex A = {x: lowerPoint.x - a / 2,  y: lowerPoint.y }
     * vertex B = {x: lowerPoint.x + a / 2,  y: lowerPoint.y }
     * vertex C = {x: lowerPoint.x,  y: lowerPoint.y + h }
     */
    var A = new Point(
        lowerPoint.x - a / 2,
        lowerPoint.y
    );

    var B = new Point(
        lowerPoint.x + a / 2,
        lowerPoint.y
    );

    var C = new Point(
        lowerPoint.x,
        lowerPoint.y + h
    );

    return new Triangle(A, B, C);
};


/**
 * calculates circumscribin circle of triangle
 * @returns {Circle}
 */
Triangle.prototype.circumscribingCircle = function () {
    var a = this.a,
        b = this.b,
        c = this.c;

    var A = b.x - a.x,
        B = b.y - a.y,
        C = c.x - a.x,
        D = c.y - a.y,
        E = A * (a.x + b.x) + B * (a.y + b.y),
        F = C * (a.x + c.x) + D * (a.y + c.y),
        G = 2 * (A * (c.y - b.y) - B * (c.x - b.x)),
        minx,
        miny,
        x,
        y,
        dx,
        dy,
        r;

    if(Math.abs(G) < 0.000001) {
        minx = Math.min(a.x, b.x, c.x);
        miny = Math.min(a.y, b.y, c.y);
        dx   = (Math.max(a.x, b.x, c.x) - minx) * 0.5;
        dy   = (Math.max(a.y, b.y, c.y) - miny) * 0.5;
        x = minx + dx;
        y = miny + dy;
    } else {
        x = (D*E - B*F) / G;
        y = (A*F - C*E) / G;
        dx = x - a.x;
        dy = y - a.y;
    }

    r = Math.sqrt( sqr(dx) + sqr(dy));
    return new Circle(new Point(x, y), r);
};


