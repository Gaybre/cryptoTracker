import React, { Component } from 'react';
import { View, Text, Image, SectionList,FlatList, StyleSheet } from 'react-native';
import CoinMarketItem from './CoinMarketItem';
import Http from '../../libs/http';
import Colors from '../../res/colors';

class CoinDetailScreen extends Component {

  state = {
    coin: {},
    markets: []
  }

  // it receives and set the tapped currency
  componentDidMount() {
    // console.log('recibed coin: ', this.props.route.params.coin);
    const coin = this.props.route.params.coin;
    this.props.navigation.setOptions({ title: coin.name });
    this.setState({ coin });
    this.getMarkets(coin.id);
  }

  // getting the icon url
  getSymbol = (name) => {
    if(name) {
      const coinSymbol = name.toLowerCase().replace(" ", "-");
      return `https://c1.coinlore.com/img/16x16/${coinSymbol}.png`
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
    this.setState({ markets });
  }

  render() {
    const { coin, markets } = this.state;

    return (
      console.log('Coin render: ', this.state.coin),
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image style={styles.iconSymbol} source={{uri: this.getSymbol(coin.name)}} />
          <Text style={styles.titleText}>{coin.name}</Text>
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

        <FlatList
        style={styles.listMarket}
          data={markets}
          horizontal={true}
          keyExtractor={(item) => `${item.base}-${item.volume}`}
          renderItem={({item}) => <CoinMarketItem coin={item} />}
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
  subHeader: {
    backgroundColor: "rgba(0,0,0, 0.1)",
    padding: 16,
    flexDirection: "row"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
    color: "#fff",
    fontSize: 14
  },
  sectionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  },
  marketsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 16
  }
})

export default CoinDetailScreen;
