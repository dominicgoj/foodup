import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../utilities/authcontext";
import { View, Text, StyleSheet } from "react-native";
import Feed from "./feed";
import SearchBar from "./searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TooltipStyles from "../../styles/tooltipStyles";
import { Colors } from "../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import storeCookies from "../../utilities/storecookies";
import getCookies from "../../utilities/getCookies";
import { useNavigation } from "@react-navigation/native";
export default HomeScreen = ({route}) => {
    const authContext = useContext(AuthContext)
    const [showToolTip, setShowToolTip] = useState(false)
    const [showTutorialBoxHomeScreen, setShowTutorialBoxHomeScreen] = useState(false)
    const navigation = useNavigation()

    useEffect(()=>{
        const checkTooltipsOn = async () => {
            try {
              const cookies = await getCookies();
              
              if (cookies && cookies.tooltipsOn) {
                setShowToolTip(true)
              } else {
                console.log('Tooltips are disabled');
                setShowToolTip(false)
              }
            } catch (error) {
              console.log('Error checking tooltips:', error);
            }
          };
          checkTooltipsOn()
    }, [])
    const handleSetShowTooltip = async () => {
        try {
            const cookies = await getCookies();
            if (cookies) {
              const updatedCookies = {
                ...cookies,
                tooltipsOn: false,
              };
              console.log("update cookies to: ", updatedCookies)
              await storeCookies(updatedCookies);
              console.log('Tooltips updated to false');
            } else {
              console.log('Cookies not found');
            }
          } catch (error) {
            console.log('Error updating tooltips:', error);
          }
    }
    const handleSetAllToolTipsFalse = () => {
        setShowToolTip(false)
        setShowTutorialBoxHomeScreen(false)
    }
    const handleShowTutorial = () => {
    setShowTutorialBoxHomeScreen(true)
    setShowToolTip(false)
    }
    const handleShowTutorialGoToCam = () => {
      
    }
    
    const RenderTutorialBoxHomeScreen = () => {
        
        return(
            
                <View style={[TooltipStyles.homeScreenToolTipBox, Colors.secondaryBackground]}>
                    <TouchableOpacity onPress={handleSetAllToolTipsFalse} >
                    <View style={TooltipStyles.homeScreenToolTipBoxCancelBox}>
                        <FontAwesomeIcon icon={faXmark} size={20} color={"white"}/>
                        </View>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={handleShowTutorialGoToCam}>
                    <Text style={TooltipStyles.homeScreenToolTipHeader}>Feed für Dich, {authContext.loggedInUserData?.username}! </Text>
                    <Text style={[TooltipStyles.homeScreenToolTipText, {paddingTop: 15}]}>
                        Hier siehst du die neuesten Bewertungen von Lokalen in Deiner Nähe.</Text>
                        <Text style={[TooltipStyles.homeScreenToolTipText, {paddingTop: 15}]}>Klicke unten auf Beitrag posten.</Text>
                    
                    </TouchableOpacity>
                    </View>
            
        )
    }

    const RenderTooltip = () => {
        return(
            <View style={[TooltipStyles.homeScreenToolTipBox, Colors.secondaryBackground]}>
            <TouchableOpacity onPress={() => {
            handleSetShowTooltip();
            handleSetAllToolTipsFalse();
            }}>
            <View style={TooltipStyles.homeScreenToolTipBoxCancelBox}>
                <FontAwesomeIcon icon={faXmark} size={20} color={"white"}/>
                </View>
                </TouchableOpacity>
            <TouchableOpacity onPress={handleShowTutorial}>
            <Text style={TooltipStyles.homeScreenToolTipHeader}>Willkommen bei Foodup, {authContext.loggedInUserData?.username}! </Text>
            <Text style={[TooltipStyles.homeScreenToolTipText, {paddingTop: 15}]}>
                Klicke um eine kurze Führung durch die App zu erhalten!</Text>
            </TouchableOpacity>
            </View>
)
    }
    return(
        <View>
            
            <View style={styles.container}>
            <SearchBar />
            </View>
            <View style={{zIndex:-1}}>
            <Feed />
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    headerGreeting: {
        fontSize: 16,
        paddingBottom: 10,
    },
    container: {
        
        paddingBotom: 10,
        height: 60,
        
    }
})