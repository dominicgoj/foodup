import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CommentDetail from "./commentDetail";
import CostumHeader from "./costumheader";
import { useNavigation } from "@react-navigation/native";
import getRestaurantPosts from "../../api/getRestaurantPosts";
import AuthContext from "../../utilities/authcontext";
import { FlatList } from "react-native";
import infomsg from "../../data/infomsg.json";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../styles/colors";
export default Feed = ({ route }) => {
  const authcontext = useContext(AuthContext);
  const navigation = useNavigation();
  const restaurantIds = authcontext.restaurantIds;
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [headerTextOfStack, setHeaderTextOfStack] = useState("");
  const [costumHeaderBool, setCostumHeaderBool] = useState(false);
  const [startingIndex, setStartingIndex] = useState(0);

  useEffect(() => {
    
    const checkIfCameFromRoute = async () => {
      
      if (route) {
        setPosts(route.params.posts);
        setSelectedPost(route.params.selectedPost);
        setHeaderTextOfStack(route.params.headerTextOfStack);
        setCostumHeaderBool(route.params.costumHeaderBool);
        setStartingIndex(route.params.selectedPost.index);
      } else {
        
        const posts = await getRestaurantPosts(restaurantIds);
        
        const datetime_sorted_posts = posts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPosts(datetime_sorted_posts);
      }
    };

    checkIfCameFromRoute();
  }, [authcontext.handleGlobalRefresh]);

  const commentHeight = 600;
  const offset = startingIndex * commentHeight;

  const flatListRef = useRef(null);

  useEffect(() => {
    const conditionalSetCostumHeader = () => {
      if (costumHeaderBool) {
        navigation.setOptions({
          header: () => (
            <CostumHeader arrowShown={true} logoShown={false} headerText={headerTextOfStack} />
          ),
        });
      }
    };

    conditionalSetCostumHeader();
  });

  const RenderNoPosts = () => {
    return (
      <View style={styles.noRestaurantsContainer}>
        <Text style={styles.noRestaurantsText}>
          {infomsg["no-posts-available"]?.title || ""}
        </Text>
        <Text style={styles.noRestaurantsSubtitleText}>
          {infomsg["no-posts-available"]?.subtitle || ""}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <CommentDetail key={item.id} post={{ post: item }} commentHeight={commentHeight} />
  );

  useEffect(() => {
    if (flatListRef.current && startingIndex >= 0) {
      setTimeout(() => flatListRef.current.scrollToIndex({ index: startingIndex, animated: true }), 200)
      
    }
  }, [startingIndex]);

  return (
    <View>
      {posts.length < 1 ? (
        <View style={{ flexGrow: 1, paddingTop: 100, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={Colors.secondaryText.color} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: commentHeight,
            offset: commentHeight * index,
            index,
          })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noRestaurantsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
  },
  noRestaurantsText: {
    fontSize: 24,
    textAlign: "center",
    color: "#424242",
    paddingBottom: 20,
  },
  noRestaurantsSubtitleText: {
    fontSize: 16,
    textAlign: "center",
    color: "#424242",
  },
});
