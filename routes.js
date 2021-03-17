import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './WaComp/RefNavigation';
import WaHome from './WaSrc/WaHome';
import WaAP from './WaSrc/WaAP';
import WaSP from './WaSrc/WaSP';
import WaFav from './WaSrc/WaFav';
import WaSearch from './WaSrc/WaSearch';
import WaCart from './WaSrc/WaCart';
import WaContact from './WaSrc/WaContact';
import WaConfirmOrder from './WaSrc/WaConfirmOrder';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={ref => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="WaHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="WaHome" component={WaHome} />
        <Stack.Screen name="WaAP" component={WaAP} />
        <Stack.Screen name="WaSP" component={WaSP} />
        <Stack.Screen name="WaFav" component={WaFav} />
        <Stack.Screen name="WaSearch" component={WaSearch} />
        <Stack.Screen name="WaCart" component={WaCart} />
        <Stack.Screen name="WaContact" component={WaContact} />
        <Stack.Screen name="WaConfirmOrder" component={WaConfirmOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
