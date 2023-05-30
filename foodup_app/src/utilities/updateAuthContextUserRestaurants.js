
export default updateAuthContextUserRestaurants = (authcontext, newRestaurant) => {
    const updatedUserRestaurants = authcontext.userRestaurants.map(obj => {
        if (obj.id === newRestaurant.id) {
          return newRestaurant; // Replace the object with the matching ID
        }
        return obj; // Keep the existing object
      });
    return updatedUserRestaurants
}