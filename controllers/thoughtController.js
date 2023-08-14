const { Thought, User } = require('../models');

const thoughtController = {
  


    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then(async (thoughts) => {
          res.status(200).json(thoughts);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // Get a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .then(async (thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID exists" })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // Create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res.status(404).json({
                message: "Thought created, but found no user with that ID",
              })
            : res.json("Created the thought 🎉")
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // Delete a thought
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID exists" })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) => {
          !user
            ? res.status(404).json({
                message: "Thought deleted, but no user with that ID exists",
              })
            : res.json({ messgae: "Thought deleted successfully 🎉" });
        })
        .catch((err) => res.status(500).json(err));
    },
    // Update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true },
        { new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID exists" })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Delete a reaction
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID exists" })
            : res.json({ message: "Reaction deleted successfully 🎉" })
        )
        .catch((err) => res.status(500).json(err));
    },
    // Add a reaction
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true },
        { new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID exists" })
            : res.json({
                message: "Reaction added successfully 🎉",
                thought,
              })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  };
module.exports = thoughtController;
