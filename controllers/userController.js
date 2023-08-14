const { User, Thought } = require('../models');

const UserController = {
    getUsers(req, res) {
        User.find()
          .then(async (users) => {
            res.status(200).json(users);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
     
      getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select("-__v")
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: "No student with that ID exists" })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      
      createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },
     
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user with that ID exists" })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() =>
            res.json({
              message: "User and associated thoughts have been deleted 🎉",
            })
          )
          .catch((err) => res.status(500).json(err));
      },
   
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user with that ID exists" })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
     
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { new: true }
        )
          .then((user) => {
            !user
              ? res.status(404).json({ message: "No user with that ID exists" })
              : res.json({
                  message: "Friend added successfully 🎉",
                  user: user,
                });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      
      removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )
          .then((user) => {
            !user
              ? res.status(404).json({ message: "No user with that Id exists" })
              : res.json({
                  message: "Friend removed successfully 🎉",
                  user: user,
                });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    };
module.exports = UserController;
