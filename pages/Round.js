import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

import AppContext from '../AppContext';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

//TODO: Artist Name Text Pop

//Win Case if roundSet length = 1
//Change round numbers

export default function Round({navigation}) {
  const roundContext = useContext(AppContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [titleMessage, setTitleMessage] = React.useState(
    'Round of ' + roundSet.length,
  );
  var index1 = Math.floor(Math.random() * roundSet.length);
  var index2 = Math.floor(Math.random() * roundSet.length);
  while (index1 == index2) {
    index2 = Math.floor(Math.random() * roundSet.length);
  }

  const onRefresh = React.useCallback(() => {
    if (roundSet.length == 0) {
      switch (true) {
        case winnerSet.length == 32:
          setTitleMessage('Round of 32');
          roundSet = winnerSet;
          winnerSet = [];
          break;
        case winnerSet.length == 16:
          setTitleMessage('Round of 16');
          roundSet = winnerSet;
          winnerSet = [];
          break;
        case winnerSet.length == 8:
          setTitleMessage('Quarterfinals');
          roundSet = winnerSet;
          winnerSet = [];
          break;
        case winnerSet.length == 4:
          setTitleMessage('Semifinals');
          roundSet = winnerSet;
          winnerSet = [];
          break;
        case winnerSet.length == 2:
          setTitleMessage('Final');
          roundSet = winnerSet;
          winnerSet = [];
          break;
        case winnerSet.length == 1:
          navigation.navigate('Settings');
          break;
        default:
          break;
      }
    } 
    setRefreshing(true);
    wait(10).then(() => setRefreshing(false));
  }, []);
  console.log(roundSet);
  console.log(winnerSet);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleMessage}</Text>
      <TouchableOpacity
        style={styles.artist1}
        onPress={() => {
          winnerSet.push(roundSet[index1]);
          roundSet.splice(index1, 1);
          roundSet.splice(index2, 1);
          onRefresh();
        }}>
        <Image
          style={styles.artistImage}
          source={{uri: roundSet[index1].image}}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 18,
            color: 'black',
            marginTop: -25,
            marginLeft: 5,
          }}>
          {roundSet[index1].name}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          fontFamily: 'Montserrat-Bold',
          fontSize: 48,
          color: '#BE3455',
          marginTop: deviceHeight / 2 - 100,
          zIndex: 999,
        }}>
        VS
      </Text>
      <TouchableOpacity
        style={styles.artist2}
        onPress={() => {
          winnerSet.push(roundSet[index2]);
          roundSet.splice(index1, 1);
          roundSet.splice(index2, 1);

          onRefresh();
        }}>
        <Image
          style={styles.artistImage}
          source={{uri: roundSet[index2].image}}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 18,
            color: 'black',
            marginTop: -25,
            marginLeft: 5,
          }}>
          {roundSet[index2].name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#BE3455',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  artist1: {
    width: deviceWidth,
    height: 300,
    marginBottom: 10,
  },
  artist2: {
    width: deviceWidth,
    height: 300,
  },
  artistImage: {
    width: deviceWidth,
    height: 300,
  },
});
