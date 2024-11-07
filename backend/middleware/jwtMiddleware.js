const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the header
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Verify the token
    req.user = decoded; // Attach user data, including role, to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = jwtMiddleware;
