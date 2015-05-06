'use strict';

var Trip = require('../../models/trip');
// var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/trips/{tripId}/stops/{stopId}',
    config: {
      description: 'Remove a stop from a trip',

      handler: function(request, reply){
				console.log('inside remove stop plugin', request.params);
				Trip.findById(request.params.tripId, function(err, trip) {
					trip.stops.pull(request.params.stopId);
					trip.save();
					return reply(request.params.stopId);

					// return reply(trip);
					// console.log('inside remove-stop findById ', trip);
				});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'trips.remove-stop'
};
