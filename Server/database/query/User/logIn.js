const connection = require('../../connection');

// To retuen password, gid, display_name of spesefic email
module.exports = (email) => {
  const sql = {
    text: ' SELECT password, gid, display_name FROM users WHERE email=$1',
    values: [email],
  };
  return connection.query(sql.text, sql.values);
};
