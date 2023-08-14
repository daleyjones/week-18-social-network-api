const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThoughtById,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

//GET and POST all Thoughts
router.route('/').get(getAllThoughts).post(createThought);

//GET, PUT and DELETE Thoughts
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThought);

// POST reaction to a Thought
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE reaction to a Thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;