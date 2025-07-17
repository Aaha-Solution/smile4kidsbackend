const ForgotModel = require('./forgotModels');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class ForgotController {
  async sendOTP(req, res) {
    const { email_id } = req.body;
    if (!email_id) return res.status(400).json({ message: 'Email is required' });

    try {
      const user = await ForgotModel.findByEmail(email_id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await ForgotModel.saveOTP(email_id, otp);

      const transporter = nodemailer.createTransport({
        host: 'smile4kids.co.uk',
        port: 465,
        secure: true,
        auth: {
          user: 'safrina@smile4kids.co.uk',
          pass: 'Monday@123',
        },
      });

      await transporter.sendMail({
        from: '"Smile4Kids Support" <safrina@smile4kids.co.uk>',
        to: email_id,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}. Use this code to reset your Smile4Kids Mobile App password.`,
      });

      res.json({ message: 'OTP sent to your email' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
    }
  }

  async verifyOTP(req, res) {
    const { email_id, otp } = req.body;
    if (!email_id || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
      const user = await ForgotModel.verifyOTP(email_id, otp);
      if (!user) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      res.json({ message: 'OTP verified. You can now reset your password.' });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong while verifying OTP' });
    }
  }

  async resetPassword(req, res) {
    const { email_id, otp, new_password, confirm_password } = req.body;

    if (!email_id || !otp || !new_password || !confirm_password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const user = await ForgotModel.findByEmail(email_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      if (new_password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

      const isSame = await bcrypt.compare(new_password, user.password);
      if (isSame) {
        return res.status(400).json({ message: 'New password must be different from the current password' });
      }

      const hashedPassword = await bcrypt.hash(new_password, SALT_ROUNDS);
      await ForgotModel.updatePassword(email_id, hashedPassword);

      res.json({ message: 'Password reset successful' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to reset password. Please try again later.' });
    }
  }

  async changePassword(req, res) {
    const { current_password, new_password, confirm_password } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!current_password || !new_password || !confirm_password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
      const isMatch = await bcrypt.compare(current_password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }

      const isSame = await bcrypt.compare(new_password, user.password);
      if (isSame) {
        return res.status(400).json({ message: 'New password must be different from the current password' });
      }

      const hashedPassword = await bcrypt.hash(new_password, SALT_ROUNDS);
      await ForgotModel.updatePassword(user.email_id, hashedPassword);

      res.json({ message: 'Password changed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong while changing password' });
    }
  }
}

module.exports = new ForgotController();
