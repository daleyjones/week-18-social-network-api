const router =  require('express').Router()

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

//GET and POST all users
router.route('/').get(getAllUsers).post(createUser);

//GET user is, PUT update user id, DELETE user by id
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

//POST add friend and DELETE remove friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;