import React, {useState, useContext} from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import AppContext from '../AppContext';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Home({navigation}) {
  const roundContext = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Billboard Top 100', value: 'billboard'}, //billbord top 100
    {label: 'My Top Spotify Artists (Sign In Required)', value: 'spotify'}, //login to spotify, select top artists
    {label: 'Random', value: 'random'}, //random
    {label: 'Custom', value: 'custom'}, //user selects each individual participant
  ]);
  console.log('$$ round' + roundSet);

  const renderItem = ({item}) => (
    <View style={styles.roundContainer}>
      <Image source={{uri: item.image}} style={styles.resultImageContainer} />
      <View style={{width: 250, marginRight: 20}}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: 'white',
            fontSize: 20,
          }}>
          {item.name}
        </Text>
      </View>
      {/* <Image source={rightArrow} style={{width: 20, height: 20}} /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ARTIST WORLD CUP</Text>
      <Text style={styles.text1}>Round Size</Text>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={[
            styles.roundBox,
            {
              backgroundColor:
                roundContext.roundNum === 16 ? '#BE3455' : 'black',
            },
          ]}
          onPress={() => {
            roundContext.changeRoundSize(16);
          }}>
          <Text style={{color: 'white'}}>16</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roundBox,
            {
              backgroundColor:
                roundContext.roundNum === 32 ? '#BE3455' : 'black',
            },
          ]}
          onPress={() => {
            roundContext.changeRoundSize(32);
          }}>
          <Text style={{color: 'white'}}>32</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roundBox,
            {
              backgroundColor:
                roundContext.roundNum === 64 ? '#BE3455' : 'black',
            },
          ]}
          onPress={() => {
            roundContext.changeRoundSize(64);
          }}>
          <Text style={{color: 'white', fontFamily: 'Montserrat-Regular'}}>
            64
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text1}>Choose Artists From ...</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={item => {
          if (item.label == 'Custom') {
            setValue(item);
            navigation.navigate('Search'); //TODO FIX
          }
        }}
        style={{backgroundColor: 'darkgrey', width: 350, alignSelf: 'center'}}
        containerStyle={{
          marginTop: 20,
          width: 350,
        }}
        labelStyle={{
          padding: 10,
        }}
      />
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 14,
          color: 'grey',
          textAlign: 'left',
          alignSelf: 'flex-start',
          marginLeft: 10,
          marginTop: 10,
        }}>
        Current Competitors ( {roundSet.length} / {roundContext.roundNum} ):
      </Text>
      <View style={styles.artistList}>
        <FlatList data={roundSet} renderItem={renderItem} />
      </View>

      <TouchableOpacity
        style={[
          styles.startButton,
          {
            backgroundColor:
              roundSet.length === roundContext.roundNum ? '#BE3455' : 'grey',
          },
        ]}
        onPress={() => {
          roundSetCopy = roundSet;
          navigation.navigate('Round');
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: 'white',
            fontSize: 16,
          }}>
          Start Round
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
    fontSize: 30,
    marginTop: 10,
  },
  text1: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
  roundBox: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  roundContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 5,
    marginRight: 15,
  },
  artistList: {
    marginTop: 10,
    maxHeight: 280,
    width: 400,
  },
  startButton: {
    width: 160,
    height: 40,
    borderRadius: 100,
    marginTop: 610,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
