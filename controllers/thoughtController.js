const { Thought, User } = require('../models');

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID exists" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const createdThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: createdThought._id } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "Thought created, but found no user with that ID" });
      } else {
        res.json("Created the thought 🎉");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID exists" });
      } else {
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        if (!user) {
          res.status(404).json({ message: "Thought deleted, but no user with that ID exists" });
        } else {
          res.json({ message: "Thought deleted successfully 🎉" });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID exists" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID exists" });
      } else {
        res.json({ message: "Reaction deleted successfully 🎉" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID exists" });
      } else {
        res.json({ message: "Reaction added successfully 🎉", thought });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
