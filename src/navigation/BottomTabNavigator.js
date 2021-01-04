import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import {Home, More, Recognition, Rewards} from '../screens';

const Tab = createBottomTabNavigator();

const GivePointBlank = () => null;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Rewards" component={Rewards} />
      <Tab.Screen name="GivePoint" component={GivePointBlank} />
      <Tab.Screen name="Recognition" component={Recognition} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
