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
import Data from '../WaData';
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
import {Avatar, Badge} from 'react-native-elements';
import WaSearchBar from '../WaComp/WaSearchBar';
import dp from '../WaPhotos/dp.jpg';

function WaHome(props) {
  useEffect(() => {
    changeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [categories, setCategories] = useState(Data.category);
  const [currentCat, setCurrentCat] = useState(Data.category[0]);
  const [tabProducts, setTabProducts] = useState([]);

  const changeTab = tab => {
    setCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      item => item.categoryId === tab.id,
    );
    setTabProducts(filteredProducts);
  };

  const WaGotoCart = () => RefNavigation.Navigate('WaCart');
  const WaGotoSearch = () => RefNavigation.Navigate('WaSearch');
  const WaGoToSingleProduct = item => {
    props.WasetCurrentProductAction(item);
    RefNavigation.Navigate('WaSP');
  };
  return (
    <WrapperScreen
      style={{backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`}}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: HEIGHT * 0.02,
            marginBottom: HEIGHT * 0.05,
            paddingHorizontal: H_W.width * 0.05,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPreWa={WaGotoSearch}
            style={{width: H_W.width * 0.65}}>
            <WaSearchBar editable={false} />
          </TouchableOpacity>
          <TouchableOpacity onPreWa={WaGotoCart} style={{padding: 4}}>
            <MaterialIcons
              name="shopping-bag"
              size={H_W.width * 0.1}
              color={colors.primary}
            />
            {props.WatotalItems > 0 && (
              <Badge
                value={props.WatotalItems}
                containerStyle={styles.badgeContainer}
                badgeStyle={{
                  backgroundColor: colors.secondary,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: H_W.width * 0.07,
            marginBottom: HEIGHT * 0.03,
          }}>
          <View>
            <Text
              style={{fontWeight: 'bold', color: colors.primary, fontSize: 23}}>
              Victoria Topsy
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                marginTop: HEIGHT * 0.005,
              }}>
              Away Last 15 min
            </Text>
          </View>
          <Avatar rounded size={H_W.width * 0.15} source={dp} />
        </View>
        <View style={{marginBottom: HEIGHT * 0.03}}>
          <Loop
            data={categories}
            renderItem={({item}) => (
              <TabList
                item={item}
                currentCat={currentCat}
                changeTab={changeTab}
              />
            )}
          />
        </View>
        <View style={{}}>
          <Loop
            data={tabProducts}
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

export const ProductList = ({item, WaGoToSingleProduct}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity onPreWa={() => WaGoToSingleProduct(item)}>
      <ImageBackground
        source={item.images}
        resizeMode="contain"
        imageStyle={{borderRadius: 30}}
        style={{
          width: H_W.width * 0.7,
          height: HEIGHT * 0.6,
          backgroundColor: colors.secondary,
          borderRadius: 30,
          marginHorizontal: H_W.width * 0.05,
          position: 'relative',
          overflow: 'hidden',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: 'white',
            borderRadius: 50,
            opacity: 0.2,
            transform: [{scaleX: 4.5}, {scaleY: 4}],
            position: 'absolute',
            top: 0,
            zIndex: -1,
          }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const TabList = ({item, changeTab, currentCat}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPreWa={() => changeTab(item)}>
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.categoryName === currentCat.categoryName
              ? colors.primary
              : `rgba(${colors.rgb_Primary}, 0.5)`,
        }}>
        {item.categoryName}
      </Text>
      {item.categoryName === currentCat.categoryName ? (
        <View style={styles.tabIndicator} />
      ) : null}
    </TouchableOpacity>
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
