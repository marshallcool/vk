import express from 'express';
import passportVk from '../auth/vk';

const router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Please Sign In with:' });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/vk',
  passportVk.authenticate('vkontakte'));

router.get('/vk/callback',
  passportVk.authenticate('vkontakte', { successRedirect: '/auth', failureRedirect: '/login' }));

router.get('/', (req, res) => {
  res.json(req.user);
});

module.exports = router;