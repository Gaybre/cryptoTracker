import React, { Component } from 'react';
import { TextInput, Platform, View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../res/colors';

class CoinsSearch extends Component {

  state = {
    query: ""
  }

  handleText = (query) => {
    this.setState({ query });
    if(this.props.onChange) {
      this.props.onChange(query)
    }
  }

  // clearInput = () => this.setState({query: ""});

  render() {
    const { query } = this.state;
    return (
      <View>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder="Search coin"
          placeholderTextColor="#fff"
        />
        {/* {(query !== "") && <Pressable
          onPress={this.clearInput}
          style={styles.clearText}
        >
          <Text>X</Text>
        </Pressable>
        } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: "#fff"
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }
  // clearText: {
  //   position: "absolute",
  //   right: 16,
  //   top: 12,
  //   paddingVertical: 2,
  //   paddingHorizontal: 7,
  //   borderRadius: 50,
  //   backgroundColor: Colors.carmine
  // }
});

export default CoinsSearch;
