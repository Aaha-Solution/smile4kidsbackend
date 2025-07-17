const LoginModel = require('./loginModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const PaidVideoModel = require('../payment/paidVideoModel');

class LoginController {
  async login(req, res) {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await LoginModel.findByEmail(email_id);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare hashed password, fallback to plain text for legacy users
      let isMatch = false;
      try {
        isMatch = await bcrypt.compare(password, user.password);
      } catch {}
      if (!isMatch && password === user.password) {
        isMatch = true; // fallback for plain text
      }
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const paidVideos = await PaidVideoModel.getPaidVideos(user.users_id);

      const token = jwt.sign(
        {
          users_id: user.users_id,
          username: user.username,
          email_id: user.email_id,
          avatar: user.avatar,
          level: user.level,
          language: user.language,
          is_admin: user.is_admin
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          users_id: user.users_id,
          username: user.username,
          email_id: user.email_id,
          avatar: user.avatar,
          level: user.level,
          language: user.language,
          is_admin: user.is_admin,
          paid_categories: paidVideos
        }
      });
    } catch {
      return res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  }
}

module.exports = new LoginController();
