const router = require('express').Router();
const courseRoutes = require('./thought-routes');
const studentRoutes = require('./user-routes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
