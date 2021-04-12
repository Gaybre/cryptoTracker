import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

import Colors from '../../res/colors';
import Http from '../../libs/http';

class CoinsScreen extends Component {

  state = {
    coins: [],
    allCoins: [],
    loading: false
  }

  componentDidMount = () => {
    this.getCoins();
  }

  getCoins = async () => {
    this.setState({loading: true});

    const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
    console.log('coins data', res.data);
    this.setState({
      coins: res.data,
      allCoins: res.data,
      loading: false
    });
  }

  handlePress = (coin) => {
    // console.log('go to details', this.props, coin);
    this.props.navigation.navigate('CoinDetail', { coin });
  }

  handleSearch = (query) => {
    const { allCoins } = this.state;
    const coinsFiltered = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase());
    });
    this.setState({ coins: coinsFiltered })
  }

  render() {

    const { coins, loading } = this.state;

    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch} />
        {loading && <ActivityIndicator color="#fff" size="large" style={styles.loader} />}
        <FlatList
          data={coins}
          renderItem={({item}) => <CoinsItem item={item} onPress={() => this.handlePress(item)}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.charade
  },
  loader: {
    justifyContent: "center",
    margin: "50%"
  }
})

export default CoinsScreen;
