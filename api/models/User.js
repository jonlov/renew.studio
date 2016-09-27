/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    types: {
        permissionsComprobateJson: function(val) {
            return (val.read && val.write && val.delete);
        },
        email: function(val) {
            var a = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return a.test(val);
        }
    },
    // Validate that the attribute has the schema you want

    attributes: {
        firstName: {
            type: 'string',
            required: true
        },
        lastName: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            email: true
        },
        emailVerified: {
            type: 'boolean',
            defaultsTo: 0,
            boolean: true
        },
        sessionToken: {
            type: 'string',
            defaultsTo: 'ASlj34F0-a4df',
            required: true
        },
        picture: {
            type: 'string',
            defaultsTo: '/img/b7.jpg'
        },
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true,
            minLength: 8,
            maxLength: 100,
            protected: true
        },
        agree: {
            type: 'boolean',
            defaultsTo: true,
            boolean: true
        }, 
        background:{
            type:'string'
        }
        // permissions: {
        //     type: 'json',
        //     required: true,
        //     json: true,
        //     permissionsComprobateJson: true
        // }
    }
};