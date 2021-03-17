/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import {
  WaremoveFavAction,
  WasetFavAction,
  WaaddCartAction,
  WaremoveCartAction,
} from '../WaRedux/WaActions';
import DP from '../WaPhotos/w29.png';

function SingleProduct(props) {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const WaProduct = props.WaProduct;
  const [Sizes, setSizes] = useState(['Small', 'Medium', 'Large']);
  const [currentSize, setCurrentSize] = useState(Sizes[0]);

  const WaAddToCart = () => {
    console.log('asdasda');
    props.WaaddCartAction({...WaProduct, size: currentSize});
  };
  const WaRemoveFromCart = () => {
    props.WaCart[`${WaProduct.id}_${currentSize}`].added !== 0 &&
      props.WaremoveCartAction({...WaProduct, size: currentSize});
  };

  const WaGotoSearch = () => NavigationRef.Navigate('WaSearch');
  const WaGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{
        backgroundColor: colors.lightGrey4,
      }}>
      <Header
        leftIcon={AntDesign}
        rightIcon={Ionicons}
        rightIconColor="black"
        leftIconColor="black"
        leftIconName="left"
        rightIconName="ios-cart-outline"
        leftIconAction={WaGoBack}
        Title={
          <Text>
            Wear<Text style={{color: 'black'}}>All</Text>
          </Text>
        }
      />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View
          style={{
            marginTop: HEIGHT * 0.04,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ImageBackground
            source={WaProduct.images}
            style={{
              width: '90%',
              height: HEIGHT * 0.45,
              backgroundColor: `rgba(${colors.rgb_Primary}, 0.6)`,
              // backgroundColor: WaProduct.bgColor,
              borderRadius: 10,
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
            }}
            resizeMode="contain">
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 50,
                padding: 5,
                margin: 12,
              }}>
              <Ionicons
                name="heart-outline"
                color={colors.primary}
                size={H_W.width * 0.07}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 27,
            marginLeft: H_W.width * 0.05,
            marginTop: HEIGHT * 0.02,
          }}>
          {WaProduct.productName}
        </Text>
        <View
          style={{
            marginTop: HEIGHT * 0.005,
            marginBottom: HEIGHT * 0.025,
            height: 3,
            marginLeft: H_W.width * 0.05,
            backgroundColor: colors.primary,
            width: '15%',
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            color: colors.lightGrey3,
            marginLeft: H_W.width * 0.05,
            width: H_W.width * 0.85,
            marginBottom: HEIGHT * 0.025,
          }}>
          {WaProduct.Description}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: colors.darkGray,
            marginLeft: H_W.width * 0.05,
          }}>
          Size
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginLeft: H_W.width * 0.05,
            marginTop: HEIGHT * 0.01,
          }}>
          {Sizes.map((size, index) => {
            return (
              <TouchableOpacity
                onPress={() => setCurrentSize(size)}
                key={index}
                style={{
                  paddingHorizontal: H_W.width * 0.02,
                  paddingVertical: HEIGHT * 0.01,
                  borderRadius: 7,
                  marginRight: H_W.width * 0.05,
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
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: HEIGHT * 0.02,
          }}>
          <View
            style={{
              // ...(props.cart[pdt.id] !== undefined && props.cart[pdt.id] !== 0
              //   ? styles.conditionalElevation
              //   : {}),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '80%',
              // marginBottom: HEIGHT * 0.02,

              paddingVertical: HEIGHT * 0.01,
              backgroundColor:
                props.WaCart[`${WaProduct.id}_${currentSize}`] !== undefined &&
                props.WaCart[`${WaProduct.id}_${currentSize}`] !== 0
                  ? 'white'
                  : colors.lightBackground,
              // backgroundColor: 'white',
              borderRadius: 50,
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
                <View
                  style={{
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
                  }}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: H_W.width * 0.05,
                    }}>
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
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                }}
                containerStyle={{
                  width: '100%',
                  borderRadius: 50,
                }}
              />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}
const border = {
  borderWidth: 1,
  borderColor: 'red',
};
const styles = StyleSheet.create({
  singleProduct_CE23: {},
  singleProduct_CE20: {},
  singleProduct_CE19: {},
  singleProduct_CE18: {},
  singleProduct_CE16: {},
  singleProduct_CE15: {},
  singleProduct_CE14: {},
  singleProduct_CE13: {},
  singleProduct_CE12: {},
  singleProduct_CE11: {},
  singleProduct_CE10: {},
  singleProduct_CE9: {},
  singleProduct_CE8: {},
  singleProduct_CE7: {},
  singleProduct_CE6: {},
  singleProduct_CE5: {},
  singleProduct_CE4: {},
  singleProduct_CE3: {},
  singleProduct_CE2: {},
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
