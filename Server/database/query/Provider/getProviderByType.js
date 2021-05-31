const connection = require('../../connection');

module.exports = (type) => {
  const sql = {
    text: 'select * from provider where type_supported=$1',
    values: [`{"${type}"}`],
  };
  return connection.query(sql.text, sql.values);
};
