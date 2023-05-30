import COOL_OFF from '../../postcooloff'
export default calculateNextPostTime = (lastPostCreatedAt) => {

  const now = new Date();
  const lastPostTime = new Date(lastPostCreatedAt);

  const remainingTime = COOL_OFF - (now - lastPostTime);
  const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  return {
    days,
    hours,
  };
};


