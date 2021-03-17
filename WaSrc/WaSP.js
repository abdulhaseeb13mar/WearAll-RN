/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {H_W} from '../WaComp/WaDim';
import WrapperScreen from '../WaComp/WrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../WaComp/WaColor';
import NavigationRef from '../WaComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../WaComp/WaHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {
  WaremoveFavAction,
  WasetFavAction,
  WaaddCartAction,
  WaremoveCartAction,
} from '../WaRedux/WaActions';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const WaProduct = props.WaProduct;
  const [Sizes, setSizes] = useState(['Small', 'Medium', 'Large']);
  const [fav, setFav] = useState(false);
  const [currentSize, setCurrentSize] = useState(Sizes[0]);

  const checkIfFav = () => {
    for (let i = 0; i < props.WaFavs.length; i++) {
      if (props.WaFavs[i].id === WaProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.WaremoveFavAction(WaProduct.id)
      : props.WasetFavAction(WaProduct);
    setFav(!fav);
  };

  const WaAddToCart = () => {
    props.WaaddCartAction({...WaProduct, size: currentSize});
  };
  const WaRemoveFromCart = () => {
    props.WaremoveCartAction({...WaProduct, size: currentSize});
  };

  const WaGotoCart = () => NavigationRef.Navigate('WaCart');
  const WaGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <Header
        leftIcon={AntDesign}
        rightIcon={Ionicons}
        rightIconColor="black"
        leftIconColor="black"
        leftIconName="left"
        rightIconName="ios-cart-outline"
        leftIconAction={WaGoBack}
        rightIconAction={WaGotoCart}
        Title={
          <Text>
            Wear<Text style={{color: 'black'}}>All</Text>
          </Text>
        }
      />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={{...styles.WaSP1, marginTop: HEIGHT * 0.04}}>
          <ImageBackground
            source={WaProduct.images}
            style={{...styles.WaSP2, height: HEIGHT * 0.45}}
            resizeMode="contain">
            <TouchableOpacity onPress={toggleFav} style={styles.WaSP3}>
              <Ionicons
                name={fav ? 'heart' : 'heart-outline'}
                color={fav ? 'red' : colors.primary}
                size={H_W.width * 0.07}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <Text style={{...styles.WaSP4, marginTop: HEIGHT * 0.02}}>
          {WaProduct.productName}
        </Text>
        <View
          style={{
            ...styles.WaSP5,
            marginTop: HEIGHT * 0.005,
            marginBottom: HEIGHT * 0.025,
          }}
        />
        <Text style={{...styles.WaSP6, marginBottom: HEIGHT * 0.025}}>
          {WaProduct.Description}
        </Text>
        <Text style={styles.WaSP7}>Size</Text>
        <View style={{...styles.WaSP8, marginTop: HEIGHT * 0.01}}>
          {Sizes.map((size, index) => {
            return (
              <TouchableOpacity
                onPress={() => setCurrentSize(size)}
                key={index}
                style={{
                  ...styles.WaSP9,
                  paddingVertical: HEIGHT * 0.01,
                  borderWidth: size === currentSize ? 2.5 : 1.5,
                  borderColor:
                    size === currentSize ? colors.primary : colors.lightGrey3,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 13 + 4 * index}}>
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{...styles.WaSP10, marginTop: HEIGHT * 0.02}}>
          <View
            style={{
              ...styles.WaSP11,
              paddingVertical: HEIGHT * 0.01,
              backgroundColor:
                props.WaCart[`${WaProduct.id}_${currentSize}`] !== undefined &&
                props.WaCart[`${WaProduct.id}_${currentSize}`] !== 0
                  ? 'white'
                  : colors.lightBackground,
              elevation:
                props.WaCart[`${WaProduct.id}_${currentSize}`] !== undefined &&
                props.WaCart[`${WaProduct.id}_${currentSize}`] !== 0
                  ? 3
                  : 0,
            }}>
            {props.WaCart[`${WaProduct.id}_${currentSize}`] !== undefined &&
            props.WaCart[`${WaProduct.id}_${currentSize}`] !== 0 ? (
              <>
                <TouchableOpacity onPress={WaRemoveFromCart}>
                  <FontAwesome
                    name="minus-circle"
                    color={colors.primary}
                    size={H_W.width * 0.1}
                  />
                </TouchableOpacity>
                <View style={styles.WaSP12}>
                  <Text style={styles.WaSP13}>
                    {props.WaCart[`${WaProduct.id}_${currentSize}`].added}
                  </Text>
                </View>
                <TouchableOpacity onPress={WaAddToCart}>
                  <FontAwesome
                    name="plus-circle"
                    color={colors.primary}
                    size={H_W.width * 0.1}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <Button
                raised
                onPress={WaAddToCart}
                title="Add to cart"
                titleStyle={{fontSize: H_W.width * 0.05}}
                buttonStyle={{
                  paddingVertical: HEIGHT * 0.015,
                  ...styles.WaSP14,
                }}
                containerStyle={styles.WaSP15}
              />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const styles = StyleSheet.create({
  WaSP23: {},
  WaSP20: {},
  WaSP19: {},
  WaSP18: {},
  WaSP16: {},
  WaSP15: {
    width: '100%',
    borderRadius: 50,
  },
  WaSP14: {backgroundColor: colors.primary, borderRadius: 50},
  WaSP13: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: H_W.width * 0.05,
  },
  WaSP12: {
    backgroundColor: 'white',
    width: H_W.width * 0.1,
    height: H_W.width * 0.1,
    transform: [{scale: 1.3}],
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    padding: 2,
    borderColor: colors.primary,
    borderWidth: 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  WaSP11: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    borderRadius: 50,
  },
  WaSP10: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  WaSP9: {
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 7,
    marginRight: H_W.width * 0.05,
  },
  WaSP8: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: H_W.width * 0.05,
  },
  WaSP7: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.darkGray,
    marginLeft: H_W.width * 0.05,
  },
  WaSP6: {
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.lightGrey3,
    marginLeft: H_W.width * 0.05,
    width: H_W.width * 0.85,
  },
  WaSP5: {
    height: 3,
    marginLeft: H_W.width * 0.05,
    backgroundColor: colors.primary,
    width: '15%',
  },
  WaSP4: {
    fontWeight: 'bold',
    fontSize: 27,
    marginLeft: H_W.width * 0.05,
  },
  WaSP3: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
    margin: 12,
  },
  WaSP2: {
    width: '90%',

    backgroundColor: `rgba(${colors.rgb_Primary}, 0.6)`,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  WaSP1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    WaProduct: state.WaCrntPrdtReducer,
    WaFavs: state.WaToggleFav,
    WaCart: state.WaCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  WasetFavAction,
  WaremoveFavAction,
  WaremoveCartAction,
  WaaddCartAction,
})(React.memo(SingleProduct));
