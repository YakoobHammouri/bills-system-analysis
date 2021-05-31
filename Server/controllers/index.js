const router = require('express').Router();
const {
  getLastBill,
  getUserBillType,
  newBill,
  getBillType,
} = require('./Bill');
const { logIn } = require('./User');
const { getPersonalInfo } = require('./User');

const { getProviderByType } = require('./Provider');

router.get('/api/bill/getBillByType/:bill_type', getLastBill);
router.post('/api/login', logIn);
router.get('/api/profile', getPersonalInfo);
router.get('/api/home', getUserBillType);

router.get('/api/getBillType', getBillType);
router.get('/api/providers/getProviders/:bill_type', getProviderByType);

router.post('/api/new-bill', newBill);

module.exports = router;
