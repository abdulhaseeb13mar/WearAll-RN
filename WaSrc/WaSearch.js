/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import WrapperScreen from '../WaComp/WrapperScreen';
import {H_W} from '../WaComp/WaDim';
import NavigationRef from '../WaComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Data from '../WAData';
import {connect} from 'react-redux';
import {WasetCurrentProductAction} from '../WaRedux/WaActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WaSearchBar from '../WaComp/WaSearchBar';
import {colors} from '../WaComp/WaColor';
import {ProductList} from './WaHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter(item =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const WaGoToSingleProduct = item => {
    props.WasetCurrentProductAction(item);
    NavigationRef.Navigate('WaSP');
  };

  const CardRender = Arr => {
    return Arr.map((item, index) => (
      <ProductList
        key={index}
        item={item}
        explore={true}
        WaGoToSingleProduct={WaGoToSingleProduct}
      />
    ));
  };
  const WaGoBack = () => NavigationRef.GoBack();

  const changeSearchText = t => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <View
        style={{
          height: HEIGHT * 0.15,
          ...styles.WaSearch1,
        }}>
        <View
          style={{
            ...styles.WaSearch2,
            marginTop: HEIGHT * 0.04,
            marginBottom: HEIGHT * 0.05,
          }}>
          <TouchableOpacity onPress={WaGoBack}>
            <Entypo name="chevron-left" color="white" size={H_W.width * 0.06} />
          </TouchableOpacity>
          <View style={{width: '85%', marginLeft: H_W.width * 0.05}}>
            <WaSearchBar changeSearchText={changeSearchText} />
          </View>
        </View>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            ...styles.WaSearch3,
            marginTop: HEIGHT * 0.04,
          }}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = state => ({
  WaFavs: state.WaToggleFav,
});

export default connect(mapStateToProps, {
  WasetCurrentProductAction,
})(Search);

const styles = StyleSheet.create({
  WaSearch1: {
    width: H_W.width,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.primary,
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
  WaSearch2: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  WaSearch3: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  WaSearch4: {},
  WaSearch5: {},
  WaSearch6: {},
  WaSearch7: {},
  WaSearch8: {},
  WaSearch9: {},
});
