/**
 * Created by gime on 3/4/2016.
 */

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.id = -1;
}

Point.randomPoint = function () {
    return new Point(
        random(0, app.config.MAX_X - 1),
        random(0, app.config.MAX_Y - 1)
    );
};

Point.prototype.scale = function () {
    return {
        x: this.x * app.config.SCALE,
        y: this.y * app.config.SCALE
    };
};