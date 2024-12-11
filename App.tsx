import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantallaAcelerometro from './Pantallas/PantallaAcelerometro';
import PantallaLogs from './Pantallas/PantallaLogs';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Acelerometro" component={PantallaAcelerometro} />
        <Tab.Screen name="Logs" component={PantallaLogs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
