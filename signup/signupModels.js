const db = require('../db');

class UserModel {
    // Create user — assumes password is already hashed
    static async create({ username, email_id, password, dob = null, ph_no = null, address = null, avatar = null }) {
        const query = `
      INSERT INTO users (username, email_id, password, dob, ph_no, address, avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        const [results] = await db.query(query, [username, email_id, password, dob, ph_no, address, avatar]);
        return { id: results.insertId, username, email_id, dob, ph_no, address, avatar };
    }

    // Update profile info
    static async updateProfile({ email_id, username, dob, ph_no, address, avatar }) {
        const query = `
      UPDATE users SET username = ?, dob = ?, ph_no = ?, address = ?, avatar = ? WHERE email_id = ?
    `;
        const [results] = await db.query(query, [username, dob, ph_no, address, avatar, email_id]);
        return results;
    }

    // Get user by email
    static async findByEmail(email_id) {
        const query = 'SELECT * FROM users WHERE email_id = ?';
        const [results] = await db.query(query, [email_id]);
        return results[0];
    }

    // Get user by username
    static async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [results] = await db.query(query, [username]);
        return results[0];
    }
}

module.exports = UserModel;
