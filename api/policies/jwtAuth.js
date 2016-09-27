module.exports = function(req, res, next) {
    var authorization = req.cookies['user'] || req.headers.authorization,
        redirect = req.param('redirect');

    if(redirect == 'true' || redirect == undefined) redirect = true;
    else redirect = false;

    if (!authorization) return res.forbidden('You are not permitted to perform this action.');

    var payload = functions.decodeAuthToken(authorization);

    if (!payload || !payload.sub) return res.forbidden('You are not permitted to perform this action.');

    User.findOne({
        id: payload.sub
    }, function(err, user) {
        if (!user) return res.forbidden('You are not permitted to perform this action.');
        if (!req.session.authenticated) return res.sessionExpired({
            user: user,
            redirect: redirect
        });

        req.user = user;
        next();
    });

};