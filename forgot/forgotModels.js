const db = require('../db');

class ForgotModel {
  // Find user by email
  static async findByEmail(email_id) {
    const [rows] = await db.query('SELECT * FROM users WHERE email_id = ?', [email_id]);
    return rows[0];
  }

  // Save OTP to user record
  static async saveOTP(email_id, otp) {
    const [results] = await db.query(
      'UPDATE users SET otp = ? WHERE email_id = ?',
      [otp, email_id]
    );
    return results;
  }

  // Verify OTP from user input
  static async verifyOTP(email_id, otp) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email_id = ? AND otp = ?',
      [email_id, otp]
    );
    return rows[0];
  }

  // Update password (already hashed in controller)
  static async updatePassword(email_id, hashedPassword) {
    const [results] = await db.query(
      'UPDATE users SET password = ?, confirm_password = ?, otp = NULL WHERE email_id = ?',
      [hashedPassword, hashedPassword, email_id]
    );
    return results;
  }
}

module.exports = ForgotModel;
