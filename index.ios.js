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

export default class SplashWalls extends Component {
  //render() {
  //  return (
  //    <View style={styles.container}>
  //      <Text style={styles.welcome}>
  //        Welcome to React Native!
  //      </Text>
  //      <Text style={styles.instructions}>
  //        To get started, edit index.ios.js
  //      </Text>
  //      <Text style={styles.instructions}>
  //        Press Cmd+R to reload,{'\n'}
  //        Cmd+D or shake for dev menu
  //      </Text>
  //    </View>
  //  );
  //}

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
    return (
      <View>
        <Text>
          Data loaded
        </Text>
      </View>
    );
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
        console.log(responseJson);
        this.setState({isLoading: false});
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
