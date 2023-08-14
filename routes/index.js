const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// This middleware will catch any requests that don't match the above routes
router.use((req, res) => res.status(404).send('Wrong route!'));

module.exports = router;
