const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// GET all users and POST a new user
router.route('/').get(getAllUsers).post(createUser);

// GET a user by ID, PUT to update user, and DELETE a user by ID
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// POST to add a friend and DELETE to remove a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
