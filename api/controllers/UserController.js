/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

module.exports = {
    profile: function(req, res) {
        if (!req.param('id')) return res.badRequest();

        if (req.user && req.user.username.toLowerCase() == req.param('id').toLowerCase())
            if (req.session.authenticated)
                return res.ok({
                    profile: req.user,
                    sameUser: true
                });
            else
                return res.ok({
                    profile: req.user
                });

        User.findOne({
            username: req.param('id')
        }, function(err, user) {
            if (!user) return res.badRequest();

            delete user.email;
            delete user.updatedAt;
            delete user.createdAt;
            delete user.sessionToken;

            return res.ok({
                profile: user
            });
        });
    },
    me: function(req, res) {
        if (!req.isSocket) {
            res.send({
                user: req.user,
                connectSocket: true
            }).end();
        } else {
            var socket = req.socket,
                io = sails.io,
                roomClients = io.sockets.adapter.rooms[req.user.id];

            // if (roomClients) console.log(roomClients);
            socket.join(req.user.id);
            res.ok('Ready');
        }
    },
    logout: function(req, res) {
        req.session.authenticated = false;
        res.cookie('user', null, {
            HttpOnly: true
        });
        res.forbidden('Logout');
    },
    // NORMAL LOGIN 
    create: function(req, res) {
        var all = req.body[0].split('|');

        if (all.length < 5)
            return res.badRequest('Invalid form.');
        else {
            var user = {
                firstName: all[0],
                lastName: all[1],
                username: all[2].toLowerCase(),
                email: all[3],
                password: all[4],
                agree: Boolean(all[5])

            };
            User.create(user, function(err, user) {
                var finalErr = '';

                if (err) {
                    for (attribute in err.invalidAttributes) {
                        finalErr += '* - ' + err.invalidAttributes[attribute][0]['message'] + '<br/>'
                    }
                    return res.badRequest(finalErr);
                }

                delete user.password;
                delete user.agree;
                delete user.createdAt;
                delete user.updatedAt;
                delete user.emailVerified;
                delete user.sessionToken;

                var token = functions.createUserToken(user);
                delete user.id;

                req.session.authenticated = true;

                res.cookie('user', 'T ' + token, {
                    HttpOnly: true
                });
                res.send({
                    token: token,
                    user: user
                });

            });
        }
    },
    // NORMAL LOGIN 
    signIn: function(req, res) {
        if (!req.isSocket && req.body[0]) {
            var all = req.body[0].split('|');
            var email = all[0];
            var password = all[1];

            function login(email, password) {
                if (validateEmail(email)) {
                    var find = {
                        email: email,
                        password: password
                    }
                } else
                    var find = {
                        username: email,
                        password: password
                    }

                User.findOne(find, function(err, existingUser) {
                    if (err) return res.badRequest(err);

                    if (existingUser) {
                        var token = functions.createUserToken(existingUser);
                        delete existingUser.id;

                        req.session.authenticated = true;

                        res.cookie('user', 'T ' + token, {
                            HttpOnly: true
                        });
                        res.send({
                            token: token,
                            user: existingUser
                        });

                    } else return res.badRequest('The email and password you entered don\'t match');
                });
            }

            login(email, password);

        } else return res.badRequest('All the fields are required');
    }
};