const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json({ message: 'Failed to fetch users', error: err }));
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json({ message: 'Failed to fetch user', error: err }));
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json({ message: 'Failed to create user', error: err }));
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this ID' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json({ message: 'Failed to update user', error: err }));
  },

  // Delete a user and their associated thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
        return Thought.deleteMany({ userId: req.params.userId });
      })
      .then(() => res.json({ message: 'User and associated thoughts are deleted!' }))
      .catch((err) => res.status(500).json({ message: 'Failed to delete user', error: err }));
  },

  // Add a friend to the user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with that ID' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json({ message: 'Failed to add friend', error: err }));
  },

  // Remove a friend from the user's friends array
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with that ID' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json({ message: 'Failed to remove friend', error: err }));
  },
};
