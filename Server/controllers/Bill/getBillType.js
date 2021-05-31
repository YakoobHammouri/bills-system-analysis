const {
  successMessage,
  internalErrorMessage,
} = require('../../helpers/responseMessage');

const { PROVIDERTYPE } = require('../../helpers/Constants');

module.exports = (req, res) => {
  try {
    return res.status(200).json(successMessage(Object.values(PROVIDERTYPE)));
  } catch (err) {
    console.log('Error in Bill Type  : ', err);
    return res
      .status(501)
      .json(internalErrorMessage(err, 'Error in Bill Type '));
  }
};
