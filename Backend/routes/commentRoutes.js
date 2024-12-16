const express = require('express');
const {
    createComment,
    getComments,
    updateComment,
    deleteComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new comment (protected)
router.post('/', protect, createComment);

// Route to get comments for a specific post (public access)
router.get('/:post_id', getComments);

// Route to update a comment (protected)
router.put('/:comment_id', protect, updateComment);

// Route to delete a comment (protected)
router.delete('/:comment_id', protect, deleteComment);

module.exports = router;
