const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); 

dotenv.config();

const TOTAL_USERS = 50;
const MAX_FRIENDS = 5;

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

       
        await User.deleteMany({});
        console.log('Old data cleared.');

       
        let users = [];
        const roles = ['Developer', 'Designer', 'Product Manager', 'Data Scientist', 'CTO'];
        
        for (let i = 0; i < TOTAL_USERS; i++) {
            users.push(new User({
                name: `User ${i + 1}`,
                role: roles[Math.floor(Math.random() * roles.length)],
                friends: [],
                friendCount: 0
            }));
        }

        const savedUsers = await User.insertMany(users);
        console.log(`${savedUsers.length} users created.`);

       
        for (let user of savedUsers) {
            
            const numberOfFriends = Math.floor(Math.random() * MAX_FRIENDS) + 1;
            
            for (let j = 0; j < numberOfFriends; j++) {
                const randomFriend = savedUsers[Math.floor(Math.random() * savedUsers.length)];

               
                if (randomFriend._id.toString() !== user._id.toString() && !user.friends.includes(randomFriend._id)) {
                    
                    
                    user.friends.push(randomFriend._id);
                    user.friendCount++;

                    
                    const friendDoc = savedUsers.find(u => u._id.toString() === randomFriend._id.toString());
                    if (!friendDoc.friends.includes(user._id)) {
                        friendDoc.friends.push(user._id);
                        friendDoc.friendCount++;
                    }
                }
            }
        }

       
        await Promise.all(savedUsers.map(u => u.save()));
        console.log('Random friendships established.');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();