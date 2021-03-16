/* eslint-disable react-native/no-inline-styles */
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
import Loop from '../WaComp/WaFlatList';
import {FruityTiles} from './WaHome';
import {H_W} from '../WaComp/WaDim';
const WaFavourites = props => {
  const WaGoToSingleProduct = item => {
    props.WasetCurrentProductAction(item);
    NavigationRef.Navigate('WaSingleProduct');
  };

  const WaGoBack = () => NavigationRef.Navigate('WaHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={WaGoBack}
        Title="Favourites"
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: H_W.width * 0.05,
          fontWeight: 'bold',
          marginTop: H_W.height * 0.08,
        }}>
        You have {props.WaFavs.length} Favourite items
      </Text>
      <ScrollView bounces={false}>
        <View style={styles.fav_SL1}>
          <Loop
            data={props.WaFavs}
            renderItem={({item}) => (
              <FruityTiles
                item={item}
                WaGoToSingleProduct={WaGoToSingleProduct}
                WaFavs={props.WaFavs}
                WaRemoveFavAct={i => props.WaremoveFavAction(i)}
                WaSetFavAct={i => props.WasetFavAction(i)}
              />
            )}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  fav_SL2: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  fav_SL1: {
    flex: 1,
    paddingLeft: H_W.width * 0.027,
    paddingTop: H_W.height * 0.025,
  },
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
