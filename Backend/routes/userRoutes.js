const express = require('express');
const multer = require('multer');
const { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    getOtherUserProfile, 
    updateProfile, 
    getUserPosts
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to get the logged-in user's profile (protected)
router.get('/profile', protect, getUserProfile);


router.get('/searching', getOtherUserProfile);  // Correct the path

// Route to update the logged-in user's profile (protected)
router.put('/profile', protect, upload.single('profile_pic_url'), updateProfile);

// Assuming the route is to get user posts by their userId
router.get('/posts/:user_id', getUserPosts);  // Update route to use username

module.exports = router;