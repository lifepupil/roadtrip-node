'use strict';

var User = require('../../models/user');
var Joi = require('joi');

exports.register = function(server, options, next){

  server.route({
    method: 'GET',
    path: '/users',
    config: {
      description: 'Show a user',
			// validate: {
			// 	payload: {
			// 		email: Joi.string().email().required(),
			// 		avatar: Joi.string().uri().required()
			// 	}
			// },
      handler: function(request, reply){

				if(request.auth.credentials._id) {
					User.findById(request.auth.credentials._id, function(err, user) {
						if (err) {
							console.log(err);
							return reply(err).code(400);
						} else {
							return reply(user);
						}

				});
      }
    }
	}
  });

  return next();
};

exports.register.attributes = {
  name: 'users.show'
};
