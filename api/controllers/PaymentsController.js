/**
 * PaymentsController
 *
 * @description :: Server-side logic for managing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ipn = require('paypal-ipn');

module.exports = {
    notify: function(req, res) {
        var params = req.body

        //You can also pass a settings object to the verify function:
        ipn.verify(params, { 'allow_sandbox': true }, function callback(err, mes) {
            if (err) {
                console.error(err);
            } else {
                // Do stuff with original params here

                if (params.payment_status == 'Completed') {
        			console.log(params);
                    // Payment has been confirmed as completed
                }
            }
        });

        res.send(200);
    }

};