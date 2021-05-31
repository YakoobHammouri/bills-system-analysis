const connection = require('../../connection');

module.exports = (userId, billData) => {
  const sql = {
    text: `INSERT INTO bill (users_id, provider_id,type ,total_amount, bill_DATE, due_DATE, start_DATE,end_DATE , bill_Number) VALUES 
                     ($1 , $2 , $3, $4 , $5 , $6 , $7 , $8 , $9)`,
    values: [
      userId,
      billData.providerId,
      billData.type,
      billData.totalAmount,
      billData.billDate,
      billData.dueDate,
      billData.startDate,
      billData.endDate,
      billData.billNumber,
    ],
  };
  console.log(sql);
  return connection.query(sql.text, sql.values);
};
