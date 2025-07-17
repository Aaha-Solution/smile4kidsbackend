const express = require('express');
const db = require('../db');
const authMiddleware = require('../authMiddleware');

const router = express.Router();

// Admin check middleware
function requireAdmin(req, res, next) {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
}

// Route: Get users with purchases + latest payment info
router.get('/users-with-purchases', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        u.users_id,
        u.username,
        u.email_id,
        u.avatar,
        up.language,
        up.level,
        p.amount,
        p.currency,
        p.course_type,
        p.created_at AS last_payment_date
      FROM users u
      JOIN user_paid_videos up ON u.users_id = up.user_id
      LEFT JOIN (
        SELECT user_id, amount, currency, course_type, created_at
        FROM payments
        WHERE (user_id, created_at) IN (
          SELECT user_id, MAX(created_at)
          FROM payments
          GROUP BY user_id
        )
      ) p ON u.users_id = p.user_id
      ORDER BY u.users_id DESC
    `);

    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({
      message: 'Database error occurred while fetching user purchases.',
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
});

module.exports = router;
