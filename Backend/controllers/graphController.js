const User = require('../models/user');
const { biDirectionalBFS } = require('../utils/graphAlgorithms');


const getShortestPath = async (req, res) => {
    try {
        const { startId, endId } = req.params;
        const path = await biDirectionalBFS(startId, endId);
        
        if (!path) {
            return res.status(404).json({ message: "No connection found." });
        }

       
        const fullPath = await User.find({ _id: { $in: path } }).select('name role');
        
        
        const orderedPath = path.map(id => fullPath.find(u => u._id.toString() === id));

        res.json(orderedPath);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getRecommendations = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('friends');
        
        if (!user) return res.status(404).json({ message: "User not found" });

        const myFriendsIds = new Set(user.friends.map(f => f._id.toString()));
        let candidates = {};

      
        for (const friend of user.friends) {
            const friendDoc = await User.findById(friend._id).select('friends friendCount');
            
           
            const scoreIncrement = 1 / Math.log(friendDoc.friendCount + 1); // +1 avoids div by zero

            for (const candidateId of friendDoc.friends) {
                const cIdStr = candidateId.toString();

              
                if (cIdStr === userId || myFriendsIds.has(cIdStr)) continue;

                if (!candidates[cIdStr]) candidates[cIdStr] = 0;
                candidates[cIdStr] += scoreIncrement;
            }
        }

        
        const sortedCandidates = Object.entries(candidates)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA) // Descending
            .slice(0, 10); 

        
        const recommendationDetails = await Promise.all(
            sortedCandidates.map(async ([id, score]) => {
                const u = await User.findById(id).select('name role');
                return { ...u.toObject(), score };
            })
        );

        res.json(recommendationDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getShortestPath, getRecommendations };