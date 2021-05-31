const {
  successMessage,
  internalErrorMessage,
} = require('../../helpers/responseMessage');

const { getProviderByType } = require('../../database/query/Provider');

module.exports = (req, res) => {
  const { bill_type } = req.params;
  getProviderByType(bill_type)
    .then((result) => {
      return res.status(200).json(successMessage(result.rows));
    })
    .catch((err) => {
      console.log('Error in get Provider : ', err);
      return res
        .status(501)
        .json(internalErrorMessage(err, 'Error Happens in get Provider '));
    });
};
