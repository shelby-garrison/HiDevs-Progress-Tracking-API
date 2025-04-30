const mongoose = require('mongoose');


const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    overallCompletion: { type: Number, default: 0 },
    achievements: [{ type: String }],
    previousLevel: {type: Number, default:0},
    previousModule: {type: Number, default:0},
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', ProgressSchema);
