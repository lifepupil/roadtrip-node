'use strict';

var User = require('../../models/user');

exports.register = function(server, options, next){

  server.route({
    method: 'PUT',
    path: '/users',
    config: {
      description: 'Update a user',
      handler: function(request, reply){
				// console.log()
        if (request.auth.credentials._id) {
          User.findByIdAndUpdate(request.auth.credentials._id, request.payload, saveCb);
        } else {
          var user = new User(request.payload);
          user.firebaseId = request.auth.credentials.firebaseId;
          user.save(saveCb);
        }
        function saveCb(err, user){
          if(err){
            reply(JSON.stringify(err)).code(400);
          } else {
            return reply(user);
          }
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.update'
};
