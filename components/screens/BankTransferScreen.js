import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BankTransferScreen(props) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 60,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.15,
          elevation: 3,
          shadowRadius: 5,
          paddingBottom: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}>
          <View>
            <MaterialCommunityIcons
              name={'chevron-left'}
              size={28}
              onPress={() => props.navigation.goBack(null)}
            />
          </View>
          <Text
            style={{
              fontFamily: 'Avenir',
              flex: 1,
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
            }}>
            Bank Transfer
          </Text>

          <View>
            <MaterialCommunityIcons
              name={'chevron-left'}
              size={28}
              style={{opacity: 0}}
            />
          </View>
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.goBack(null);
          props.navigation.getParam('setBankTransferChosen')(true);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 16,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 1,
            borderRadius: 8,
            paddingVertical: 18,
            paddingLeft: 22,
            marginTop: 15,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/images/ic_mandiri.png')}
            style={{width: 60 * 1.1, height: 19 * 1.1}}
          />

          <Text
            style={{marginLeft: 46, fontFamily: 'Avenir', fontWeight: '700'}}>
            Bank Mandiri
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 16,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 1,
            borderRadius: 8,
            paddingVertical: 18,
            paddingLeft: 22,
            marginTop: 15,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/images/ic_bca.png')}
            style={{width: 57 * 1.1, height: 19 * 1.1}}
          />

          <Text
            style={{marginLeft: 49, fontFamily: 'Avenir', fontWeight: '700'}}>
            BCA, Tbk
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 16,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 1,
            borderRadius: 8,
            paddingVertical: 18,
            paddingLeft: 22,
            marginTop: 15,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/images/ic_bri.png')}
            style={{width: 80 * 1.1, height: 19 * 1.1}}
          />

          <Text
            style={{marginLeft: 26, fontFamily: 'Avenir', fontWeight: '700'}}>
            Bank Rakyat Indonesia
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
