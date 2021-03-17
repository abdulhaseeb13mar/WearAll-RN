/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WrapperScreen from '../WaComp/WrapperScreen';
import {View, Text, StyleSheet} from 'react-native';
import {H_W} from '../WaComp/WaDim';
import {colors} from '../WaComp/WaColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import NavigationRef from '../WaComp/RefNavigation';
import {connect} from 'react-redux';
import {WaresetCart} from '../WaRedux/WaActions';

function WaConfirmOrder(props) {
  const ResetAndGoHome = () => {
    props.WaresetCart();
    NavigationRef.NavigateAndReset('WaHome');
  };
  return (
    <WrapperScreen style={styles.WaConfirmOrder1}>
      <View style={styles.WaConfirmOrder2}>
        <Ionicons name="ios-shirt" size={H_W.width * 0.4} color={'white'} />
        <Text style={styles.WaConfirmOrder3}>
          Your ORDER HAS BEEN CONFIRMED!
        </Text>
        <Button
          onPress={ResetAndGoHome}
          title="Shop More"
          buttonStyle={styles.WaConfirmOrder4}
          raised
          titleStyle={styles.WaConfirmOrder5}
          containerStyle={{marginTop: 15, borderRadius: 10}}
        />
      </View>
    </WrapperScreen>
  );
}

export default connect(null, {WaresetCart})(React.memo(WaConfirmOrder));

const styles = StyleSheet.create({
  WaConfirmOrder1: {
    backgroundColor: colors.primary,
  },
  WaConfirmOrder2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  WaConfirmOrder3: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    width: H_W.width * 0.9,
    marginTop: 15,
  },
  WaConfirmOrder4: {
    backgroundColor: 'white',
    width: H_W.width * 0.6,
    borderRadius: 10,
  },
  WaConfirmOrder5: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    color: colors.primary,
  },
  WaConfirmOrder6: {},
});
