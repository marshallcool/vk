import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import auth from './routes/auth';

const app = express();

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret:'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/vk', { useMongoClient: true });

app.use('/auth', auth);

app.listen('8080', err => {
  if (err) throw err;

  console.log(`Server listening on port 8080`);
});
