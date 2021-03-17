/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../WaComp/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {H_W} from '../WaComp/WaDim';
import {colors} from '../WaComp/WaColor';
import {Button, Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {isFormValid} from '../WaComp/validation';
import NavPointer from '../WaComp/RefNavigation';
import {WaUserAction, WaresetCart} from '../WaRedux/WaActions';
import Toast from 'react-native-root-toast';
import UseHeader from '../WaComp/WaHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ConfirmOrder = props => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');

  const Confirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      props.WaUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = msg => {
    Toast.show(msg, {
      position: -60,
      backgroundColor: colors.secondary,
      opacity: 1,
      textColor: 'white',
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            address: address,
            phonenumber: phone,
            email: email,
            appname: 'Wear All',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status
        ? NavPointer.Push('WaConfirmOrder')
        : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    props.WaresetCart();
    NavPointer.Push('WaHome');
  };

  const changeAddress = t => setAddress(t);
  const changeEmail = t => setEmail(t);
  const changeFirstName = t => setFirstName(t);
  const goBack = () => NavPointer.GoBack();
  const changePhone = t => setPhone(t);

  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          Title="Checkout"
          leftIconAction={goBack}
          titleStyle={{
            textShadowColor: '#bcbcbc',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 2,
          }}
          leftIconStyle={{
            textShadowColor: '#bcbcbc',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 2,
          }}
        />
        <View style={styles.WaPersonalInfoWrapper}>
          <View style={styles.WaSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.WaPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              YOUR NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.WaPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.lightGrey3}
              />
              <MaterialIcons
                name="drive-file-rename-outline"
                size={H_W.width * 0.07}
                style={styles.WaInputIcon}
              />
            </View>
          </View>
          <View style={styles.WaSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.WaPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              YOUR EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.WaPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.lightGrey3}
              />
              <MaterialIcons
                name="mail"
                size={H_W.width * 0.07}
                style={styles.WaInputIcon}
              />
            </View>
          </View>
          <View style={styles.WaSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.WaPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              YOUR PHONE NUMBER<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.WaPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.lightGrey3}
              />
              <FontAwesome5
                name="phone"
                size={H_W.width * 0.07}
                style={styles.WaInputIcon}
              />
            </View>
          </View>
          <View style={styles.WaSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.WaPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.WaPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeAddress}
                placeholderTextColor={colors.lightGrey3}
              />
              <FontAwesome5
                name="map-marker-alt"
                size={H_W.width * 0.07}
                style={styles.WaInputIcon}
              />
            </View>
          </View>
        </View>
        <View style={{...styles.WaSummaryOverlay, marginBottom: HEIGHT * 0.02}}>
          <View style={styles.WaSm1}>
            <View style={styles.WaSm2}>
              <Text style={{fontWeight: 'bold'}}>Total:</Text>
              <Text style={{fontWeight: 'bold'}}>${props.total}</Text>
            </View>
            <View style={styles.WaSm3}>
              <Text style={styles.WaSm4}>Payment Mode:</Text>
              <Text style={styles.WaSm4}>Payment on delivery</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.WaConfirmButtonWrapper,
            marginBottom: HEIGHT * 0.02,
          }}>
          <Button
            title="CONFIRM ORDER"
            raised
            containerStyle={styles.WaConfirmButtonContainer}
            buttonStyle={{
              ...styles.WaConfirmButton,
              padding: HEIGHT * 0.018,
            }}
            titleStyle={{color: 'white', fontWeight: 'bold'}}
            loadingProps={{color: 'black'}}
            loading={loading}
            onPress={Confirm}
          />
        </View>
        <Overlay
          onBackdropPreWa={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.WaModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <Ionicons
              name="ios-ice-cream-sharp"
              size={H_W.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.WaModalHeadText}>THANK YOU!</Text>
            <Text style={styles.WaModalSubText}>
              You will recieve your ice cream shortly!
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = state => {
  return {
    total: state.WaCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {WaUserAction, WaresetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  WaSm4: {fontSize: H_W.width * 0.03, fontWeight: 'bold'},
  WaSm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  WaSm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  WaSm1: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: H_W.width * 0.04,
  },
  WaSummaryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WaModalSubText: {
    fontSize: H_W.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  WaModalHeadText: {
    fontSize: H_W.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  WaModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
  },
  WaConfirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
  },
  WaConfirmButton: {
    backgroundColor: colors.primary,

    borderRadius: 15,
  },
  WaConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: H_W.width * 0.035,
  },
  Input: {
    width: H_W.width * 0.81,
    color: colors.primary,
    fontWeight: 'bold',
  },
  WaInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.primary,
  },
  WaPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  WaPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  WaSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  WaPersonalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  WaPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
