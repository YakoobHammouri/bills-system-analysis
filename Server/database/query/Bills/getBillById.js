const connection = require('../../connection');

module.exports = (billId) => {
  const sql = {
    text: 'SELECT * FROM bill where gid = $1',
    values: [billId],
  };
  return connection.query(sql.text, sql.values);
};
