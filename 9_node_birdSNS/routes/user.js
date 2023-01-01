const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');
const { follow, unfollow, update_nick } = require('../controllers/user');

router.post('/:id/follow', isLoggedIn, follow);
router.delete('/:id/follow', isLoggedIn, unfollow);
router.patch('/', isLoggedIn, update_nick);

module.exports = router;
