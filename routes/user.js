const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


// Signup routes
router.get("/signup", userController.renderSignupForm);
router.post("/signup", userController.signup);
// Login routes

router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("error", (info && info.message) || "Invalid username or password.");
            return res.redirect("/login");
        }
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            req.flash("success", "Welcome back to Wanderlust!");
            const redirectUrl = res.locals.redirectUrl || "/listings";
            delete req.session.redirectUrl;
            res.redirect(redirectUrl);
        });
    })(req, res, next);
});



// Logout route
router.get("/logout", userController.logout);


module.exports = router;