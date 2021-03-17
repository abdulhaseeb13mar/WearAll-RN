import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {
  WaremoveFavAction,
  WasetFavAction,
  WasetCurrentProductAction,
} from '../WaRedux/WaActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../WaComp/WaHeader';
import WrapperScreen from '../WaComp/WrapperScreen';
import NavigationRef from '../WaComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProductList} from './WaHome';
import {colors} from '../WaComp/WaColor';
import {H_W} from '../WaComp/WaDim';

const WaFavourites = props => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const WaGoToSingleProduct = item => {
    props.WasetCurrentProductAction(item);
    NavigationRef.Navigate('WaSP');
  };

  const WaGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={WaGoBack}
        Title="Favourites"
      />
      <Text
        style={{
          ...styles.WaFav1,
          marginTop: HEIGHT * 0.03,
        }}>
        You have {props.WaFavs.length} Favourite items
      </Text>
      <ScrollView bounces={false}>
        <View
          style={{
            ...styles.WaFav2,
            marginTop: HEIGHT * 0.04,
          }}>
          {props.WaFavs.length > 0 &&
            props.WaFavs.map((item, index) => (
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

const styles = StyleSheet.create({
  WaFav1: {textAlign: 'center', fontSize: H_W.width * 0.05, fontWeight: 'bold'},
  WaFav2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  WaFav3: {},
  WaFav4: {},
  WaFav5: {},
});

const mapStateToProps = state => {
  return {
    WaFavs: state.WaToggleFav,
  };
};

export default connect(mapStateToProps, {
  WasetFavAction,
  WasetCurrentProductAction,
  WaremoveFavAction,
})(WaFavourites);
