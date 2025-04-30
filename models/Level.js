// models/Level.js
const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  levelIndex: { type: Number, required: true, unique: true }, // Use 'levelIndex' consistently & make it unique
  title: { type: String },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],

});

module.exports = mongoose.model("Level", LevelSchema);
