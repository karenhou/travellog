const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  author: {
    type: String,
    required: true
  },
  // country: {
  //   type: String,
  //   required: true
  // },
  country: {
    type: [
      {
        name: { type: String, required: true },
        lat: { type: String },
        lng: { type: String },
        placeId: { type: String }
      }
    ]
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  length: { type: Number },
  budget: { type: Number },
  description: { type: String },
  coverPhoto: { type: String },
  days: [
    {
      users: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      hotel: { type: String },
      date: { type: Date },
      schedule: { type: String },
      cities: [
        {
          name: { type: String },
          description: { type: String },
          lat: { type: String },
          lng: { type: String },
          placeId: { type: String },
          POI: [
            {
              name: { type: String },
              lat: { type: String },
              lng: { type: String },
              placeId: { type: String },
              photoLinks: { type: [String] },
              description: { type: String }
            }
          ]
        }
      ]
    }
  ]
});

module.exports = Trip = mongoose.model("trip", TripSchema);
