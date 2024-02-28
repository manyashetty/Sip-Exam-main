import { login, register } from "../controller/userController";
import express from "express";
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();
require('dotenv').config();

// register
router.post("/signup", async(req, res) => {
    try {
        if (req.header('Authorization')) {
            return res.status(500).json({ success: false, message: "User has an active session." })
        }
        var register = await register(req.body);
        return res.status(register.success ? 200 : 500).json(register)
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});


// signin
router.post("/signin", async(req, res) => {
    try {
        if (req.header('Authorization')) {
            return res.status(500).json({ success: false, message: "User has an active session." })
        }
        var login = await login(req.body);
        return res.status(login.success ? 200 : 500).json(login)
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    });

app.get('/profile', (req, res) => {
    res.send(`<h1>Welcome ${req.user.displayName}</h1>`);
});

module.exports = (
    router
)