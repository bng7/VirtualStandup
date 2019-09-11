const mongoose = require('mongoose');

const teamMemberSchema = mongoose.Schema({
    name: { type: String}
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);