const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  country: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  length: {
    type: Number
  },
  budget: {
    type: Number
  },
  description: {
    type: String
  },
  days: [
    {
      users: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      cities: {
        type: [String],
        required: true
      },
      hotel: {
        type: String
      },
      photoLinks: {
        type: [String]
      }
    }
  ]
});

module.exports = Trip = mongoose.model("trip", TripSchema);
