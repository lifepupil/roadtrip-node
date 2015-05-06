'use strict';

var Trip = require('../../models/trip');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/trips',
    config: {
      description: 'Get all trips',
      handler: function(request, reply){
        Trip.find({userId: request.auth.credentials._id}, function(err, trips){
          return reply({trips: trips});
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.index'
};
