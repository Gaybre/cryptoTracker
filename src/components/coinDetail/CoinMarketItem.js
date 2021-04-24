import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../res/colors';
import MarketImage from '../../assets/market.png';

const CoinMarketItem = ({coin}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Image style={styles.marketImage} source={MarketImage} />
        <Text style={styles.nameText}>{coin.name}</Text>
      </View>
      <Text style={styles.priceText}>{`${coin.price_usd.toFixed(2)} USD`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255, 0.1)",
    borderColor: Colors.zircon,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    marginRight: 8,
    alignItems: "center"
  },
  containerHeader: {
    flexDirection: "row"
  },
  nameText: {
    color: Colors.white,
    fontWeight: "bold"
  },
  priceText: {
    color: Colors.white
  },
  marketImage: {
    width: 20,
    height: 20,
    marginRight: 10
  }
})

export default CoinMarketItem;
