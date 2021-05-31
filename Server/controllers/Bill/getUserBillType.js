const {
  successMessage,
  internalErrorMessage,
} = require('../../helpers/responseMessage');

const { getUserBillType } = require('../../database/query/Bills');

module.exports = (req, res) => {
  //const  {id}  = req.user => it comes from miderware after user login

  const id = 1;

  getUserBillType(id)
    .then((result) => {
      return res.status(200).json(successMessage(result.rows));
    })
    .catch((err) => {
      console.log('Error in get bill of current user : ', { ...err });
      return res.json(
        internalErrorMessage(null, 'Error Happens in get User Bill Type '),
      );
    });
};
