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
  ActivityIndicator
} from 'react-native';

var RandManager = require('./RandManager.js');
const NUM_WALLPAPERS = 5;

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
      if( !isLoading ) {
        return (
          <View>
            {wallsJSON.map((wallpaper, index) => {
              return(
                <Text key={index}>
                  {wallpaper.author}
                </Text>
              );
            })}
           </View>
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
  //container: {
  //  flex: 1,
  //  justifyContent: 'center',
  //  alignItems: 'center',
  //  backgroundColor: '#F5FCFF',
  //},
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
