const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');
const { follow, unfollow } = require('../controllers/user');

router.post('/:id/follow', isLoggedIn, follow);
router.delete('/:id/follow', isLoggedIn, unfollow);

module.exports = router;
