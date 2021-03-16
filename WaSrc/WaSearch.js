/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import WrapperScreen from '../WaComp/WrapperScreen';
import {H_W} from '../WaComp/WaDim';
import NavigationRef from '../WaComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Data from '../WaData';
import {connect} from 'react-redux';
import {WasetCurrentProductAction} from '../WaRedux/WaActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WaSearchBar from '../WaComp/WaSearchBar';
import {colors} from '../WaComp/WaColor';
import {Avatar} from 'react-native-elements';

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
      <View
        key={index}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: HEIGHT * 0.02,
        }}>
        <TouchableOpacity onPreWa={() => WaGoToSingleProduct(item)}>
          <Avatar
            rounded
            size={H_W.width * 0.6}
            source={item.images}
            containerStyle={{
              backgroundColor: colors.secondary,
              elevation: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              marginLeft: H_W.width * 0.04,
            }}
          />
        </TouchableOpacity>
      </View>
    ));
  };
  const WaGoBack = () => NavigationRef.GoBack();

  const changeSearchText = t => setSearchText(t);
  return (
    <WrapperScreen
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`,
      }}>
      <View
        style={{
          width: H_W.width,
          height: HEIGHT * 0.15,
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
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: HEIGHT * 0.04,
            marginBottom: HEIGHT * 0.05,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPreWa={WaGoBack}>
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
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.product)}
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
