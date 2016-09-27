/**
 * NotificationsController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    find: function(req, res) {
        var io = sails.io,
            userId = '1',
            roomClients = io.sockets.adapter.rooms[userId];

        if (roomClients) {
            io.sockets.in(userId).emit('notification', {
                image: "/img/b10.jpg",
                what: "New project " + Math.random(),
                who: "Jonlov",
                notes: "New hiphop rap.",
                time: new Date() //Math.floor(now.setTimezone('UTC'))
            });
        }
        res.ok('ok');
    },
    create: function(req, res) {
        var io = sails.io,
            userId = '1',
            roomClients = io.sockets.adapter.rooms[userId];

        if (roomClients) {
            io.sockets.in(userId).emit('notification', {
                image: "/img/b10.jpg",
                what: "New project " + Math.random(),
                who: "Jonlov",
                notes: "New hiphop rap.",
                time: new Date() //Math.floor(now.setTimezone('UTC'))
            });
        }

    }

};