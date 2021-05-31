const {
    successMessage,
    internalErrorMessage,
  } = require('../../helpers/responseMessage');

  const {getLastBill} = require('../../database/query/Bills')

  module.exports = (req, res) => { 
      const {bill_type } = req.params ;
      const user_id = 1;
      getLastBill(bill_type, user_id)
      .then((result) => {
        return res.status(200).json(successMessage(result.rows));
      })
      .catch((err) => {
        console.log('Error in get last bills : ', err );
        return res.status(501).json(
          internalErrorMessage(null, 'Error Happens in get Bill Type '),
        );
      });

  }