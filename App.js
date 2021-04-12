import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import CoinsStack from './src/components/coins/CoinsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen
        name="Coins"
          component= {CoinsStack}
        />
      </Tabs.Navigator>
    </NavigationContainer>
    );
};

export default App;
