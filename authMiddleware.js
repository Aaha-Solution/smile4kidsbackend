const jwt = require('jsonwebtoken');
const db = require('./db');

module.exports = async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];

    // Validate header format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // 🔍 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔎 Check if user exists in DB
    const [rows] = await db.query('SELECT * FROM users WHERE users_id = ?', [decoded.users_id]);

    if (!rows.length) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = rows[0]; // Attach user data
    next();

  } catch (err) {
    console.error('JWT Authentication Error:', err.message);

    // Ensure JSON response always
    return res.status(401).json({
      message: 'Unauthorized',
      error: err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token',
    });
  }
};
