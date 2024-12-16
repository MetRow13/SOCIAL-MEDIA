

const db = require('../config/db');

// Create Post
const createPost = (req, res) => {
    const { content } = req.body;
    const userId = req.user;  // Assuming the user id is stored in req.user after authentication

    const query = 'INSERT INTO Post (user_id, content) VALUES (?, ?)';
    db.query(query, [userId, content], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Post created successfully', post_id: results.insertId });
    });
};

// Get All Posts (For the Feed)
const getPosts = (req, res) => {
    const query = `
        SELECT 
            Post.post_id, 
            Post.content, 
            Post.created_at, 
            COUNT(Likes.like_id) AS likes_count,  -- Count the likes
            COUNT(Comment.comment_id) AS comments_count,  -- Count the comments
            User.username, 
            User.profile_pic_url 
        FROM Post
        JOIN User ON Post.user_id = User.user_id
        LEFT JOIN Likes ON Post.post_id = Likes.post_id  -- Join with Likes table
        LEFT JOIN Comment ON Post.post_id = Comment.post_id  -- Join with Comment table
        GROUP BY Post.post_id, User.user_id  -- Group by Post and User to get likes and comments per post
        ORDER BY Post.created_at DESC
        LIMIT 10 OFFSET 0;
    `;
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};



// Search Posts (Example: Searching by content or keywords)
const searchPosts = (req, res) => {
    const { query } = req.query;  // Assuming the query is passed as a URL parameter like /search?query=some-search-term

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    const searchQuery = `SELECT * FROM Post WHERE content LIKE ? ORDER BY created_at DESC`;
    db.query(searchQuery, [`%${query}%`], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Update Post
const updatePost = (req, res) => {
    const { post_id, content } = req.body;
    const userId = req.user;

    const query = 'UPDATE Post SET content = ? WHERE post_id = ? AND user_id = ?';
    db.query(query, [content, post_id, userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Post not found or unauthorized' });
        res.status(200).json({ message: 'Post updated successfully' });
    });
};

// Delete Post
const deletePost = (req, res) => {
    const { post_id } = req.params;
    const userId = req.user;

    const query = 'DELETE FROM Post WHERE post_id = ? AND user_id = ?';
    db.query(query, [post_id, userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Post not found or unauthorized' });
        res.status(200).json({ message: 'Post deleted successfully' });
    });
};


module.exports = { createPost, getPosts, searchPosts, updatePost, deletePost };