/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */
// var secret = require('../../api/services/config.js').sessionSecret;

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: (process.env.OPENSHIFT_APP_NAME && process.env.OPENSHIFT_APP_NAME == "prod") ? 'prodMongoDBServer' : 'localDiskDb'
    },
    // autoreload: {
    //     active: true
    // },
    /***************************************************************************
     * Set the port in the production environment to 80                        *
     ***************************************************************************/

    session: (process.env.OPENSHIFT_APP_NAME && process.env.OPENSHIFT_APP_NAME == "prod") ? {
        secret: require('../../api/services/config.js').sessionSecret,
        adapter: 'connect-mongo',
        host: process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost',
        port: process.env.OPENSHIFT_MONGODB_DB_PORT || 27017,
        user: process.env.OPENSHIFT_MONGODB_DB_USERNAME || '',
        password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '',
        db: 'prod',
        collection: 'sessions',
        auto_reconnect: false,
        ssl: false,
        stringify: true
    } : require('../session.js').session,
    // port: 80,

    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    log: {
        level: "silent"
    }
};