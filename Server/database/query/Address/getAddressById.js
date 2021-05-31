const connection = require('../../connection');

module.exports = (addreeId) => {
  const sql = {
    text: 'SELECT * FROM address where id = $1',
    values: [addreeId],
  };
  return connection.query(sql.text, sql.values);
};
