import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker/src';

export default function CompletePaymentScreen(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Modal visible={isModalVisible} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#00000066',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: 16,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 20,
            }}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <MaterialCommunityIcons
                name={'window-close'}
                style={{alignSelf: 'flex-end'}}
                size={22}
              />
            </TouchableWithoutFeedback>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '500',
                marginBottom: 48,
              }}>
              Unggah Bukti Pembayaran
            </Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => {
                   ImagePicker.launchImageLibrary(
                    {
                      mediaType: 'photo',
                    },
                    async (response) => {

                    })
              }}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#3066D2',
                    borderRadius: 8,
                    paddingVertical: 8,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontWeight: '500',
                      fontSize: 13,
                      color: '#3066D2',
                      textAlign: 'center',
                    }}>
                    Dari Gallery
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(false);

                  props.navigation.navigate('PaymentSuccessScreen');
                }}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#3066D2',
                    backgroundColor: '#3066D2',
                    borderRadius: 8,
                    paddingVertical: 8,
                    marginLeft: 16,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontWeight: '500',
                      fontSize: 13,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Kamera
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'ios' ? 60 : 16,
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
            Selesaikan Pembayaran
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

      <ScrollView contentContainerStyle={{padding: 16}}>
        <View
          style={{
            overflow: 'hidden',
            backgroundColor: '#c1d9fb',
            borderWidth: 1,
            borderColor: '#2F80ED',
            borderRadius: 10,
            flexDirection: 'row',
            paddingVertical: 8,
            paddingHorizontal: 11,
          }}>
          <Image
            source={require('../../assets/images/ic_information.png')}
            style={{
              position: 'absolute',
              opacity: 0.25,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          />

          <Text style={{fontFamily: 'Avenir', color: '#4f4f4f', flex: 1}}>
            Selesaikan pembayaran Anda dalam{' '}
            <Text style={{fontWeight: '500'}}>23:59:00</Text>
          </Text>

          <MaterialCommunityIcons name={'window-close'} size={20} />
        </View>

        <View
          style={{
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 1,
            borderRadius: 8,
            paddingVertical: 18,
            paddingLeft: 22,
            marginTop: 15,
            paddingRight: 16,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'Avenir',
                color: '#373737',
                fontWeight: '700',
                flex: 1,
              }}>
              Bank Transfer
            </Text>

            <Image
              source={require('../../assets/images/ic_mandiri.png')}
              style={{width: 60 * 1.1, height: 19 * 1.1}}
            />
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: '#e3e3e3',
              marginTop: 16,
              marginBottom: 23,
            }}
          />

          <Text style={{fontFamily: 'Avenir', fontSize: 13, color: '#909090'}}>
            Nomor Rekening
          </Text>

          <View style={{flexDirection: 'row', marginTop: 8}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  color: '#373737',
                  fontWeight: '700',
                }}>
                163 334 094847446
              </Text>

              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontSize: 13,
                  color: '#909090',
                  marginTop: 1,
                }}>
                PT. Unison (Tanjung Priuk)
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '700',
                  color: '#3066D2',
                }}>
                Salin
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontFamily: 'Avenir',
              fontSize: 13,
              color: '#909090',
              marginTop: 16,
            }}>
            Total Pembayaran
          </Text>

          <View style={{flexDirection: 'row', marginTop: 8}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  color: '#373737',
                  fontWeight: '700',
                }}>
                Rp300.123
              </Text>

              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontSize: 13,
                  color: '#3066D2',
                  marginTop: 1,
                }}>
                Transfer hingga 3 digit terakhir
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '700',
                  color: '#3066D2',
                }}>
                Salin
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontFamily: 'Avenir',
              fontWeight: '700',
              textAlign: 'center',
              color: '#3066D2',
              marginTop: 40,
              textDecorationLine: 'underline',
            }}>
            Lihat Cara Pembayaran
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 1,
            borderRadius: 8,
            paddingVertical: 18,
            paddingLeft: 22,
            marginTop: 15,
            paddingRight: 16,
          }}>
          <Text
            style={{
              fontFamily: 'Avenir',
              color: '#373737',
              fontWeight: '700',
              flex: 1,
            }}>
            Sudah Menyelesaikan Pembayaran ?
          </Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View
              style={{
                backgroundColor: '#e8752e',
                paddingVertical: 8,
                borderRadius: 8,
                marginTop: 16,
              }}>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontWeight: '700',
                  fontSize: 13,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Unggah Bukti Pembayaran
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.1,
          elevation: 1,
          shadowRadius: 1,
          paddingBottom: 25,
        }}>
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#3066D2',
              borderRadius: 8,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '500',
                fontSize: 13,
                color: '#3066D2',
                textAlign: 'center',
              }}>
              Cek Status Pembayaran
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#3066D2',
              backgroundColor: '#3066D2',
              borderRadius: 8,
              paddingVertical: 8,
              marginLeft: 16,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '500',
                fontSize: 13,
                color: 'white',
                textAlign: 'center',
              }}>
              Kembali ke Beranda
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
