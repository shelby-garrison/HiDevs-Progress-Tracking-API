const getAchievements = (overallCompletion) => {
    const achievements = [];

    if (overallCompletion >= 25) achievements.push("Quarter Way There!");
    if (overallCompletion >= 50) achievements.push("Halfway Hero!");
    if (overallCompletion >= 75) achievements.push("Almost There!");
    if (overallCompletion === 100) achievements.push("Roadmap Master!");

    return achievements;
};

module.exports = getAchievements;
