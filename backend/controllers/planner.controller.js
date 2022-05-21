const Planner = require("../models/planner.model.js");

var mongoose = require("mongoose");
const User = require("../models/user.model.js");
const { isAuthenticated } = require("../middlewares/auth.js");


//create a simple planner and ad it to the creator
function createPlanner(req, res) {
  const planner = new Planner({
    name: req.body.name,
    users: req.body.users,
  });

  planner.save().catch((err) => {
    console.log(err);
  });
  console.log(planner._id.toString());
  User.findById(planner.users[0].userId).then(async (user) => {
    user.planner.push(planner._id.toString());
    user.save();
  });
}

//find all planers for a given user, and send them back
function findAllPlanner(req, res) {
  let AllPlaner = []
  console.log(req.params._id)
  User.findById(req.params._id).then(async(user) => {
    if (user && user.planner) {
      for(let x=0;x<user.planner.length;x++){
        let response = await Planner.findById(user.planner[x]).exec();
        AllPlaner.push(response);
      }
      res.send(AllPlaner);
    } else {
      res.send("Impossible");
    }
  });
}

module.exports = {
  createPlanner,
  findAllPlanner,
};
