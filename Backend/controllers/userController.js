const User = require('../models/user');


const createUser = async (req, res) => {
    try {
        const { name, role } = req.body;
        const user = await User.create({ name, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('name role friends friendCount');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        if (userId === friendId) {
            return res.status(400).json({ message: "Cannot add self as friend" });
        }

       
        await User.findByIdAndUpdate(userId, { 
            $addToSet: { friends: friendId },
            $inc: { friendCount: 1 }
        });
        
        await User.findByIdAndUpdate(friendId, { 
            $addToSet: { friends: userId },
            $inc: { friendCount: 1 }
        });

        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, getAllUsers, addFriend };