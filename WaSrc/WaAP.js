/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import RefNavigation from '../WaComp/RefNavigation';
import WrapperScreen from '../WaComp/WrapperScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../WaComp/WaColor';
import {H_W} from '../WaComp/WaDim';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../WaComp/WaHeader';
import Loop from '../WaComp/WaFlatList';
import {ProductList} from './WaHome';
import Data from '../WAData';
import {WasetCurrentProductAction} from '../WaRedux/WaActions';

export const WaAP = props => {
  useEffect(() => {
    FilterProducts();
  }, []);
  const [Products, setProducts] = useState([]);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const FilterProducts = () => {
    const id = props.route.params.id;
    const categoryProducts = Data.product.filter(
      item => item.categoryId === id,
    );
    setProducts(categoryProducts);
  };

  const WaGoToSingleProduct = item => {
    props.WasetCurrentProductAction(item);
    RefNavigation.Navigate('WaSP');
  };

  const WaGoBack = () => RefNavigation.GoBack();
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
        Title={
          <Text>
            Wear<Text style={{color: 'black'}}>All</Text>
          </Text>
        }
      />
      <ScrollView bounces={false}>
        <Text
          style={{
            marginTop: HEIGHT * 0.04,
            fontWeight: 'bold',
            fontSize: 32,
            paddingLeft: H_W.width * 0.05,
          }}>
          {props.route.params.categoryName}'s Fashion
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 32,
            paddingLeft: H_W.width * 0.05,
          }}>
          Wear
        </Text>
        <View
          style={{
            marginTop: HEIGHT * 0.01,
            marginBottom: HEIGHT * 0.015,
            marginLeft: H_W.width * 0.05,
            height: 3,
            backgroundColor: colors.primary,
            width: H_W.width * 0.15,
          }}
        />
        <Text
          style={{
            marginLeft: H_W.width * 0.05,
            color: colors.lightGrey3,
            fontWeight: 'bold',
            fontSize: 20,
            fontStyle: 'italic',
          }}>
          Explore your true style
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            marginTop: HEIGHT * 0.04,
          }}>
          {Products.length > 0 &&
            Products.map((item, index) => (
              <ProductList
                key={index}
                item={item}
                explore={true}
                WaGoToSingleProduct={WaGoToSingleProduct}
              />
            ))}
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {WasetCurrentProductAction})(WaAP);
