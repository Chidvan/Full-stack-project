const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
}, 
// Hashed
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
});

module.exports = mongoose.model('User', UserSchema);
