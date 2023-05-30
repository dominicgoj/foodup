
export default calculatePointsIncrease = (userposts) => {
    if(userposts.length<2){
        return 10
    }else{

    
    const datetime_sorted_userposts = userposts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const latestPost = datetime_sorted_userposts[0];
    const postBeforeLatest = datetime_sorted_userposts[1];

    // Calculate time difference between latestPost and postBeforeLatest
    const timeDifference = Math.abs(
        new Date(latestPost.created_at) - new Date(postBeforeLatest.created_at)
    );

    // Calculate points increase based on time difference
    let pointsIncrease = 0;
    if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
        pointsIncrease = 15;
    } else if (timeDifference >= 7 * 24 * 60 * 60 * 1000 && timeDifference < 12 * 24 * 60 * 60 * 1000) {
        pointsIncrease = 10;
    } else if (timeDifference >= 12 * 24 * 60 * 60 * 1000 && timeDifference < 15 * 24 * 60 * 60 * 1000) {
        pointsIncrease = 5;
    } else if (timeDifference >= 15 * 24 * 60 * 60 * 1000 && timeDifference < 30 * 24 * 60 * 60 * 1000) {
        pointsIncrease = 2;
    } else {
        pointsIncrease = 3;
    }

    return pointsIncrease

    }
    

    
}