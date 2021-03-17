/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {
  WaremoveCartAction,
  WaaddCartAction,
  WasetCurrentProductAction,
} from '../WaRedux/WaActions';
import WrapperScreen from '../WaComp/WrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../WaComp/WaColor';
import {H_W} from '../WaComp/WaDim';
import RefNavigation from '../WaComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import WaItemCounterWrapper from '../WaComp/WaItemCounterWrapper';
import {ProductList} from './WaHome';

export const Cart = props => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.WaCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.WaCart);
    let UsArr = [];
    CartArray.forEach(element => {
      UsArr.push(props.WaCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const WaGoBack = () => RefNavigation.GoBack();

  const WaGoToSingleProduct = item => {
    props.WasetCurrentProductAction(item);
    RefNavigation.Navigate('WaSP');
  };

  const WainfoScreen = () => RefNavigation.Navigate('WaContact');

  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <View
          style={{
            height: HEIGHT * 0.15,
            ...styles.WaCart1,
          }}>
          <View
            style={{
              marginTop: HEIGHT * 0.03,
              ...styles.WaCart2,
            }}>
            <TouchableOpacity onPress={WaGoBack}>
              <Entypo
                name="chevron-left"
                color={colors.primary}
                size={H_W.width * 0.06}
              />
            </TouchableOpacity>
            <Text style={styles.WaCart3}>Your Cart</Text>
          </View>
          <View
            style={{
              ...styles.WaCart4,
              marginTop: HEIGHT * 0.015,
            }}>
            <Text style={styles.WaCart5}>Total Bill:</Text>
            <View style={styles.WaCart6}>
              <Text style={styles.WaCart7}>${props.WaTotal}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: HEIGHT * 0.02,
            marginTop: HEIGHT * 0.04,
            ...styles.WaCart8,
          }}>
          {HorizontalCartArray.length > 0 ? (
            HorizontalCartArray.map((item, index) => {
              return (
                <WaItemCounterWrapper
                  key={index}
                  position="bottom"
                  Counterlength={HEIGHT * 0.15}
                  style={{marginBottom: H_W.width * 0.02}}
                  item={item}
                  counterColor={colors.primary}
                  counterContentColor={'white'}>
                  <ProductList
                    item={item}
                    explore={true}
                    WaGoToSingleProduct={WaGoToSingleProduct}
                    isCart={true}
                  />
                </WaItemCounterWrapper>
              );
            })
          ) : (
            <Text style={styles.WaCart9}>Your Cart is empty...</Text>
          )}
        </View>
      </ScrollView>
      <Button
        onPress={WainfoScreen}
        title="Proceed to Checkout"
        disabled={props.WaTotal < 1}
        buttonStyle={{
          backgroundColor: colors.primary,
          borderRadius: 0,
          paddingVertical: HEIGHT * 0.015,
        }}
        titleStyle={{fontWeight: 'bold'}}
        containerStyle={{borderRadius: 0}}
      />
    </WrapperScreen>
  );
};

const mapStateToProps = state => ({
  WaCart: state.WaCartReducer.items,
  WaTotal: state.WaCartReducer.totalAmount,
});

export default connect(mapStateToProps, {
  WaremoveCartAction,
  WaaddCartAction,
  WasetCurrentProductAction,
})(Cart);

const styles = StyleSheet.create({
  WaCart1: {
    width: H_W.width,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: H_W.width * 0.04,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  WaCart2: {flexDirection: 'row', alignItems: 'center'},
  WaCart3: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 23,
    marginLeft: H_W.width * 0.25,
  },
  WaCart4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_W.width * 0.06,
  },
  WaCart5: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: H_W.width * 0.045,
  },
  WaCart6: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  WaCart7: {
    fontWeight: 'bold',
    fontSize: H_W.width * 0.05,
    color: 'white',
  },
  WaCart8: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  WaCart9: {
    width: '100%',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  WaCart10: {},
});
