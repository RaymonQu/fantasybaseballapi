const express = require('express');

const { requireLicense } = require('../middleware/requireLicense');

const router = express.Router();

router.get('/license/status', requireLicense, (req, res) => {
  res.json({
    status: 'active',
    license: {
      consumerName: req.license.consumerName,
      keyPreview: req.license.keyPreview,
    },
    checkedAt: new Date().toISOString(),
  });
});

module.exports = router;
