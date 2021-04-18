import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../coins/CoinsItem';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';

class FavoritesScreen extends Component {

  state = {
    favorites: []
  }

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const favoriteKeys = allKeys.filter((key) => key.includes('favorite-'));
      const favoriteItems = await Storage.instance.multiGet(favoriteKeys);
      const favorites = favoriteItems.map(item => JSON.parse(item[1]));
      this.setState({ favorites });
    } catch(err) {
      console.log('Ocurrio un error', err);
    }
  }

  handlePress = (coin) => this.props.navigation.navigate("CoinDetail", { coin });

  componentDidMount() {
    this.getFavorites();
    this.props.navigation.addListener("focus", this.getFavorites);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("focus", this.getFavorites);
  }

  render() {
    const { favorites } = this.state;
    console.log('Estas son del state: ', favorites);
    return (
      <View style={styles.container}>
        {favorites.length > 0
        ? <FlatList
            data={favorites}
            renderItem={({ item }) =>
              <CoinsItem
                item={item}
                onPress={() => this.handlePress(item)}
              />}
          />
        : <FavoritesEmptyState />
        }
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
