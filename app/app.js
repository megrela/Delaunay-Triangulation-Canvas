/**
 * Created by gime on 3/4/2016.
 */

var app = {
    config: {},
    init: function() {
        var me = this;
        me.drawing = new Drawing($('canvas')[0]);
        me.messages = $('#messages');
        me.startListening();
    },

    initConfig: function () {
        var me = this;
        var scale = $('#scale').val();
        var points = $('#number-of-points').val();
        me.drawing.reset();
        me.messages.text('');

        me.config = {
            VERTEX_COUNT: points,
            SCALE: scale,
            MIN_X: 1,
            MIN_Y: 1,
            MAX_X: ( me.drawing.dom.width / scale )- 1,
            MAX_Y: ( me.drawing.dom.height / scale ) - 1
        };
    },

    isValid: function () {
        var me = this;
        var dx = app.config.MAX_X - app.config.MIN_X + 1;
        var dy = app.config.MAX_Y - app.config.MIN_Y + 1;
        var all = dx * dy;
        return me.config.VERTEX_COUNT <= all;
    },

    start: function () {
        var me = this;
        me.initConfig();
        if (!me.isValid()) {
            me.appendLog(
                "Indicated number of points can not be drawn, at this scale",
                "warning"
            );
            return;
        }

        me.graph = new Graph(me.config.VERTEX_COUNT);
        me.graph.randomizeVertices();

        me.drawing.drawGraphVertices(me.graph);

        me.graph.triangulate(DelaunayTriangulation);

        me.drawing.drawGraphEdges(me.graph);
    },

    startListening: function () {
        var me = this;
        $('#calculate-btn').click(function () {
            me.start();
        });
    },

    appendLog: function (data, level) {
        var me = this;
        $('<div/>', {
            class: 'alert alert-' + level,
            role: 'alert',
            text: data
        }).appendTo(me.messages);
    }
};