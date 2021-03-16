/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WrapperScreen from '../WaComp/WrapperScreen';
import {View, Text} from 'react-native';
import {H_W} from '../WaComp/WaDim';
import {colors} from '../WaComp/WaColor';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
    <WrapperScreen
      style={{
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome5
          name="candy-cane"
          size={H_W.width * 0.4}
          color={colors.secondary}
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
            width: H_W.width * 0.9,
            marginTop: 15,
          }}>
          WE HAVE RECEIVED YOUR ORDER
        </Text>
        <Button
          onPreWa={ResetAndGoHome}
          title="Get More Sweats!"
          buttonStyle={{
            backgroundColor: colors.secondary,
            width: H_W.width * 0.6,
            borderRadius: 10,
          }}
          raised
          titleStyle={{fontSize: 20, fontWeight: 'bold', borderRadius: 10}}
          containerStyle={{marginTop: 15, borderRadius: 10}}
        />
      </View>
    </WrapperScreen>
  );
}

export default connect(null, {WaresetCart})(React.memo(WaConfirmOrder));
