/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {H_W} from '../WaComp/WaDim';
import WrapperScreen from '../WaComp/WrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../WaComp/WaColor';
import NavigationRef from '../WaComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WaSearchBar from '../WaComp/WaSearchBar';
import {Button, Avatar} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  WaremoveFavAction,
  WasetFavAction,
  WaaddCartAction,
  WaremoveCartAction,
} from '../WaRedux/WaActions';

function SingleProduct(props) {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const WaProduct = props.WaProduct;

  const WaAddToCart = () => {
    props.WaaddCartAction({...WaProduct});
  };
  const WaRemoveFromCart = () => {
    props.WaCart[WaProduct.id].added !== 0 &&
      props.WaremoveCartAction(WaProduct);
  };

  const WaGotoSearch = () => NavigationRef.Navigate('WaSearch');
  const WaGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`,
      }}>
      <View
        style={{
          width: H_W.width,
          height: HEIGHT * 0.3,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: colors.primary,
          position: 'absolute',
          top: 0,
          zIndex: -1,
        }}
      />
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          paddingHorizontal: H_W.width * 0.04,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: HEIGHT * 0.02,
            marginBottom: HEIGHT * 0.05,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPreWa={WaGoBack}>
            <Entypo name="chevron-left" color="white" size={H_W.width * 0.06} />
          </TouchableOpacity>
          <TouchableOpacity
            onPreWa={WaGotoSearch}
            style={{width: '85%', marginLeft: H_W.width * 0.05, zIndex: 5}}>
            <WaSearchBar editable={false} />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'space-between'}}>
          <View>
            <Avatar
              rounded
              size={H_W.width * 0.75}
              source={WaProduct.images}
              containerStyle={{
                backgroundColor: colors.secondary,
                elevation: 24,
                marginLeft: H_W.width * 0.04,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
              }}
            />
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              width: H_W.width * 0.8,
              color: colors.primary,
              fontSize: 28,
              marginTop: HEIGHT * 0.04,
            }}>
            {WaProduct.productName}
          </Text>
          <Text
            style={{
              color: `rgba(${colors.rgb_Primary}, 0.6)`,
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: HEIGHT * 0.02,
            }}>
            {WaProduct.Description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: HEIGHT * 0.035,
            }}>
            {props.WaCart[WaProduct.id] !== undefined &&
            props.WaCart[WaProduct.id].added !== 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  width: H_W.width * 0.4,
                  alignSelf: 'stretch',
                  backgroundColor: 'white',
                  borderColor: colors.primary,
                  borderWidth: 1.5,
                  borderRadius: 15,
                }}>
                <TouchableOpacity onPreWa={WaRemoveFromCart}>
                  <Entypo name="minus" size={H_W.width * 0.055} />
                </TouchableOpacity>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {props.WaCart[WaProduct.id].added}
                </Text>
                <TouchableOpacity onPreWa={WaAddToCart}>
                  <Entypo name="plus" size={H_W.width * 0.055} />
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                title="Add to Cart"
                onPreWa={WaAddToCart}
                buttonStyle={{
                  borderRadius: 15,
                  backgroundColor: colors.secondary,
                  width: H_W.width * 0.4,
                  paddingVertical: HEIGHT * 0.017,
                }}
                containerStyle={{
                  borderRadius: 15,
                  backgroundColor: colors.secondary,
                }}
              />
            )}
            <Text
              style={{
                backgroundColor: colors.secondary,
                fontWeight: 'bold',
                fontSize: 19,
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
                padding: H_W.width * 0.03,
                borderRadius: 10,
              }}>
              ${WaProduct.Price}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

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
