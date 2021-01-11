import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Modal,
    Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PaymentScreen(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBankTransferChosen, setBankTransferChosen] = useState(false); //for mockup purpose

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
              Buka Aplikasi “Gojek” ?
            </Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
                    Batalkan
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
                    Ya, Lanjutkan
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
            Pembayaran
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

      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            marginTop: 20,
            marginHorizontal: 16,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 1,
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
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            elevation: 1,
            shadowRadius: 1,
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

        <Text
          style={{
            fontFamily: 'Avenir',
            fontWeight: '700',
            paddingLeft: 16,
            fontSize: 16,
            marginTop: 25,
          }}>
          Pilih Metode Pembayaran
        </Text>

        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
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
            }}>
            <Image
              source={require('../../assets/images/ic_gopay.png')}
              style={{width: 53 * 1.1, height: 11 * 1.1}}
            />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() =>
            props.navigation.navigate('BankTransferScreen', {
              setBankTransferChosen: (isBankTransferChosen) =>
                setBankTransferChosen(isBankTransferChosen),
            })
          }>
          <View
            style={{
              backgroundColor: isBankTransferChosen ? '#f6f7fc' : 'white',
              marginHorizontal: 16,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.1,
              elevation: 1,
              shadowRadius: 1,
              borderRadius: 8,
              paddingVertical: 18,
              paddingHorizontal: 22,
              marginTop: 20,
              borderWidth: isBankTransferChosen ? 1 : 0,
              borderColor: '#3E6EDE'
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontFamily: 'Avenir', fontWeight: '700', flex: 1}}>
                Bank Transfer
              </Text>

              <MaterialIcons
                name={'chevron-right'}
                color={'#25282B'}
                size={22}
              />
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: '#e3e3e3',
                marginTop: 10,
                marginBottom: 13,
              }}
            />

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/images/ic_mandiri.png')}
                  style={{width: 60 * 1.1, height: 19 * 1.1}}
                />

                {isBankTransferChosen && (
                  <>
                    <View style={{flex: 1}} />

                    <Ionicons
                      name={'ios-checkmark-circle-sharp'}
                      color={'#3E6EDE'}
                      size={18}
                    />
                  </>
                )}

                {!isBankTransferChosen && (
                  <Image
                    source={require('../../assets/images/ic_bca.png')}
                    style={{
                      width: 57 * 1.1,
                      height: 19 * 1.1,
                      marginTop: 4,
                      marginLeft: 15,
                    }}
                  />
                )}

                {!isBankTransferChosen && (
                  <Image
                    source={require('../../assets/images/ic_bri.png')}
                    style={{
                      width: 80 * 1.1,
                      height: 19 * 1.1,
                      marginTop: 4,
                      marginLeft: 15,
                    }}
                  />
                )}
              </View>
              {!isBankTransferChosen && (
                <Image
                  source={require('../../assets/images/faded_filter.png')}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>

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
            paddingHorizontal: 22,
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Avenir', fontWeight: '700', flex: 1}}>
              Kartu Kredit/Debit
            </Text>

            <MaterialIcons name={'chevron-right'} color={'#25282B'} size={22} />
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: '#e3e3e3',
              marginTop: 10,
              marginBottom: 13,
            }}
          />

          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/images/ic_mandiri.png')}
                style={{width: 60 * 1.1, height: 19 * 1.1}}
              />

              <Image
                source={require('../../assets/images/ic_bca.png')}
                style={{
                  width: 57 * 1.1,
                  height: 19 * 1.1,
                  marginTop: 4,
                  marginLeft: 15,
                }}
              />

              <Image
                source={require('../../assets/images/ic_bri.png')}
                style={{
                  width: 80 * 1.1,
                  height: 19 * 1.1,
                  marginTop: 4,
                  marginLeft: 15,
                }}
              />
            </View>
            <Image
              source={require('../../assets/images/faded_filter.png')}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: 'white',
          paddingBottom: 35,
        }}>
        <TouchableWithoutFeedback onPress={() => {
          if(isBankTransferChosen) {
              props.navigation.navigate('CompletePaymentScreen')
          }
        }}>
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
              backgroundColor: isBankTransferChosen ? '#3066D2' : '#3066D233',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontWeight: '700',
                fontSize: 13,
                color: 'white',
              }}>
              Bayar
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
