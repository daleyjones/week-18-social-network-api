const { User } = require('../models');

const UserController =  {
    //get all the users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err))
    },
    //get a single user by id
    getUserById(req, res) {
        User.findById(req.params.userId)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    //create a user
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    //update user by id
     updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },
    //delete user by id
    deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json({ message: 'User deleted successfully' });
                })
                .catch(err => res.status(500).json(err));
    },
    //add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId} },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },
    //remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true },
        )
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user with this id!" });
                }
                //making sure the friend if removed
                const kicked = !dbUserData.friends.includes(params.friendId);
                
                if(kicked) {
                    res.json({ message: "Friend Kicked Out of Your List", dbUserData });
                } else {
                    res.json(dbUserData);
                }
            })
            .catch((err) => res.status(400).json(err));
    }
}

module.exports = UserController