const express = require('express');
const router = express.Router();
const { renderProfile, renderJoin, renderMain, renderHashtag } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => {
   res.locals.user = req.user;
   res.locals.followCount = req.user?.Followers.length || 0;
   res.locals.followingCount = req.user?.Followings.length || 0;
   res.locals.followingIdList = req.user?.Followings.map(f => f.id) || [];
   next();
});

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);
router.get('/hashtag', renderHashtag); //hashtag?hashtag=강아지

module.exports = router;
/*

/*

const express = require('express');
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
   res.locals.user = null;
   res.locals.followerCount = 0;
   res.locals.followingCount = 0;
   res.locals.followingIdList = [];
   next();
});

router.get('/profile', renderProfile);

router.get('/join', renderJoin);

router.get('/', renderMain);

module.exports = router;
*/
