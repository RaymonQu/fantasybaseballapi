const { findActiveLicenseByApiKey } = require('../services/licenseService');
const { AppError } = require('../utils/appError');

async function requireLicense(req, res, next) {
  const apiKeyHeader = req.headers['x-api-key'];
  if (!apiKeyHeader || typeof apiKeyHeader !== 'string' || !apiKeyHeader.trim()) {
    return next(new AppError('Missing API key', 401));
  }

  try {
    const license = await findActiveLicenseByApiKey(apiKeyHeader.trim());
    if (!license) {
      return next(new AppError('Invalid or inactive API key', 403));
    }

    req.license = {
      id: license._id.toString(),
      consumerName: license.consumerName,
      keyPreview: license.keyPreview,
    };
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = { requireLicense };
