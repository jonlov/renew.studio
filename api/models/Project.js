/**
 * Projects.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string'
        },
        picture: {
            type: 'string',
            defaultsTo: '/img/b7.jpg'
        },
        password: {
            type: 'string',
            required: false,
            minLength: 8,
            maxLength: 100,
            protected: true
        },
        user: {
            type: 'string',
            required: true,
            unique: true
        },
        background: {
            type: 'string'
        },
        map: {
            type: 'json'
        }
    }
};