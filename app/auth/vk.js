import passport from 'passport';
const VKontakteStrategy = require('passport-vkontakte').Strategy;
import User from '../models/user';

passport.serializeUser((user, fn) => fn(null, user));

passport.deserializeUser((id, fn) => User.findOne({_id: id.doc._id}, (err, user) => fn(err, user)));

passport.use(new VKontakteStrategy(
  {
    clientID:     '6805849',
    clientSecret: 'IGQhszvGCMjAGmJ02Qas',
    callbackURL:  "http://localhost:8080/auth/vk/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName, userid: profile.id}, (err, user) => {
      if (err) { return done(err); }
      done(null, user);
    })
  }
));

module.exports = passport;
