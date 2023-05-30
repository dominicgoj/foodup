const calculateLevel = (points) => {
    const levels = [
      { level: 0, minPoints: 0, maxPoints: 9 },
      { level: 1, minPoints: 10, maxPoints: 19 },
      { level: 2, minPoints: 20, maxPoints: 39 },
      { level: 3, minPoints: 40, maxPoints: 69 },
      { level: 4, minPoints: 70, maxPoints: 119 },
      { level: 5, minPoints: 120, maxPoints: 199 },
      { level: 6, minPoints: 200, maxPoints: 319 },
      { level: 7, minPoints: 320, maxPoints: 479 },
      { level: 8, minPoints: 480, maxPoints: 699 },
      { level: 9, minPoints: 700, maxPoints: 999 },
      { level: 10, minPoints: 1000, maxPoints: Infinity },
    ];
  
    let currentLevel = 0;
    let remainingPoints = 0;
    let nextLevel = 0;
    let currentMinPoints = 0;
    let currentMaxPoints = 0;
    
    for (let i = 0; i < levels.length; i++) {
      const { level, minPoints, maxPoints } = levels[i];
      if (points >= minPoints && points <= maxPoints) {
        currentLevel = level;
        remainingPoints = maxPoints - points + 1;
        nextLevel = currentLevel + 1;
        currentMinPoints = minPoints;
        currentMaxPoints = maxPoints;
        break;
      }
    }
    
  
    return { level: currentLevel, remainingPoints, nextLevel, currentMinPoints, currentMaxPoints, levels };
  };
  
  export default calculateLevel;
  