import React, { Component } from 'react';
import { View, Text, Image, Pressable, Alert, ActivityIndicator, SectionList, FlatList, StyleSheet } from 'react-native';
import CoinMarketItem from './CoinMarketItem';
import Http from '../../libs/http';
import Storage from '../../libs/storage';
import { getSymbol } from '../../libs/getSymbol';
import Colors from '../../res/colors';

class CoinDetailScreen extends Component {

  state = {
    coin: {},
    markets: [],
    isFavorite: false,
    loadingMarkets: false
  }

  // it receives and set the tapped currency
  componentDidMount() {
    // console.log('recibed coin: ', this.props.route.params.coin);
    const coin = this.props.route.params.coin;
    this.props.navigation.setOptions({ title: coin.name });
    this.setState({ coin }, () => {
      this.getFavorite();
    });
    this.setState({loadingMarkets: true});
    this.getMarkets(coin.id);
  }

  toggleFavorite = () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    if (this.state.isFavorite) {
      this.removeFavorite(key);
    } else {
      this.addFavorite(key, coin);
    }
  }

  addFavorite = async (key, coin) => {
    const stored = await Storage.instance.store(key, coin);

    if (stored) {
      this.setState({ isFavorite: true });
    }
  }

  removeFavorite = async (key) => {
    Alert.alert("Remove favorite", "Are you sure?", [
      {
        text: "cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "Remove",
        onPress: async () => {
          await Storage.instance.remove(key);
          this.setState({ isFavorite: false });
        },
        style: "destructive"
      }
    ])
  }

  getFavorite = async () => {
    const key = `favorite-${this.state.coin.id}`;

    const isFavoriteStr = await Storage.instance.get(key);
    if (isFavoriteStr) {
      this.setState({ isFavorite: true });
    }
  }

  // it setting an array of the data details to show
  getSections = (coin) => {
    const sections = [
      {
        title: "Market cap",
        data:[coin.market_cap_usd]
      },
      {
        title: "Volume 24h",
        data: [ coin.volume24]
      },
      {
        title: "Change 24h",
        data: [ coin.percent_change_24h]
      }
    ];
    return sections;
  }

  // it gets markets
  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
    const markets = await Http.instance.get(url);
    this.setState({ markets, loadingMarkets: false });
  }

  render() {
    const { coin, markets, isFavorite, loadingMarkets } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image style={styles.iconSymbol} source={{uri: getSymbol(coin.name)}} />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
            ]}
          >
            <Text style={styles.btnText}>
              {isFavorite ? 'Remove favorite' : 'Add favorite'}
            </Text>
          </Pressable>
        </View>

        <SectionList
          style={styles.sectionDetail}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderSectionHeader={({section}) =>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          }
          renderItem={({item}) =>
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          }
        />

        <Text style={styles.marketsTitle}>Markets</Text>

        {loadingMarkets && <ActivityIndicator color="#fff" size="large" style={styles.loader} />}
        <FlatList
          style={styles.listMarket}
          data={markets}
          horizontal={true}
          keyExtractor={(item) => `${item.name}-${item.volume}`}
          renderItem={({item}) => item.name && <CoinMarketItem coin={item} />}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  row: {
    flexDirection: "row"
  },
  subHeader: {
    backgroundColor: "rgba(0,0,0, 0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
    marginLeft: 8
  },
  iconSymbol: {
    width: 25,
    height: 25
  },
  sectionHeader: {
    backgroundColor: "rgba(0,0,0, 0.2)",
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  sectionDetail: {
    maxHeight: 250
  },
  listMarket: {
    maxHeight: 100,
    paddingLeft: 16
  },
  itemText: {
    color: Colors.white,
    fontSize: 14
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold"
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 16
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine
  },
  btnText: {
    color: Colors.white
  },
  loader: {
    justifyContent: "center"
  }
})

export default CoinDetailScreen;
