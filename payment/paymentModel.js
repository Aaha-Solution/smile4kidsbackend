const db = require('../db');

const PaymentModel = {
  save: async (payment) => {
    const {
      user_id,                
      stripe_session_id,
      amount,
      currency,
      course_type,
      status
    } = payment;

    const query = `
      INSERT INTO payments (user_id, stripe_session_id, amount, currency, course_type, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [user_id, stripe_session_id, amount, currency, course_type, status];

    const [result] = await db.query(query, values);
    return { id: result.insertId };
  }
};

module.exports = PaymentModel;
