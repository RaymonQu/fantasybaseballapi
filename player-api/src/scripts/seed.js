require('dotenv').config();

const mongoose = require('mongoose');
const { connectDb } = require('../config/db');
const { ensureSeedData } = require('../services/seedService');

async function run() {
  await connectDb();
  const result = await ensureSeedData({ force: true });
  console.log('Seed complete:', result);
  await mongoose.connection.close();
}

run().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
