const db = require('../db');

class ImageModel {
  // Save image path to the database
  static async save(path) {
    const [result] = await db.query(
      'INSERT INTO images (path) VALUES (?)',
      [path]
    );
    return { id: result.insertId, path };
  }

  // Get all images
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM images');
    return rows.map(row => ({
      id: row.id,
      path: row.path
    }));
  }

  // Get single image by ID
  static async getById(id) {
    const [rows] = await db.query(
      'SELECT * FROM images WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return null;
    return {
      id: rows[0].id,
      path: rows[0].path
    };
  }
}

module.exports = ImageModel;
