const express = require('express');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.get('/google', (req, res, next) => {
  // console.log(`🌐 Google OAuth route hit by ${process.env.INSTANCE_NAME || process.env.HOSTNAME || "unknown app"}`);
  next(); 
}, passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: req.user });
});

module.exports = router;