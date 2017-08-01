/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';

var RandManager = require('./RandManager.js');
var Swiper = require('react-native-swiper');
import NetworkImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
const NUM_WALLPAPERS = 5;
var winDimension = Dimensions.get('window');

export default class SplashWalls extends Component {
  render() {
    var { isLoading } = this.state;
    if (isLoading) {
      return this.renderLoadingMessage();
    } else {
      return this.renderResults();
    }
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          size={'small'} 
          style={{margin: 15}} />
          <Text style={{color: '#fff'}}>Contacting Unsplash</Text>
       
      </View>
    );
  }

  renderResults() {
    var {wallsJSON, isLoading} = this.state;
      console.log(`width= ${winDimension.width}, height= ${winDimension.height}`);
      if( !isLoading ) {
        return (

          <Swiper
            dot = {<View style={{backgroundColor:'rgba(255,255,255,.4)',
                                 width: 8,
                                 height: 8,
                                 borderRadius: 10,
                                 marginLeft: 3,
                                 marginRight: 3,
                                 marginTop: 3,
                                 marginBottom: 3, }} />}

            activeDot = {<View style={{backgroundColor: '#fff',
                                       width: 13,
                                       height: 13,
                                       borderRadius: 7,
                                       marginLeft: 7,
                                       marginRight: 7}} />}

            loop = {false}
          >
            {wallsJSON.map((wallpaper, index) => {
              return(
                <View key={index} style={styles.container}>
                  <NetworkImage
                    source={{uri: `https://unsplash.it/${wallpaper.width}/${wallpaper.height}?image=${wallpaper.id}`}}
                    indicator={Progress.Circle}
                    style={styles.wallpaperImage}
                    indicatorProps={{
                        color: 'rgba(255, 255, 255)',
                        size: 60,
                        thickness: 7
                    }}
                   />
                </View>
              );
            })}
         </Swiper>
        );
      }
  }

  constructor(props) {
    super(props);

    this.state = {
      wallsJSON: [],
      isLoading: true
    };
  }

  fetchWallsJSON() {
    console.log('Wallpapers will be fetched');
    var url = 'http://unsplash.it/list';
    fetch(url)
      .then((response) => response.json() )
      .then( responseJson => {
        var randomIds = RandManager.uniqueRandomNumbers(NUM_WALLPAPERS,
                                            0, responseJson.length);
        var walls = [];
        randomIds.forEach(randomId => {
          walls.push(responseJson[randomId]);
        });

        console.log(responseJson);
        this.setState({
          isLoading: false,
          wallsJSON: [].concat(walls)
        });
        console.log('set isLoading to false');
      })
        .catch( error => console.log('Fetch error: ' + error) );
  }

  componentDidMount() {
    this.fetchWallsJSON();
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  wallpaperImage: {
    flex: 1,
    width: winDimension.width,
    height: winDimension.height,
    backgroundColor: '#000'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SplashWalls', () => SplashWalls);
