const connection = require('../../connection');

module.exports = (userId) => {
  const sql = {
    text: 'SELECT DISTINCT  type FROM bill where users_id = $1',
    values: [userId],
  };
  return connection.query(sql.text, sql.values);
};
