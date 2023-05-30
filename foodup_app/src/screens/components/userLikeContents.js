import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import UserLikeContentTextbox from "./userLikeContentTextbox";
import ModalView from "./modalView";
import CommentContent from './commentDetail.js'
import NoContent from "./nocontent";
import fetchData from "../../api/fetchData";
import filterHexId from "../../utilities/filterHexId";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt.js'
import updateUserNotification from '../../api/updateUserNotification'
import AuthContext from "../../utilities/authcontext";
import { RefreshControl } from "react-native-gesture-handler";

import { Colors } from '../../styles/colors'
export default UserLikeContents = ({ likesAssociatedWithUser,
  userinfo, userNotifications, posts, postsByHex }) => {
  const nocontentText = "Du hast aktuell keine Neuigkeiten."
  const type_like = "like"
  const type_restaurant_post = "restaurant_post"
  const [visibleDatasetSortedNotification, setVisibleDatasetSortedNotification] = useState([])
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const authContext = useContext(AuthContext)
  const [renderSelectBoxes, setRenderSelectBoxes] = useState(false)
  const [visibleItems, setVisibleItems] = useState(10);
  const itemsToLoad = 10; 

  const sortVisibleNotifications = () => {
    const visible_dataset_likes = filterHexId(userNotifications, likesAssociatedWithUser, type_like)
    const visible_dataset_postsByHex = filterHexId(userNotifications, postsByHex, type_restaurant_post)
    const visible_notification_dataset = [...visible_dataset_likes, ...visible_dataset_postsByHex];
    const visible_sorted_notification_dataset = visible_notification_dataset.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setVisibleDatasetSortedNotification(visible_sorted_notification_dataset)
  }
  
  useEffect(()=>{
    sortVisibleNotifications()
  }, [])

  const handleOpenPost = async (postselected) => {
    const selected_comment_id = postselected
    const request_string = "/post/" + selected_comment_id
    const request = await fetchData(request_string)
    
    setSelectedPost({ "post": request })
    setShowModal(!showModal)
  }

  const triggerModalView = () => {
    setShowModal(!showModal)
  }

  useEffect(()=>{
  }, [visibleDatasetSortedNotification])


  const handleSelectNotification = (notificationId) => {
    const isSelected = selectedNotifications.includes(notificationId);
    if (isSelected) {
      setSelectedNotifications((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== notificationId)
      );
    } else {
      setSelectedNotifications((prevSelected) => [...prevSelected, notificationId]);
    }
  };

  const handleSetRenderSelectBoxes = () => {
    setRenderSelectBoxes(true)
  }


  const handleLocalUpdateOfUserNotifications = (selectedHexIdentifiers, userNotifications) => {
    const updatedUserNotifications = userNotifications.map((notification) => {
      if (selectedHexIdentifiers.includes(notification.hex_identifier)) {
        return {
          ...notification,
          visible: false,
        };
      }
      return notification;
    });

    return updatedUserNotifications
  }

  const setSelectedNotificationsInvisible = () => {
    const selectedHexIdentifiers = selectedNotifications.map((selectedId) => {
      const selectedItem = visibleDatasetSortedNotification.find((item) => item.id === selectedId);
      
      return selectedItem ? selectedItem.hex_identifier : null;
    });

    updateUserNotification(userinfo, selectedHexIdentifiers)
    const updatedUserNotifications = handleLocalUpdateOfUserNotifications(selectedHexIdentifiers, userNotifications)
    authContext.setUserNotifications(updatedUserNotifications)
    resetAllStates()
    navigation.navigate("UserContent")
  };

  const resetAllStates = () => {
    setShowModal(false)
    setSelectedPost({})
    setSelectedNotifications([])
    setRenderSelectBoxes(false)
  }

  const renderItem = ({ item }) => (
    <UserLikeContentTextbox
      key={item.id}
      content={item}
      userinfo={userinfo}
      handleOpenPost={handleOpenPost}
      type_like={type_like}
      type_restaurant_post={type_restaurant_post}
      isSelected={selectedNotifications.includes(item.id)}
      handleSelectNotification={handleSelectNotification}
      handleSetRenderSelectBoxes={handleSetRenderSelectBoxes}
      renderSelectBoxes={renderSelectBoxes}
    />
  );
  const loadMoreItems = () => {
  setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsToLoad);
  };
  
  return (
    <View style={{ marginTop: 10, flex: 1 }}>
      {visibleDatasetSortedNotification.length > 0 ? (
        <FlatList
          data={visibleDatasetSortedNotification.slice(0, visibleItems)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl onRefresh={authContext.handleGlobalRefresh} />}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      ) : (
        <NoContent headerText={nocontentText} />
      )}

      {showModal ? (
        <ModalView modalContent={<CommentContent userinfo={userinfo} post={selectedPost} triggerModalView={triggerModalView} />} onClose={() => setShowModal(false)} />
      ) : null}

      {selectedNotifications.length > 0 ? (
        <TouchableOpacity onPress={setSelectedNotificationsInvisible}>
          <View style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30 }}>
            <FontAwesomeIcon icon={faTrashAlt} size={28} style={Colors.tertiaryText} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );

}
