const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// GET all Thoughts and POST a new Thought
router.route('/').get(getThoughts).post(createThought);

// GET a single Thought, PUT to update, and DELETE a Thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// POST a reaction to a Thought
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE a reaction from a Thought
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
