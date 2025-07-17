const UserModel = require('./signupModels');

class SignupController {
  async createUser(req, res, next) {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing request body' });
    }

    const { username, email_id, password, confirm_password, dob, ph_no, address, avatar } = req.body;

    if (!username || !email_id || !password || !confirm_password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
      const [existingUsername, existingEmail] = await Promise.all([
        UserModel.findByUsername(username),
        UserModel.findByEmail(email_id),
      ]);

      if (existingUsername || existingEmail) {
        const messages = [];
        if (existingUsername) messages.push('Username already exists');
        if (existingEmail) messages.push('Email already exists');
        return res.status(409).json({ message: messages.join(' and ') });
      }

      const user = await UserModel.create({
        username,
        email_id,
        password,
        dob,
        ph_no,
        address,
        avatar,
      });

      return res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      return next(err);
    }
  }

  async updateProfile(req, res) {
    const { email_id, dob, ph_no, address, avatar } = req.body;

    if (!email_id) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      await UserModel.updateProfile({ email_id, dob, ph_no, address, avatar });
      return res.json({ message: 'Profile updated successfully' });
    } catch {
      return res.status(500).json({ message: 'Error updating profile' });
    }
  }

  async getProfile(req, res) {
    const { email_id } = req.query;

    if (!email_id) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      const user = await UserModel.findByEmail(email_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password, confirm_password, ...profile } = user;
      return res.json(profile);
    } catch {
      return res.status(500).json({ message: 'Error fetching profile' });
    }
  }
}

module.exports = new SignupController();
