const express = require('express');
const { followUser, unfollowUser } = require('../controllers/followController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, followUser);
router.delete('/', protect, unfollowUser);

module.exports = router;
