// controllers/moduleController.js
const Module = require("../models/Module");
const Level = require("../models/Level");

exports.addModuleToLevel = async (req, res) => {
  try {
    const { levelIndex, moduleIndex, title } = req.body;

    if (levelIndex === undefined || moduleIndex === undefined || !title) {
      return res.status(400).json({
        error: "levelIndex, moduleIndex, and title are required",
      });
    }

    // ✅ Find or create level
    let level = await Level.findOne({ levelIndex });
    if (!level) {
      level = new Level({
        levelIndex,
        title: `Level ${levelIndex}`,
        modules: [],
      });
      await level.save();
    }

    // ✅ Check if module already exists for the level
    const existingModule = await Module.findOne({ levelIndex, moduleIndex });
    if (existingModule) {
      return res.status(409).json({
        error: `Module ${moduleIndex} already exists in level ${levelIndex}`,
      });
    }

    // ✅ Create and save the module
    const module = new Module({ levelIndex, moduleIndex, title });
    await module.save();

    // ✅ Attach module to level and save
    level.modules.push(module._id);
    await level.save();

    res.status(201).json({
      message: "Module created and linked to level",
      module,
    });
  } catch (err) {
    console.error("Add module error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
