import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import rightArrow from '../assets/images/right-arrow.png';
import blankImage from '../assets/images/user.png';
import {acc} from 'react-native-reanimated';
const CLIENT_ID = 'fff4c0180681498597190ec36cf67d74';
const CLIENT_SECRET = '40c83fe843ec4feb869461d21f2cf8af';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default function Home({navigation}) {
  const [accessToken, setAccessToken] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [artists, setArtists] = useState();
  useEffect(() => {
    //API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=' +
        CLIENT_ID +
        '&client_secret=' +
        CLIENT_SECRET,
    };
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token)) //add Error Handling
      .then(console.log('accessToken' + accessToken));
  }, []);

  //Search

  async function search() {
    //ARTIST ID
    var artistParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(artistParams);
    var artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=5`,
      artistParams,
    )
      .then(data => data.json())
      .then(data => setArtists(data.artists.items))
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        }
      });

    //if 0 results Set Variable emptySearch True
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.resultContainer}
      onPress={() =>
        navigation.navigate('artistDetail', {
          artist: item,
          accessToken: accessToken,
        })
      }>
      <Image
        source={item.images[0] ? {uri: item?.images[0]?.url} : {blankImage}}
        style={styles.resultImageContainer}
      />
      <View style={{width: 250, marginRight: 20}}>
        <Text style={styles.text1}>{item.name}</Text>
      </View>
      <Image source={rightArrow} style={{width: 20, height: 20}} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Artist</Text>
      <TextInput
        style={styles.search}
        cursorColor={'white'}
        placeholder={'Search for an Artist Name'}
        placeholderTextColor={'grey'}
        color={'white'}
        onChangeText={input => setSearchInput(input)}
        value={searchInput}
        onEndEditing={() => {
          search();
        }}
      />
      {artists?.length > 0 && (
        <View style={{width: 360, marginTop: 12}}>
          <Text
            style={{
              color: 'grey',
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
              textAlign: 'left',
            }}>
            Search Results:{' '}
          </Text>
        </View>
      )}
      <View style={styles.searchResults}>
        <FlatList data={artists} renderItem={renderItem}></FlatList>
      </View>

      {artists?.length > 0 && (
        <View style={styles.loadButton}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
              alignSelf: 'center',
            }}>
            Load More
          </Text>
        </View>
      )}
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
  },
  text1: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontSize: 20,
    textAlign: 'left',
  },
  search: {
    height: 30,
    width: 300,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 10,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  searchResults: {
    marginTop: 10,
    maxHeight: 400,
  },
  resultContainer: {
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
  loadButton: {
    width: 200,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#BE3455',
    justifyContent: 'center',
  },
});
