const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json({ message: 'Failed to fetch thoughts', error: err }));
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('reactions')
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json({ message: 'Failed to fetch thought', error: err }));
  },

  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        const userId = thought.userId;
        const thoughtId = thought._id;

        User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { thoughts: thoughtId } },
          { runValidators: true, new: true }
        )
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(thought);
          })
          .catch((err) => res.status(500).json({ message: 'Failed to update user', error: err }));
      })
      .catch((err) => res.status(500).json({ message: 'Failed to create thought', error: err }));
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        const userId = thought.userId;
        const thoughtId = thought._id;

        User.findOneAndUpdate(
          { _id: userId },
          { $pull: { thoughts: thoughtId } },
          { runValidators: true, new: true }
        )
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json({ message: 'Thought and reactions deleted!' });
          })
          .catch((err) => res.status(500).json({ message: 'Failed to update user', error: err }));
      })
      .catch((err) => res.status(500).json({ message: 'Failed to delete thought', error: err }));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this ID' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json({ message: 'Failed to update thought', error: err }));
  },

  // Create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json({ message: 'Failed to create reaction', error: err }));
  },

  // Remove reaction from the thought's reactions array
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json({ message: 'Failed to remove reaction', error: err }));
  },
};

