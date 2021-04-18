import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';

class FavoritesScreen extends Component {

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const favoriteKeys = allKeys.filter((key) => key.includes('favorite-'));
      console.log("favoriteKeys", favoriteKeys);
    } catch(err) {
      console.log('Ocurrio un error', err);
    }
  }

  componentDidMount() {
    this.getFavorites();
  }

  render() {
    return (
      <View style={styles.container}>
        <FavoritesEmptyState />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1
  }
})

export default FavoritesScreen;
