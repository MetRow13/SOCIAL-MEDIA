const db = require('../config/db');

// Create Comment
const createComment = (req, res) => {
    const { post_id, content } = req.body;
    const userId = req.user;

    const query = 'INSERT INTO Comment (post_id, user_id, content) VALUES (?, ?, ?)';
    db.query(query, [post_id, userId, content], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Comment created successfully', comment_id: results.insertId });
    });
};

// Get Comments for a Post
const getComments = (req, res) => {
    const { post_id } = req.params;

    const query = 'SELECT * FROM Comment WHERE post_id = ? ORDER BY created_at DESC';
    db.query(query, [post_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};


const updateComment = (req, res) => {
    const { content } = req.body;  // content will still come from the body
    const { comment_id } = req.params;  // comment_id should come from the URL
    const userId = req.user;

    const query = 'UPDATE Comment SET content = ? WHERE comment_id = ? AND user_id = ?';
    db.query(query, [content, comment_id, userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Comment not found or unauthorized' });
        res.status(200).json({ message: 'Comment updated successfully' });
    });
};

// Delete Comment
const deleteComment = (req, res) => {
    const { comment_id } = req.params;
    const userId = req.user;

    const query = 'DELETE FROM Comment WHERE comment_id = ? AND user_id = ?';
    db.query(query, [comment_id, userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Comment not found or unauthorized' });
        res.status(200).json({ message: 'Comment deleted successfully' });
    });
};

module.exports = { createComment, getComments, updateComment, deleteComment };

