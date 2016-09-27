module.exports = function(req, res, next) {
    var authorization = req.cookies['user'] || req.headers.authorization;

    if (!authorization) return next();

    var payload = functions.decodeAuthToken(authorization);

    if (!payload || !payload.sub) return next();

    User.findOne({
        id: payload.sub
    }, function(err, user) {
        req.user = user;
        next();
    });

};