const db = require('../db');

class LoginModel {
  // Find user by email
  static async findByEmail(email_id) {
    const [results] = await db.query(
      'SELECT * FROM users WHERE email_id = ?',
      [email_id]
    );
    return results[0]; // returns undefined if not found
  }
}

module.exports = LoginModel;
