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
            MAX_X: me.drawing.dom.width / scale,
            MAX_Y: me.drawing.dom.height / scale
        };
    },

    start: function () {
        var me = this;
        me.initConfig();
        me.graph = new Graph(me.config.VERTEX_COUNT);
        me.graph.randomizeVertices();
        me.drawing.drawGraphVertices(me.graph);
        app.triangulate();
    },

    triangulate: function () {
        var me = this;
        me.graph.triangulate(DelaunayTriangulation);
        me.drawing.drawGraphEdges(me.graph);
    },

    startListening: function () {
        var me = this;
        $('#calculate-btn').click(function () {
            me.start();
        });
    },

    appendLog: function (data) {
        console.log(data);
        var me = this;

        $('<div/>', {
            class: 'alert alert-info',
            role: 'alert',
            text: data
        }).appendTo(me.messages);
    }
};