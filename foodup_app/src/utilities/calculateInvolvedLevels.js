
export default calculateInvolvedLevels = (startPoints, endPoints) => {
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
    const involvedLevels = [];
  
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      if (startPoints <= level.maxPoints && endPoints >= level.minPoints) {
        involvedLevels.push({ ...level, shown: false });
      }
    }
  
    return involvedLevels;
  };
  

  
  
  
  