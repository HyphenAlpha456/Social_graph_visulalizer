const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User'
    },
   
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    friendCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


UserSchema.pre('save', async function() {
    if (this.friends) {
        this.friendCount = this.friends.length;
    }
});


module.exports = mongoose.models.User || mongoose.model('User', UserSchema);