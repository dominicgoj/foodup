import React from "react";
import getUserLoginInfo from "../../utilities/retrieveloggedin";
import getUserPosts from "../../utilities/getUserPosts";
import getUserLikes from "../../utilities/getUserLikes";
import fetchRestaurantData from "../../api/fetchRestaurantData";
const RefreshContext = React.createContext({
  
    onRefresh: () => {
    const [userLoggedIn, setUserLoggedIn] = useState(null)
    const [userLikes, setUserLikes] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const [refreshing, setRefreshing] = useState(false);
    const [restaurantData, setRestaurantData] = useState(null)
  
    const onRefresh = () => {
      setRefreshing(true);
      // Perform the necessary actions to refresh the screen or fetch new data
      gatherAllDataFromUser()
        .then(() => {
          setRefreshing(false);
        })
        .catch((error) => {
          console.error(error);
          setRefreshing(false);
        });
    };
  
    useEffect(()=>{
        onRefresh()
      },[])
  
    const gatherAllDataFromUser = async () => {
      const userinfo = await getUserLoginInfo()
      const userposts = await getUserPosts(userinfo.id)
      const userlikes = await getUserLikes(userinfo.id)
      const restaurants = await fetchRestaurantData()
      
      setUserLoggedIn(userinfo)
      setUserPosts(userposts)
      setUserLikes(userlikes)
      setRestaurantData(restaurants)
      
      
    }
    }
    

});

export default RefreshContext;