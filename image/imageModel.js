const db = require('../db');

class ImageModel {
  static async save(path) {
    const [result] = await db.query('INSERT INTO images (path) VALUES (?)', [path]);
    return { id: result.insertId, path };
  }

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM images');
    return rows.map(row => ({ id: row.id, path: row.path })); // ✅ Clean plain objects
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM images WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return { id: rows[0].id, path: rows[0].path }; // ✅ Return clean single object
  }
}

module.exports = ImageModel;
