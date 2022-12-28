const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

// Post /auth/join
// auth + join
router.post('/join', isNotLoggedIn, join);

// Post /auth/login
router.post('/login', isNotLoggedIn, login);

// Get /auth/logout
router.get('/logout', isLoggedIn, logout);

// /auth/kakao
router.get('/kakao', passport.authenticate('kakao')); // 카카오톡 로그인 화면 redirect

// /auth/kaka -> 카카오톡 로그인 화면 -> /auth/kakao/callback
// /auth/kakao/callback
router.get(
   '/kakao/callback',
   passport.authenticate('kakao', {
      failureRedirect: '/?loginError=카카오로그인 실패',
   }),
   (req, res) => {
      res.redirect('/');
   },
);

module.exports = router;
