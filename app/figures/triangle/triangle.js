/**
 * Created by gime on 3/4/2016.
 */

function Triangle(A,B,C) {
    this.A = A;
    this.B = B;
    this.C = C;
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


