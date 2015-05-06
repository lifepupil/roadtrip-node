'use strict';

var Trip = require('../../models/trip');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/trips/{tripId}',
    config: {
      description: 'Get a trip',
      validate: {
        params: {
          tripId: Joi.string().length(24).required()
        }
      },
      handler: function(request, reply){
        Trip.findOne({_id: request.params.tripId, userId: request.auth.credentials._id}, function(err, trip){
          return reply(trip);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.show'
};
