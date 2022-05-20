const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: "2mb" });

module.exports = function (app) {
  const planner = require("../controllers/planner.controller");
  const auth = require("../middlewares/auth.js");

  // app.get("/api/users", auth.isAuthenticated, user.findAll);
  // app.patch("/api/users", auth.isAuthenticated,urlencodedParser, user.updateUser);
  // app.patch("/api/users/claim/:discordId/:token",urlencodedParser, user.updateUserBooster);
  // app.patch(
  //   "/api/users/:discordId/:verified/:token",
  //   urlencodedParser,
  //   user.updateUserByDiscordId
  // );

  //new routes for S2
  app.post("/api/planner", auth.isAuthenticated, urlencodedParser, planner.createPlanner);
  // app.get("/api/users/mycollection", auth.isAuthenticated, user.getMyCollection)
  // app.get("/api/users/myboosters", auth.isAuthenticated, user.getMyBoosters)
  // app.get("/api/users/set/:setname", auth.isAuthenticated, user.claimSet)
  // app.get("/api/users/leaderboard", auth.isAuthenticated, user.getLeaderboard)
};
