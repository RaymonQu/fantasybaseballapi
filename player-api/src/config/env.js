const REQUIRED_ENV_KEYS = [
  'MONGODB_URI',
  'ADMIN_SECRET',
  'PLAYER_API_LICENSE_KEY',
  'PLAYER_API_LICENSE_CONSUMER',
  'AUTO_SEED',
];

function requireEnv(key) {
  const value = process.env[key];
  if (!value || !String(value).trim()) {
    throw new Error(`${key} is required`);
  }
  return String(value).trim();
}

function parseBooleanEnv(key) {
  const normalized = requireEnv(key).toLowerCase();
  if (normalized !== 'true' && normalized !== 'false') {
    throw new Error(`${key} must be either "true" or "false"`);
  }
  return normalized === 'true';
}

function validatePlayerApiEnv() {
  for (const key of REQUIRED_ENV_KEYS) {
    requireEnv(key);
  }
}

module.exports = {
  validatePlayerApiEnv,
  parseBooleanEnv,
};
