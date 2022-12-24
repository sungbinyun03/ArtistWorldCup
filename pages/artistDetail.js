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

import {FlatGrid} from 'react-native-super-grid';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default function artistDetail({navigation, route}) {
  const [albums, setAlbums] = useState([]);
  var artist = route.params.artist;
  useEffect(() => {
    var searchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${route.params.accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album&market=US&limit=12`,
      searchParams,
    )
      .then(data => data.json())
      .then(data => {
        setAlbums(data.items);
      })
      // .then(data => console.log(data.items))
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
  }, []);

  console.log('albums', albums);

  function addToRound(artist) {
    var init = false;
    roundSet.forEach(element => {
      if (element.name === artist.name) {
        init = true;
      }
    });
    if (!init) {
      roundSet.push({name: artist.name, image: artist.images[0]?.url});
      console.log('ROUNDSET');
      console.log(roundSet);
    }
    else{
        console.log('ARTIST ALREADY IN ROUND');
    }
  }

  const renderItem = ({item}) => (
    <View style={styles.resultContainer}>
      <Image
        source={{uri: item?.images[0]?.url}}
        style={styles.resultImageContainer}
      />
      <Text style={styles.text2}>{item.name}</Text>
    </View>
  );

  //TODO: add Play song snippet

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{uri: artist?.images[0]?.url}}
          style={styles.artistImage}
        />
        <Text style={styles.text1}>{artist.name}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addToRound(artist)}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 12,
              alignSelf: 'center',
            }}>
            Add to Round
          </Text>
        </TouchableOpacity>
        {/* {albums.length > 0 && (
          <View style={styles.resultContainer}>
            <Image
              source={{uri: albums[0]?.images[0]?.url}}
              style={styles.resultImageContainer}
            />
            <Text style={styles.text1}>{albums[0].name}</Text>
          </View>
        )} */}
        <FlatGrid
          itemDimension={80}
          style={{height: 400}}
          data={albums}
          renderItem={renderItem}
        />
      </View>
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
    fontFamily: 'Montserrat-Bold',
    color: '#BE3455',
    fontSize: 30,
    marginTop: -35,
    marginLeft: 10,
  },
  text2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'white',
  },
  artistImage: {
    width: deviceWidth,
    height: 300,
  },
  resultContainer: {
    width: deviceWidth / 4.5,
    height: 110,
  },
  resultImageContainer: {
    width: 80,
    height: 80,
  },
  addButton: {
    width: 100,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#BE3455',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: -290,
    marginBottom: 270,
  },
});
