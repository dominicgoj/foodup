import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Linking,
} from "react-native";
import { commonStyles } from "../../styles/commonstyles";
import Icon from "react-native-vector-icons/Entypo";
import ImageList from "./imageList.js";
import RenderStars from "./renderstars";
import getRestaurantPosts from "../../api/getRestaurantPosts";
import { RestaurantDetailViewStyles } from "../../styles/restaurantDetailViewStyles";

const RestaurantDetail = ({ route }) => {
  const { restaurant } = route.params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getRestaurantPosts(restaurant.id, {
        active: "true",
      });
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <ScrollView>
      <View style={RestaurantDetailViewStyles.detailheader}>
        <Image
          style={RestaurantDetailViewStyles.headerimage}
          source={{ uri: restaurant.title_image }}
        />
      </View>
      <View style={RestaurantDetailViewStyles.container}>
        <Text style={commonStyles.restaurantTitleDetailView}>
          {restaurant.restaurant_name}
        </Text>
        <View style={RestaurantDetailViewStyles.ratingBox}>
          <RenderStars rating={restaurant.average_rating} />
        </View>
        <View style={{ marginTop: 20 }}>
          <ImageList posts={posts} />
        </View>
        <View style={RestaurantDetailViewStyles.rowWebIcons}>
          {restaurant.website ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(restaurant.website);
              }}
            >
              <Text style={RestaurantDetailViewStyles.webIcon}>.com</Text>
            </TouchableOpacity>
          ) : null}
          {restaurant.instagram ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(restaurant.instagram);
              }}
            >
              <Icon
                style={RestaurantDetailViewStyles.socialmediaIcons}
                name="instagram"
              />
            </TouchableOpacity>
          ) : null}
          {restaurant.facebook ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(restaurant.facebook);
              }}
            >
              <Icon
                style={RestaurantDetailViewStyles.socialmediaIcons}
                name="facebook"
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${restaurant.telephone}`);
            }}
          >
            <Icon
              style={RestaurantDetailViewStyles.socialmediaIcons}
              name="phone"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`mailto:${restaurant.email}`);
            }}
          >
            <Icon
              style={RestaurantDetailViewStyles.socialmediaIcons}
              name="mail"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default RestaurantDetail;
