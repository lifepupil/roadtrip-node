'use strict';

var Mongoose = require('mongoose');

var tripSchema = Mongoose.Schema({
  name: {type: String, required: true},
  departure: {type: Date, required: true},
  userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  createdAt : {type: Date, required: true, default: Date.now}
});

var Trip = Mongoose.model('Trip', tripSchema);
module.exports = Trip;
