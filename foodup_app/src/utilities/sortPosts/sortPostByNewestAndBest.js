export default sortPostByNewestAndBest = (posts) => {
    return posts.sort((a, b) => {
        if (a.rating !== b.rating) {
          return b.rating - a.rating; // Sort by highest rating
        }
        return new Date(b.created_at) - new Date(a.created_at); // Sort by most recent post
      });
}