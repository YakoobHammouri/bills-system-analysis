const connection = require('../../connection');

module.exports = (id) => {
  const sql = {
    text:
    'SELECT users.display_name , users.phone ,users.personal_status ,users.number_of_individuals ,users.number_of_devices, address.town , address.city FROM users INNER JOIN address ON address.id = users.address_id WHERE users.id =$1;',
    values: [id],
  };
  return connection.query(sql.text, sql.values);
};
