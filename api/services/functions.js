var moment = require('moment'),
    jwt = require('jsonwebtoken');

module.exports = {
    createToken: function(token) {
        return jwt.sign(token, config.TOKEN_SECRET);
    },
    createUserToken: function(user) {
        var payload = {
            sub: user.id,
            sessionToken: user.sessionToken,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.sign(payload, config.TOKEN_SECRET);
    },
    decodeAuthToken: function(auth) {
        var token = auth.split(' ')[1];
        return jwt.decode(token, config.TOKEN_SECRET);
    },
    decodeToken: function(token) {
        return jwt.decode(token, config.TOKEN_SECRET);
    },
    verifyToken: function(token) {
        return jwt.verify(token, config.TOKEN_SECRET);
    }
}