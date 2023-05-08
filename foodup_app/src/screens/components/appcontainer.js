import React, { useEffect } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../tabs/hometab.js';
import SearchTab from '../tabs/searchtab.js';
import AddContentScreen from '../tabs/addtab.js';
import UserScreen from '../tabs/usertab.js';
import Icon from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import CostumHeader from './costumheader.js';
import MapScreen from '../tabs/maptab.js';
const Tab = createBottomTabNavigator();

export default function AppContainer() {
  const tabTitles = {
    'foryou': 'For You',
    'search': 'Suche',
    'post': 'Beitrag posten',
    'map': 'Karte',
    'profile': 'Profil'

  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={tabTitles.foryou}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
            headerShown: false
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name={tabTitles.search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="voicemail" size={size} color={color} />
            ),
            headerShown: false
          }}
          component={SearchTab}
        />
        <Tab.Screen
          name={tabTitles.post}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="camera" size={size} color={color} />
            ),
            header: () => <CostumHeader arrowShown={false} logoShown={false} headerText={tabTitles.post}/>,
          }}
        >
          {() => <AddContentScreen />}
        </Tab.Screen>
        <Tab.Screen
          name={tabTitles.map}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="location" size={size} color={color} />
            ),
            headerShown: false
          }}
          component={MapScreen}
        />
        <Tab.Screen
          name={tabTitles.profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" size={size} color={color} />
            ),
            header: () => <CostumHeader arrowShown={false} logoShown={false} headerText={tabTitles.profile}/>,
          }}
        >
          {() => <UserScreen />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}