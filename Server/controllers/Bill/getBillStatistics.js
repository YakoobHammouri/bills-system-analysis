const {
  successMessage,
  internalErrorMessage,
  failedMessage,
} = require('../../helpers/responseMessage');

const {
  getBillStatistics,
  getBillById,
} = require('../../database/query/Bills');

const { getPersonalInfo } = require('../../database/query/User');

module.exports = async (req, res) => {
  const { billId } = req.params;
  const user_id = 1;

  try {
    // get user data  and bill info
    const results = await Promise.all([
      getPersonalInfo(user_id),
      getBillById(billId),
    ]);

    const user = results[0].rows[0];
    const bill = results[1].rows[0];

    if (!user || !bill) {
      return res
        .status(400)
        .json(
          failedMessage(null, 'Some Error in getting Bill, please try again'),
        );
    }
    const statistics = (await getBillStatistics(user_id, bill, user)).rows;

    // get atotal_amount from rows object to retrun [.....] with amount
    const amount = [];
    const amountLabels = [];

    amount.push(bill.total_amount);
    amountLabels.push('Me');
    for (let i = 0; i < statistics.length; i++) {
      amount.push(statistics[i].total_amount);
      amountLabels.push(`P-${i + 1}`);
    }

    return res.status(200).json(successMessage({ amount, amountLabels }));
  } catch (err) {
    console.log('Error in get statistics bills : ', err);
    return res
      .status(501)
      .json(internalErrorMessage(null, 'Error Happens in get Bill Type '));
  }
};
