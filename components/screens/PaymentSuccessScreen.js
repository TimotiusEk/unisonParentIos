import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function PaymentSuccessScreen() {
  const [cardHeight, setCardHeight] = useState(0);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/ic_checked.png')}
          style={{width: 110, height: 110, marginBottom: 24}}
        />

        <Text style={{fontFamily: 'Avenir', fontWeight: '500', fontSize: 20}}>
          Terima Kasih
        </Text>

        <Text style={{fontFamily: 'Avenir', marginTop: 4}}>
          Booking Anda telah sukses terbayar
        </Text>
      </View>

      <View
        onLayout={(event) => {
          setCardHeight(event.nativeEvent.layout.height);
        }}
        style={{
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.1,
          elevation: 3,
          shadowRadius: 3,
          marginBottom: 40,
          padding: 16,
          borderRadius: 8,
          //   overflow: 'hidden'
        }}>
        <Image
          source={require('../../assets/images/wave.png')}
          style={{
            position: 'absolute',
            bottom: -1,
            right: 0,
            borderBottomRightRadius: 10,
            height: cardHeight,
          }}
        />
        <Text
          style={{fontFamily: 'Avenir', fontWeight: '600', color: '#373737'}}>
          Kelas akan dilaksanakan pada
        </Text>

        <View style={{flexDirection: 'row', marginLeft: 3}}>
          <MaterialIcons
            name={'date-range'}
            size={16}
            color={'#66666680'}
            style={{marginTop: 18}}
          />

          <Text
            style={{
              fontFamily: 'Avenir',
              color: '#66666680',
              marginLeft: 7,
              marginTop: 16,
            }}>
            31 Dec 2020 - 30 Jan 2021
          </Text>
        </View>

        <Text
          style={{
            fontFamily: 'Avenir',
            textDecorationLine: 'underline',
            color: '#3066D2',
            marginTop: 10,
          }}>
          Tambahkan ke kalender
        </Text>
      </View>
    </View>
  );
}
