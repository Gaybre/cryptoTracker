/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import { getSymbol } from '../../libs/getSymbol';
import ArrowDown from '../../assets/arrow_dow.png';
import ArrowUp from '../../assets/arrow_up.png';

const CoinsItem = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>


      <View style={styles.row}>
        <Image style={styles.iconSymbol} source={{uri: getSymbol(item.name)}} />
        <View>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.symbolText}>{item.symbol}</Text>
        </View>
      </View>

      <View style={styles.sectionPrice}>
        <Text style={styles.priceText}>{`$${item.price_usd} USD`}</Text>
        <View style={styles.row}>
          <Text style={styles.percentText}>{item.percent_change_1h}</Text>
          {(item.percent_change_1h > 0)
            ? <Image style={styles.arrow} source={ArrowUp} />
            : <Image style={styles.arrow} source={ArrowDown} />
          }
        </View>
      </View>

    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1
  },
  sectionPrice: {
    alignItems: "flex-end"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  symbolText: {
    color: Colors.white,
    fontSize: 14,
  },
  nameText: {
    fontWeight: "bold",
    color: Colors.white,
    fontSize: 16,
    marginBottom: 10
  },
  percentText: {
    color: Colors.white,
    fontSize: 12,
    marginRight: 8
  },
  priceText: {
    fontWeight: "bold",
    color: Colors.white,
    fontSize: 14,
    marginBottom: 10
  },
  arrow: {
    width: 15,
    height: 15
  },
  iconSymbol: {
    width: 25,
    height: 25,
    marginRight: 10
  }
});

export default CoinsItem;
