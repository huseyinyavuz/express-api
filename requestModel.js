var mongoose = require('mongoose');

var recordsSchema = mongoose.Schema({
    key: String,
    createdAt: Date,
    counts: [Number]
});

module.exports = mongoose.model('records', recordsSchema);