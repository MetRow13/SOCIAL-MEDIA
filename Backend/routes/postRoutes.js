const express = require('express');
const {
    createPost,
    getPosts,
    searchPosts,
    updatePost,
    deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new post (protected)
router.post('/', protect, createPost);

// Route to get all posts (feed, public access)
router.get('/', getPosts);

// Route to search posts (public access)
router.get('/search', searchPosts);

// Route to update a post (protected)
router.put('/:post_id', protect, updatePost);

// Route to delete a post (protected)
router.delete('/:post_id', protect, deletePost);

module.exports = router;
