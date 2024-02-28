import express from "express";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { login, register } from "../controller/userController";
// import dotenv from 'dotenv';
// dotenv.config();

const authRouter = express.Router();
// register
authRouter.post("/signup", async(req, res) => {
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
authRouter.post("/signin", async(req, res) => {
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
// app.use(passport.initialize());
// app.use(passport.session());

// Google OAuth Strategy

passport.use(new GoogleStrategy({
    clientID: '219345309829-3ppdnncigq3ti8gtj8t5r31end13v2u6.apps.googleusercontent.com',
    clientSecret: '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',
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


// Google authentication route
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route
authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  });

// Profile route
authRouter.get('/profile', (req, res) => {
  res.send(`<h1>Welcome ${req.user.displayName}</h1>`);
});

// module.exports = (
//     router
// )
export {authRouter};