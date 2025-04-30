const Progress = require('../models/Progress');
const Module = require('../models/Module');
const getAchievements = require('../utils/achievements');

exports.updateProgress = async (req, res, next) => {
  try {
    const { levelId, moduleIndex, completionStatus, timeSpent, userNotes } = req.body;
    const userId = req.user.id;
    console.log(userId)

    if (typeof levelId != 'number' || typeof moduleIndex != 'number') {
      return res.status(400).json({ error: "levelIndex and moduleIndex must be numbers" });
    }

    const module = await Module.findOne({ levelIndex : levelId, moduleIndex });
    if (!module) {
      return res.status(404).json({ error: "Module not found for given levelIndex and moduleIndex" });
    }

    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = new Progress({ userId });
    }

    // Sequential check
    const lastLevel = progress.previousLevel;
    const lastModule = progress.previousModule;

    if (
      levelId < lastLevel ||
      (levelId === lastLevel && moduleIndex <= lastModule)
    ) {
      return res.status(400).json({ error: "You already completed this or previous module" });
    }

    // Fetching all modules in ordered way
    const allModules = await Module.find({}).sort({ levelIndex: 1, moduleIndex: 1 });
   console.log(allModules)
   
    // Finding index of last completed module and this module
    const lastCompletedIndex = allModules.findIndex(
      m => m.levelIndex === lastLevel && m.moduleIndex === lastModule
    );
    const currentIndex = allModules.findIndex(
      m => m.levelIndex === levelId && m.moduleIndex === moduleIndex
    );

    if (currentIndex !== lastCompletedIndex + 1) {
      return res.status(400).json({
        error: "Invalid module access: you must complete previous modules in order"
      });
    }
    if (completionStatus) {
      progress.previousLevel = levelId;
      progress.previousModule = moduleIndex;
    }

    // Completion calculations
    const totalModules = allModules.length;
    const completedModules = currentIndex + 1;
    const overallCompletion = parseFloat(((completedModules / totalModules) * 100).toFixed(2));
    progress.overallCompletion = overallCompletion;

    const levelModules = allModules.filter(m => m.levelIndex === levelId);
    const completedInLevel = levelModules.filter(
      m => m.levelIndex < levelId || (m.levelIndex === levelId && m.moduleIndex <= moduleIndex)
    ).length;
    const currentLevelProgress = parseFloat(((completedInLevel / levelModules.length) * 100).toFixed(2));

    // Achievements
    progress.achievements = getAchievements(overallCompletion);
    progress.updatedAt = new Date();
    await progress.save();

    // Find next module
    const nextModule = allModules[currentIndex + 1];

    res.status(200).json({
      message: 'Progress updated successfully',
      currentLevelProgress,
      overallCompletion,
      nextRecommendedModule: nextModule
        ? {
            levelIndex: nextModule.levelIndex,
            moduleIndex: nextModule.moduleIndex,
            title: nextModule.title
          }
        : null,
      achievementsUnlocked: progress.achievements,
      updatedAt: progress.updatedAt
    });
  } catch (err) {
    console.error("Error updating progress:", err);
    res.status(500).json({ error: "Server error while updating progress" });
  }
};
