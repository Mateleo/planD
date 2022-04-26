module.exports = function (app) {
  const passport = require("passport");
  app.get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );
  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/success");
    }
  );
  app.get("/api/auth/", (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  });
};
