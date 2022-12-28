const express = require('express');
const router = express.Router();
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => {
   res.locals.user = req.user;
   res.locals.followCount = 0;
   res.locals.followingCount = 0;
   res.locals.followingIdList = [];
   next();
});

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);

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
