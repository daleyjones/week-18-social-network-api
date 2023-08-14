const { User } = require('../models');

const userController = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find();
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a Single User
  async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId });

      if (!dbUserData) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a User
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a User
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      res.json({ message: 'User deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a User
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No User with this ID' });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
