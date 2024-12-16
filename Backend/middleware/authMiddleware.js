const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // Extract the token from the Authorization header (format: "Bearer <token>")
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
        // Use the secret key from environment variables for security
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey"); // Default for development, replace with your env var
        req.user = decoded.user_id; // Attach user_id to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Handle errors from token verification
        return res.status(401).json({ message: 'Token is not valid or expired' });
    }
};

module.exports = { protect };
