const Planner = require("../models/planner.model.js");

var mongoose = require("mongoose");
const { isAuthenticated } = require("../middlewares/auth.js");

function createPlanner(req, res) {
  console.log(req.body);
  const planner = new Planner({
    name: req.body.name,
    users: req.body.users,
  });

  planner
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  createPlanner,
};
