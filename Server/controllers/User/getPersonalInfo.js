const {
  successMessage,
  internalErrorMessage,
} = require('../../helpers/responseMessage');
const { getPersonalInfo } = require('../../database/query/User');
module.exports = (req, res) => {
  const id = 1;
  getPersonalInfo(id)
    .then((result) => {
      return res.status(200).json(successMessage(result.rows[0]));
    })
    .catch((err) => {
      console.log('Error in get personal information of current user ', err);
      return res
        .status(501)
        .json(
          internalErrorMessage(
            null,
            'Error Happens in get User  personal information ',
          ),
        );
    });
};
