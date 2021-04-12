/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import ArrowDown from '../../assets/arrow_dow.png';
import ArrowUp from '../../assets/arrow_up.png';

const CoinsItem = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>

      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        {(item.percent_change_1h > 0)
          ? <Image style={styles.arrow} source={ArrowUp} />
          : <Image style={styles.arrow} source={ArrowDown} />
        }
      </View>

    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1
  },
  row: {
    flexDirection: "row"
  },
  symbolText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 12
  },
  nameText: {
    color: Colors.white,
    fontSize: 14,
    marginRight: 16
  },
  percentText: {
    color: Colors.white,
    fontSize: 12,
    marginRight: 8
  },
  priceText: {
    color: Colors.white,
    fontSize: 14
  },
  arrow: {
    width: 20,
    height: 20
  }
});

export default CoinsItem;
