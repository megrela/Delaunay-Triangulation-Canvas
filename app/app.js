/**
 * Created by gime on 3/4/2016.
 */

var app = {
    config: {},
    init: function() {
        var me = this;
        me.drawing = new Drawing($('canvas')[0]);
        initConfig();

        function initConfig() {
            var scale = 20;
            me.config = {
                VERTEX_COUNT: 200,
                SCALE: scale,
                MAX_X: me.drawing.dom.width / scale,
                MAX_Y: me.drawing.dom.height / scale
            }
        }
    },

    start: function () {
        var me = this;
        me.graph = new Graph(me.config.VERTEX_COUNT);
        me.graph.randomizeVertices();
        me.drawing.drawGraphVertices(me.graph);
    }
};