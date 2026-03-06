const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const { requireLicense } = require('../middleware/requireLicense');
const {
  parseLimit,
  parseSearchQuery,
  parseLeagueType,
  validatePlayerId,
} = require('../validators/requestValidators');
const {
  listPlayers,
  searchPlayers,
  getPlayerById,
  getPlayerTransactions,
  getLeagueAverages,
  getOpenApiDoc,
} = require('../services/playerService');

const router = express.Router();

router.get('/docs/openapi', (req, res) => {
  res.json(getOpenApiDoc());
});

router.use(requireLicense);

router.get(
  '/players',
  asyncHandler(async (req, res) => {
    const limit = parseLimit(req.query.limit, 200);
    const leagueType = parseLeagueType(req.query.leagueType);
    const players = await listPlayers({ limit, leagueType });
    res.json({ players });
  })
);

router.get(
  '/players/search',
  asyncHandler(async (req, res) => {
    const query = parseSearchQuery(req.query);
    const players = await searchPlayers(query);
    res.json({ players });
  })
);

router.get(
  '/players/:playerId/transactions',
  asyncHandler(async (req, res) => {
    const playerId = validatePlayerId(req.params.playerId);
    const data = await getPlayerTransactions(playerId);
    res.json(data);
  })
);

router.get(
  '/players/:playerId',
  asyncHandler(async (req, res) => {
    const playerId = validatePlayerId(req.params.playerId);
    const player = await getPlayerById(playerId);
    res.json({ player });
  })
);

router.get(
  '/stats/league-averages',
  asyncHandler(async (req, res) => {
    const result = await getLeagueAverages();
    res.json(result);
  })
);

module.exports = router;
