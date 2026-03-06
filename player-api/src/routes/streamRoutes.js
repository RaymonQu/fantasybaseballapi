const express = require('express');

const { requireLicense } = require('../middleware/requireLicense');
const {
  SSE_EVENTS,
  transactionEventBus,
  formatSseFrame,
} = require('../services/transactionStreamService');

const router = express.Router();

router.get('/stream/transactions', requireLicense, (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  if (typeof res.flushHeaders === 'function') {
    res.flushHeaders();
  }

  const heartbeatPayload = {
    timestamp: new Date().toISOString(),
  };
  res.write(formatSseFrame(SSE_EVENTS.HEARTBEAT, heartbeatPayload));

  const onTransaction = (eventPayload) => {
    res.write(formatSseFrame(SSE_EVENTS.PLAYER_TRANSACTION_CREATED, eventPayload));
  };

  transactionEventBus.on(SSE_EVENTS.PLAYER_TRANSACTION_CREATED, onTransaction);

  const heartbeatInterval = setInterval(() => {
    res.write(
      formatSseFrame(SSE_EVENTS.HEARTBEAT, {
        timestamp: new Date().toISOString(),
      })
    );
  }, 25_000);

  req.on('close', () => {
    clearInterval(heartbeatInterval);
    transactionEventBus.off(SSE_EVENTS.PLAYER_TRANSACTION_CREATED, onTransaction);
  });
});

module.exports = router;
