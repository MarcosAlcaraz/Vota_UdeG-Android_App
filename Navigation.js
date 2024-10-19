import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import INICIO from './screens/Inicio';
import VOTO from ".//screens/Voto";
import ADMIN from "./screens/Admin"

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={INICIO} options={{ headerShown: false }} />
          <Stack.Screen name="Voto" component={VOTO} options={{ headerShown: false }}/>
          <Stack.Screen name="Admin" component={ADMIN} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>

    )
  }

}