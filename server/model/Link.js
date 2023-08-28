const mongoose = require('mongoose');
const {Schema} = mongoose;

const linkSchema = new mongoose.Schema({
    platform: {
        type: String,
        enum: ['github', 'youtube', 'twitter', 'other'],
        required: true
    },
    textURL: {
        type: String,
        required:true
    }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;