const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, addFriend } = require('../controllers/userController');
const { getShortestPath, getRecommendations } = require('../controllers/graphController');


router.post('/', createUser);
router.get('/', getAllUsers);
router.post('/add-friend', addFriend);


router.get('/path/:startId/:endId', getShortestPath);
router.get('/recommendations/:userId', getRecommendations);

module.exports = router;