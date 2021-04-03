import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import CoinsItem from './CoinsItem';

import Colors from '../../res/colors';
import Http from '../../libs/http';

class CoinsScreen extends Component {

  state = {
    coins: [],
    loading: false
  }

  componentDidMount = async () => {
    this.setState({loading: true});

    const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
    console.log('coins data', res.data);
    this.setState({
      coins: res.data,
      loading: false
    });
  }

  handlePress = () => {
    console.log('go to details', this.props);
    this.props.navigation.navigate('CoinDetail');
  }

  render() {

    const { coins, loading } = this.state;

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator color="#fff" size="large" style={styles.loader} />}
        <FlatList
          data={coins}
          renderItem={({item}) => <CoinsItem item={item}/>}
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
