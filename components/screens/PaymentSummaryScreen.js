import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PaymentSummaryScreen(props) {
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
            Ringkasan Pemesanan
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

      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            marginTop: 20,
            marginHorizontal: 16,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}>
          <Image
            source={require('../../assets/images/example_class_cover_photo.jpg')}
            style={{width: 50, height: 50, borderRadius: 4}}
          />

          <View
            style={{
              marginLeft: 17,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '700',
                color: '#373737',
              }}>
              Matematika kelas 8 SMP
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Avenir',
                fontFamily: 'Avenir',
                fontWeight: '700',
                color: '#3066D2',
                marginTop: 3,
              }}>
              Rp300.000
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            marginTop: 20,
            marginHorizontal: 16,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '500',
                color: '#373737',
                flex: 1,
              }}>
              Matematika kelas 8 SMP 1x
            </Text>

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 13,
                color: '#909090',
              }}>
              Rp300.000
            </Text>
          </View>

          <View style={{flexDirection: 'row', flex: 1, marginTop: 15}}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '500',
                color: '#373737',
                flex: 1,
              }}>
              Biaya Pemesanan
            </Text>

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 13,
                color: '#909090',
              }}>
              Rp0
            </Text>
          </View>

          <View
            style={{height: 1, backgroundColor: '#e3e3e3', marginTop: 15}}
          />

          <View style={{flexDirection: 'row', flex: 1, marginTop: 15}}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '700',
                color: '#333333',
                flex: 1,
              }}>
              Total
            </Text>

            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '700',
                color: '#333333',
              }}>
              Rp300.000
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: 'white',
          paddingBottom: 35,
        }}>
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('PaymentScreen')}>
          <View
            style={{
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.1,
              elevation: 3,
              shadowRadius: 3,
              borderRadius: 10,
              marginHorizontal: 16,
              marginTop: 17,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3066D2',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                      fontWeight: '700',
                      fontSize: 13,
                      color: 'white',
              }}>
              Pilih Pembayaran
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
