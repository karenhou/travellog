const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load validation
const validateTripInput = require("../../validation/trip");
const validateDaysInput = require("../../validation/day");

// trip model
const Trip = require("../../models/Trip");
//Profile model
const Profile = require("../../models/Profile");

// @route GET api/trips/test
// @desc  Tests trips route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "trips works" }));

// @route GET api/trips
// @desc  Get all trips
// @access Public
router.get("/", (req, res) => {
  Trip.find()
    .sort({ date: -1 })
    .then(trips => res.json(trips))
    .catch(err => res.status(404).json({ notripsfound: "No trips found" }));
});

// @route POST api/trips
// @desc  Create trip
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTripInput(req.body);
    //validate
    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newTrip = new Trip({
      author: req.body.author,
      country: req.body.country,
      from: req.body.from,
      to: req.body.to,
      length: req.body.length,
      user: req.user.id,
      budget: req.body.budget,
      description: req.body.description,
      coverPhoto: req.body.coverPhoto,
      days: [...req.body.days]
    });

    newTrip.save().then(trip => res.json(trip));
  }
);

// @route   GET api/trips/:trip_id
// @desc    Get trip by id
// @access  Public
router.get("/:trip_id", (req, res) => {
  Trip.findById(req.params.trip_id)
    .then(trip => {
      res.json(trip);
    })
    .catch(err =>
      res.status(404).json({ notripfound: "No trip found with that id" })
    );
});

// @route   EDIT api/trips/:trip_id
// @desc    edit trip by id
// @access  private
router.post(
  "/:trip_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Trip.findById(req.params.trip_id)
      .then(trip => {
        // res.json(trip);
        trip.country = req.body.country;
        trip.from = req.body.from;
        trip.to = req.body.to;
        trip.length = req.body.length;
        trip.budget = req.body.budget;
        trip.description = req.body.description;
        trip.coverPhoto = req.body.coverPhoto;
        trip.days = [...req.body.days];
        trip.save().then(trip => res.json(trip));
      })
      .catch(err =>
        res.status(404).json({ notripfound: "No trip found with that id" })
      );
  }
);

// @route   DELETE api/trips/:trip_id
// @desc    delete trip by id
// @access  private
router.delete(
  "/:trip_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find({ user: req.user.id }).then(user => {
      Trip.findById(req.params.trip_id)
        .then(trip => {
          //check trip owner
          if (trip.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          //delete
          trip.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ tripnotfound: "No trip found by that id" })
        );
    });
  }
);

// @route   GET api/trips/user/:user_id
// @desc    Get trips by user ID
// @access  public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Trip.find({ user: req.params.user_id })
    .then(trip => {
      if (!trip) {
        errors.notrip = "There is no trip for this user";
        res.status(404).json(errors);
      }

      res.json(trip);
    })
    .catch(err =>
      res.status(404).json({ notrip: "There is no trip for this user" })
    );
});

// @route   POST api/trips/:trip_id/:day_date
// @desc    Add/edit day to trips
// @access  Private
router.post(
  "/:trip_id/:day_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDaysInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Trip.findById(req.params.trip_id).then(trip => {
      const newDay = {
        // cities: req.body.cities.split(","),
        cities: [...req.body.cities],
        hotel: req.body.hotel,
        photoLinks: [...req.body.photoLinks],
        date: req.body.date,
        _id: req.params.day_id
      };

      trip.days.map((d, i) => {
        if (d._id == req.params.day_id) {
          trip.days[i] = newDay;
        }
      });

      trip.save().then(trip => {
        res.json(trip);
      });
    });
  }
);

// @route   GET api/trips/:trip_id
// @desc    Get trip by id
// @access  Public
router.get("/:trip_id", (req, res) => {
  Trip.findById(req.params.trip_id)
    .then(trip => {
      res.json(trip);
    })
    .catch(err =>
      res.status(404).json({ notripfound: "No trip found with that id" })
    );
});

module.exports = router;
