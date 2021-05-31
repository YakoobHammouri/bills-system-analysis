const {
  successMessage,
  internalErrorMessage,
  failedMessage,
} = require('../../helpers/responseMessage');

const { newBillValidation } = require('../../helpers/Validation');
const { newBill } = require('../../database/query/Bills');

module.exports = (req, res) => {
  const user_id = 1;

  const billData = !req.body ? null : req.body;

  if (!billData) {
    return res
      .status(501)
      .json(
        internalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later',
        ),
      );
  }

  const { error } = newBillValidation(billData);

  if (error) {
    return res
      .status(400)
      .json(
        failedMessage(
          null,
          `Oops ! ${error.toString().replace('ValidationError:', '')}`,
        ),
      );
  }

  newBill(user_id, billData)
    .then((result) => {
      return res
        .status(200)
        .json(successMessage(null, 'The Bill Added Successfully'));
    })
    .catch((err) => {
      console.log('Error in get Add new Bull bills : ', err);
      return res
        .status(501)
        .json(internalErrorMessage(err, 'Error Happens in Add Bill Type '));
    });
};
