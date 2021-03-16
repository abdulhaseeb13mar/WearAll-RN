import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './WaComp/RefNavigation';
import SsHome from './WaSrc/SsHome';
import SsSP from './WaSrc/WaSP';
import SsCart from './WaSrc/WaCart';
import SsContact from './WaSrc/WaContact';
import SsSearch from './WaSrc/WaSearch';
import SsConfirmOrder from './WaSrc/WaConfirmOrder';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={ref => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="SsHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="SsHome" component={SsHome} />
        <Stack.Screen name="SsSP" component={SsSP} />
        <Stack.Screen name="SsCart" component={SsCart} />
        <Stack.Screen name="SsSearch" component={SsSearch} />
        <Stack.Screen name="SsContact" component={SsContact} />
        <Stack.Screen name="SsConfirmOrder" component={SsConfirmOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
