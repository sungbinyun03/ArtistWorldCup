import React, {useState} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './pages/Home';
import Search from './pages/Search';
import Settings from './pages/Settings';
import artistDetail from './pages/artistDetail';
import Round from './pages/Round';
import playIcon from './assets/images/play.png';
import searchIcon from './assets/images/search.png';
import settingsIcon from './assets/images/settings.png';
import AppContext from './AppContext';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TextInput,
} from 'react-native';

const Tabs = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
global.roundSet = []; //TODO: add more info
global.winnerSet = [];
global.roundSetCopy = [];
function HomeStackNav() {
  return (
    <HomeStack.Navigator>
      <SearchStack.Screen name="Home" component={Home} />
      <SearchStack.Screen name="Round" component={Round} />
    </HomeStack.Navigator>
  );
}

function SearchStackNav() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="artistDetail" component={artistDetail} />
    </SearchStack.Navigator>
  );
}

function SettingsStackNav() {
  return (
    <SettingsStack.Navigator>
      <SearchStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}

function App() {
  const [roundNum, setRoundNum] = useState(16);
  const changeRoundSize = size => {
    setRoundNum(size);
  };
  const userSettings = {
    roundNum: roundNum,
    setRoundNum,
    changeRoundSize,
  };
  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <Tabs.Navigator
          initialRouteName={'Home'}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              let rn = route.name;

              if (rn === 'Home') {
                iconName = focused ? playIcon : playIcon;
              } else if (rn === 'Search') {
                iconName = focused ? searchIcon : searchIcon;
              } else if (rn === 'Settings') {
                iconName = focused ? settingsIcon : settingsIcon;
              }

              return (
                <Image source={iconName} style={{width: 20, height: 20}} />
              );
            },
            headerShown: false,
          })}

          // screenOptions = {{
          //   tabBarActiveTintColor: 'green',
          //   display: 'flex'
          // }}
        >
          <Tabs.Screen
            name="Home"
            component={HomeStackNav}
            options={{unmountOnBlur: true}}
          />
          <Tabs.Screen name="Search" component={SearchStackNav} />
          <Tabs.Screen name="Settings" component={SettingsStackNav} />
        </Tabs.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
