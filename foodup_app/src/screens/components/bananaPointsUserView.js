import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from "react-native";
import BananaIcon from "./bananaComponent";
import AnimateNumber from 'react-native-countup';
import ProgressBar from "./progressBar";
import calculateLevel from "../../utilities/calculateLevel";
import { Colors } from "../../styles/colors";
import calculateNextPostTime from "../../utilities/calculateNextPostTime";
import calculateInvolvedLevels from "../../utilities/calculateInvolvedLevels";

export default BananaPointsUserView = ({ userinfo, userPosts, increasedPoints, triggerModalView }) => {
    
    const pulseAnimation = useRef(new Animated.Value(1)).current;
    const [level, setLevel] = useState(0)
    const [nextPostPossible, setNextPostPossible] = useState({"days": 0, "hours": 0})
    const [userHasNoPosts, setUserHasNoPosts] = useState(false)
    const [partyEmojiPuls, setPartyEmojiPuls] = useState(true)
    const [progressBarMaxValue, setProgressBarMaxValue] = useState(0)
    const [involvedLevels, setInvolvedLevels] = useState([])
    
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [levelLabel, setLevelLabel] = useState(0)
    const [progressBarValue, setProgressBarValue] = useState(0)
    const partyEmoji = String.fromCodePoint(0x1F389);
    const starEmoji = String.fromCodePoint(0x2B50);
    const slideAnimationCooloffCounter = useRef(new Animated.Value(0)).current;
    const [countByValue, setCountByValue] = useState(1)
    const [amountOfAnimations, setAmountOfAnimations] = useState(0)

    const decimals = 2; // Number of decimals to round
    const [progress, setProgress] = useState(0)
    
    
    useEffect(() => {
        Animated.timing(slideAnimationCooloffCounter, {
          toValue: 1,
          duration: 700, // Adjust the duration as per your preference
          easing: Easing.easeOut,
          useNativeDriver: true,
        }).start();
      }, []);
    
      const slideInStyles = {
        transform: [
          {
            translateY: slideAnimationCooloffCounter.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0],
            }),
          },
        ],
      };
    useEffect(()=>{
      const updateProgress = () => {
        setLevel(calculateLevel(userinfo.banana_points))
        setInvolvedLevels(calculateInvolvedLevels(userinfo.banana_points-increasedPoints, userinfo.banana_points))        
      }
      
      
      
      
        if(userPosts.length>0){
            const datetime_sorted_userposts = userPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setNextPostPossible(calculateNextPostTime(datetime_sorted_userposts[0].created_at))
        }else{
            setUserHasNoPosts(true)
        }

        const calculateSetCountByValue = () => {
            if(userinfo.banana_points>40){
                setCountByValue(Math.round(userinfo.banana_points/40))
            }
        }
        
        calculateSetCountByValue()
        updateProgress()
        
    }, [])

    useEffect(()=>{
      if(userinfo.banana_points!=0){
        setProgress(Math.round(((userinfo.banana_points - level.currentMinPoints) / (level.currentMaxPoints - level.currentMinPoints)) * 100))
      }
    }, [level])
    const RenderCoolOffBox = () => {
      
        return(
          <TouchableOpacity onPress={triggerModalView}>
            <Animated.View style={[styles.reminderContainer, slideInStyles, Colors.secondaryBackground]}>
                {userPosts.length>0?<RenderCoolOffContent/>:<RenderNoPosts />}
            </Animated.View>
            </TouchableOpacity>
        )
    }

    const RenderNoPosts = () => {
        return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.reminderWhiteBoldText}>Schade!</Text>
      <Text style={styles.reminderText}>Du hast bisher noch nichts gepostet.</Text>
    
    </View>
        )
    }
    const RenderCoolOffContent = () => {
        return(
            <View style={{justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.reminderText}>Mach</Text>
      <Text style={styles.reminderWhiteBoldText}>
        WEITER SO!
      </Text>
     
    
    </View>
        )
    }
    
    const handleSetNewValuesForBar = () => {  
      
      
      if(increasedPoints!=0){
        
          if(currentLevelIndex===involvedLevels.length-1){
            
          const actualLevel = calculateLevel(userinfo.banana_points)
          setLevelLabel(actualLevel.level, actualLevel.currentMinPoints)
          setProgressBarValue(userinfo.banana_points-actualLevel.currentMinPoints)
          setProgressBarMaxValue(actualLevel.currentMaxPoints-actualLevel.currentMinPoints)
          
          }
          else if(currentLevelIndex<involvedLevels.length-1){
          
          setLevelLabel(involvedLevels[currentLevelIndex].level)
          setProgressBarValue(involvedLevels[currentLevelIndex].maxPoints)
          setProgressBarMaxValue(involvedLevels[currentLevelIndex].minPoints)
          }
      }else{
        
        const actualLevel = calculateLevel(userinfo.banana_points)
        setLevelLabel(actualLevel.level)
        setProgressBarValue(userinfo.banana_points-actualLevel.currentMinPoints)
        setProgressBarMaxValue(actualLevel.currentMaxPoints-actualLevel.currentMinPoints) 
        
      }
    }
    useEffect(()=>{
    }, [involvedLevels])


    useEffect(()=>{
      if(amountOfAnimations<involvedLevels.length){
        
        handleSetNewValuesForBar()
        incrementLevelIndex()
      }
      

    },[amountOfAnimations, involvedLevels])

    handleIncrementAmountOfAnimations = () => {
      setAmountOfAnimations(amountOfAnimations+1)
    }
    const incrementLevelIndex = () => {
      setCurrentLevelIndex((prevIndex) => prevIndex + 1);
    };

    useEffect(() => {
      if (partyEmojiPuls) {
        startPulseAnimation();
      } else {
        resetPulseAnimation();
      }
    }, [partyEmojiPuls]);

    const resetPulseAnimation = () => {
      pulseAnimation.stopAnimation();
      pulseAnimation.setValue(1);
    };
  
    const startPulseAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.17,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ).start();
    };
  return (
    <View>
     <View style={styles.headerTextContainer}>
     <Text style={styles.headerText}>{starEmoji}</Text>
      {involvedLevels.length > 1 ? (
        <Text style={styles.headerText}>
          AUFSTIEG!
        </Text>
      ) : (
        <Text style={styles.headerText}>
          DEIN SCORE 
        </Text>
      )}
      <Text style={styles.headerText}>{starEmoji}</Text>
    </View>
      <View style={styles.bananaIconContainer}>
        <BananaIcon width={128} height={128} />
        <View style={styles.pointsTextContainer}>
        <AnimateNumber value={userinfo.banana_points} countBy={countByValue} timing={"easeIn"}
        style={styles.pointsText}/>
          <Text>Bananen</Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <Text style={{fontWeight:'bold'}}>{progress}%</Text>
      <ProgressBar value={progressBarValue} 
      maxValue={progressBarMaxValue} 
      handleIncrementAmountOfAnimations={handleIncrementAmountOfAnimations}
      amountOfAnimations={amountOfAnimations}
      involvedLevels = {involvedLevels}
      
     />
      <View style={{flexDirection:'row'}}>
      <Text style={styles.levelText}>Level {levelLabel} </Text>
      {involvedLevels.length>1?(
        <Animated.Text
        style={[
          styles.levelText,
          {
            transform: [{ scale: pulseAnimation }],
          },
        ]}
      >
        {partyEmoji}
      </Animated.Text>
      ):(null)}
      
    </View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
      <Text style={styles.regularText}>Noch </Text>
      <Text style={styles.boldPointsTextLevel}>{level.remainingPoints} Punkte</Text>
      <Text style={styles.regularText}> bis zu </Text>
      <Text style={styles.boldPointsTextLevel}>Lvl. {level.nextLevel}</Text>
      </View>
      </View>
        <RenderCoolOffBox />
    </View>
  );
};

const styles = StyleSheet.create({
  bananaIconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTextContainer: {
    
    padding: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#faab14',
    margin: 30,
    flexDirection: 'row',
    justifyContent:'space-between'
    
  },
  headerText: {
    fontSize: 24,
    color: '#faab14',
    fontWeight: 'bold'
  },
  pointsTextContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#faab14',
    fontSize: 48,
  },
  progressBarContainer:{
    marginLeft: 20, 
    marginRight: 20,
    marginTop: 20,
    
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15
  },
  reminderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 40,
    borderRadius: 10,
    shadowColor: 'grey',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    
  
  },
  reminderText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  boldPointsTextLevel: {
    fontWeight: 'bold',
    color: '#faab14',
    fontSize: 16
  },
  regularText: {
    fontSize: 16,
  },
  reminderWhiteBoldText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  }
});
