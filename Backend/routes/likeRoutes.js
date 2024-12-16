const express = require('express');
const { likePost, unlikePost } = require('../controllers/likeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, likePost);
router.delete('/:post_id', protect, unlikePost);

module.exports = router;
