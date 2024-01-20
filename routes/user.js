const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware");
const {
  renderSingupForm,
  registerUser,
  renderLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.get("/signup", renderSingupForm);

router.post("/signup", wrapAsync(registerUser));

router.get("/login", renderLoginForm);

router.post(
  "/login",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  loginUser
);

router.get("/logout", logoutUser);

module.exports = router;
