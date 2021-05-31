const connection = require('../../connection');

module.exports = (userId, bill, user) => {
  const dueDate = new Date(`${bill.due_date}`);
  const sql = {
    text:
      'SELECT bill.total_amount FROM address INNER JOIN users ON address.id = users.address_id INNER JOIN bill ON users.id = bill.users_id WHERE EXTRACT(MONTH FROM bill.due_DATE) = $2 AND EXTRACT(YEAR FROM bill.due_DATE) = $3 AND address.city =$4  AND address.town =$5 AND users.number_of_Individuals BETWEEN $6 AND $7 AND users.number_of_devices BETWEEN $8 AND $9 AND users.id !=$10 AND bill.type=$1 Order by bill.total_amount LIMIT 5 ',
    values: [
      bill.type, // 1
      dueDate.getMonth() + 1, // 2
      dueDate.getFullYear(), // 3
      user.city, // 4
      user.town, // 5
      user.number_of_individuals - 1, // 6
      user.number_of_individuals + 1, // 7
      user.number_of_devices - 1, // 8
      user.number_of_devices + 1, // 9
      userId, // 10,
    ],
  };

  return connection.query(sql.text, sql.values);
};
