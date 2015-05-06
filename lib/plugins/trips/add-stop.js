'use strict';

var Trip = require('../../models/trip');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/trips/{tripId}/stops',
    config: {
      description: 'Add a stop to a trip',
      validate: {
				params: {
					tripId: Joi.string().length(24).required()
				},
        payload: {
          name: Joi.string().min(3).required(),
          lat: Joi.number().required(),
          lng: Joi.number().required()
        }
      },
      handler: function(request, reply){
				Trip.findById(request.params.tripId, function(err, trip) {
					trip.stops.push(request.payload);
					trip.save(function(){
						reply(trip);
					});
				});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.add-stop'
};
