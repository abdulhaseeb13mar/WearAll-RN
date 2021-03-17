/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../WaComp/WrapperScreen';
import {colors} from '../WaComp/WaColor';
import {H_W} from '../WaComp/WaDim';
import Data from '../WAData';
import Loop from '../WaComp/WaFlatList';
import RefNavigation from '../WaComp/RefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  WasetCurrentProductAction,
  WaremoveFavAction,
  WasetFavAction,
} from '../WaRedux/WaActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import WaSearchBar from '../WaComp/WaSearchBar';
import Header from '../WaComp/WaHeader';

function WaHome(props) {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const [WaCategories, setCategories] = useState(Data.category);

  const WaGotoCart = () => RefNavigation.Navigate('WaCart');
  const WaGotoFav = () => RefNavigation.Navigate('WaFav');
  const WaGotoSearch = () => RefNavigation.Navigate('WaSearch');
  const WaGoToSingleProduct = item => {
    props.WasetCurrentProductAction(item);
    RefNavigation.Navigate('WaSP');
  };
  const WaGotoAllProducts = item => RefNavigation.Navigate('WaAP', item);
  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <Header
        leftIcon={AntDesign}
        rightIcon={Ionicons}
        rightIconColor="black"
        leftIconColor="black"
        leftIconName="hearto"
        rightIconName="ios-cart-outline"
        leftIconAction={WaGotoFav}
        rightIconAction={WaGotoCart}
        Title={
          <Text>
            Wear<Text style={{color: 'black'}}>All</Text>
          </Text>
        }
      />
      <ScrollView>
        <View
          style={{
            ...styles.WaHome1,
            marginVertical: HEIGHT * 0.03,
          }}>
          <TouchableOpacity onPress={WaGotoSearch} style={{width: '90%'}}>
            <WaSearchBar editable={false} />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: HEIGHT * 0.03}}>
          <Loop
            data={WaCategories}
            renderItem={({item}) => (
              <WaTabs item={item} WaGotoAllProducts={WaGotoAllProducts} />
            )}
          />
        </View>
        <Text
          style={{
            ...styles.WaHome2,
            marginBottom: HEIGHT * 0.02,
          }}>
          Featured Products
        </Text>
        <View style={{marginBottom: HEIGHT * 0.03}}>
          <Loop
            data={Data.featuredProducts}
            renderItem={({item}) => (
              <ProductList
                item={item}
                WaGoToSingleProduct={WaGoToSingleProduct}
              />
            )}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

export const ProductList = ({item, WaGoToSingleProduct, explore, isCart}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity onPress={() => WaGoToSingleProduct(item)}>
      <View
        style={{
          ...styles.WaHome3,
          marginHorizontal: explore ? 0 : H_W.width * 0.05,
          marginVertical: HEIGHT * 0.01,
        }}>
        <ImageBackground
          source={item.images}
          style={{width: '100%', height: HEIGHT * 0.2, borderRadius: 16}}
          imageStyle={{borderRadius: 16}}
          resizeMode="contain"
        />
        <View
          style={{
            ...styles.WaHome4,
            paddingVertical: HEIGHT * 0.02,
          }}>
          <Text
            style={{
              ...styles.WaHome5,
              fontSize: explore ? 16 : 18,
            }}>
            {item.productName}
          </Text>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: HEIGHT * 0.025,
              ...styles.WaHome6,
            }}
          />
          <Text style={{fontWeight: 'bold', fontSize: 20}}>$ {item.Price}</Text>
          {isCart && (
            <Text
              style={{
                ...styles.WaHome7,
                marginTop: HEIGHT * 0.01,
              }}>
              {item.size}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const WaTabs = ({item, WaGotoAllProducts}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View style={styles.WaHome8}>
      <ImageBackground
        source={item.images}
        style={{width: '100%', height: HEIGHT * 0.3, borderRadius: 16}}
        imageStyle={{borderRadius: 16}}
        resizeMode="contain"
      />
      <View
        style={{
          ...styles.WaHome9,
          paddingVertical: HEIGHT * 0.03,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.WaHome10}>
            {item.categoryName}'s Fashion wear
          </Text>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: HEIGHT * 0.015,
              ...styles.WaHome11,
            }}
          />
        </View>
        <Button
          title="Discover        "
          raised
          onPress={() => WaGotoAllProducts(item)}
          titleStyle={{fontWeight: 'bold', color: colors.lightGrey3}}
          buttonStyle={styles.WaHome12}
          containerStyle={{borderRadius: 50}}
          iconRight
          icon={
            <FontAwesome
              name="long-arrow-right"
              size={20}
              color={colors.primary}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  WaHome21: {},
  WaHome20: {},
  WaHome19: {},
  WaHome18: {},
  WaHome17: {},
  WaHome16: {},
  WaHome15: {},
  WaHome14: {},
  WaHome13: {},
  WaHome12: {
    borderRadius: 50,
    backgroundColor: 'white',
    paddingHorizontal: H_W.width * 0.06,
  },
  WaHome11: {height: 2, backgroundColor: 'white', width: H_W.width * 0.15},
  WaHome10: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
    width: H_W.width * 0.65,
  },
  WaHome9: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    flex: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  WaHome8: {
    width: H_W.width * 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 16,
    marginHorizontal: H_W.width * 0.05,
  },
  WaHome7: {
    textAlign: 'right',
    width: '90%',
    color: colors.primary,
    fontWeight: 'bold',
  },
  WaHome6: {height: 3, backgroundColor: colors.primary, width: '20%'},
  WaHome5: {textAlign: 'center', fontWeight: 'bold', width: '90%'},
  WaHome4: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  WaHome3: {
    width: H_W.width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 16,
  },
  WaHome2: {fontWeight: 'bold', fontSize: 25, marginLeft: H_W.width * 0.05},
  WaHome1: {alignItems: 'center', justifyContent: 'center'},
});

const mapStateToProps = state => {
  return {
    WatotalItems: state.WaCartReducer.totalItems,
  };
};

export default connect(mapStateToProps, {
  WasetCurrentProductAction,
  WaremoveFavAction,
  WasetFavAction,
})(WaHome);
