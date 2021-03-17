/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Avatar, Badge, Button} from 'react-native-elements';
import WaSearchBar from '../WaComp/WaSearchBar';
import Header from '../WaComp/WaHeader';

function WaHome(props) {
  useEffect(() => {
    WaChangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const [WaCategories, setCategories] = useState(Data.category);
  const [WaCurrentCat, setCurrentCat] = useState(Data.category[0]);
  const [WaTabProducts, setTabProducts] = useState([]);

  const WaChangeTab = tab => {
    setCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      item => item.categoryId === tab.id,
    );
    setTabProducts(filteredProducts);
  };

  // const WaGotoCart = () => RefNavigation.Navigate('WaCart');
  // const WaGotoSearch = () => RefNavigation.Navigate('WaSearch');
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
        // leftIconAction=
        Title={
          <Text>
            Wear<Text style={{color: 'black'}}>All</Text>
          </Text>
        }
      />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: HEIGHT * 0.03,
          }}>
          <View style={{width: '90%'}}>
            <WaSearchBar editable={false} />
          </View>
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
            fontWeight: 'bold',
            fontSize: 25,
            marginLeft: H_W.width * 0.05,
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

export const ProductList = ({item, WaGoToSingleProduct, explore}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity onPress={() => WaGoToSingleProduct(item)}>
      <View
        style={{
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
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: HEIGHT * 0.02,
            backgroundColor: 'white',
            flex: 1,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: explore ? 16 : 18,
              width: '90%',
            }}>
            {item.productName}
          </Text>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: HEIGHT * 0.025,
              height: 3,
              backgroundColor: colors.primary,
              width: '20%',
            }}
          />
          <Text style={{fontWeight: 'bold', fontSize: 20}}>$ {item.Price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const WaTabs = ({item, WaGotoAllProducts}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
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
      }}>
      <ImageBackground
        source={item.images}
        style={{width: '100%', height: HEIGHT * 0.3, borderRadius: 16}}
        imageStyle={{borderRadius: 16}}
        resizeMode="contain"
      />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: HEIGHT * 0.03,
          backgroundColor: colors.primary,
          flex: 1,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 23,
              width: H_W.width * 0.65,
            }}>
            {item.categoryName}'s Fashion wear
          </Text>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: HEIGHT * 0.015,
              height: 2,
              backgroundColor: 'white',
              width: H_W.width * 0.15,
            }}
          />
        </View>
        <Button
          title="Discover        "
          raised
          onPress={() => WaGotoAllProducts(item)}
          titleStyle={{fontWeight: 'bold', color: colors.lightGrey3}}
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: 'white',
            paddingHorizontal: H_W.width * 0.06,
          }}
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

const border = {
  borderWidth: 1,
  borderColor: 'red',
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
  WaHome12: {},
  WaHome11: {},
  WaHome10: {},
  WaHome9: {},
  WaHome8: {},
  WaHome7: {},
  WaHome6: {},
  WaHome5: {},
  WaHome4: {},
  WaHome3: {},
  WaHome2: {},
  WaHome1: {},
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  tabIndicator: {
    width: '100%',
    borderWidth: 1.8,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: colors.primary,
  },
  HomeTabsText: {
    fontSize: 16,
    fontWeight: '700',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: H_W.width * 0.05,
    height: H_W.width * 0.1,
    paddingHorizontal: H_W.width * 0.02,
    paddingTop: H_W.width * 0.02,
  },
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
