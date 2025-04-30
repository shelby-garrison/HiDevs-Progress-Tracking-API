const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    listing: { type: Number },
    moduleIndex: { type: Number, required: true },
    levelIndex: { type: Number, required: true },
    title: {type: String, required: true},
});

ModuleSchema.index({ levelIndex: 1, moduleIndex: 1 }, { unique: true });


module.exports = mongoose.model('Module', ModuleSchema);
