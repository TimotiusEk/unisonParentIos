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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function PartnerScreen(props) {
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [locationStatus, setLocationStatus] = useState('');
  const [locationName, setLocationName] = useState('');
  const [centerPosition, setCenterPosition] = useState({
    latitude: -6.2269,
    longitude: 106.7979,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getLocationFromLatLng = (lat, lng) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB9xzd70SM1ifAaiIoERg0CcAsOwsRXIDY`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // console.log('response', response)

        return response.json();
      })
      .then((data) => {
        setLocationName(data.results[0].formatted_address)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        console.log('xaxa');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        getLocationFromLatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude))

        setCenterPosition({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        })

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        getLocationFromLatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude))

        setCenterPosition({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        })

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        console.log(error);
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 60,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.15,
          elevation: 3,
          shadowRadius: 5,
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
            Tutor
          </Text>

          <View>
            <MaterialCommunityIcons
              name={'chevron-left'}
              size={28}
              style={{opacity: 0}}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F0F0F0',
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginTop: 15,
            marginHorizontal: 16,
          }}>
          <Ionicons name={'search-outline'} color={'#909090'} size={17} />
          <TextInput
            placeholder={'Cari Tutor'}
            style={{
              fontFamily: 'Avenir',
              fontSize: 17,
              color: '#909090',
              marginLeft: 10,
            }}
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Avenir',
                color: '#646464',
                fontWeight: '600',
              }}>
              Terbaru
            </Text>

            <View
              style={{
                width: 80,
                height: 2,
                backgroundColor: '#3066D2',
                marginTop: 10,
              }}
            />
          </View>

          <View style={{display: 'flex', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Avenir', color: '#909090'}}>
              Featured
            </Text>

            <View
              style={{
                width: 80,
                height: 2,
                backgroundColor: '#3066D2',
                marginTop: 10,
                opacity: 0,
              }}
            />
          </View>

          <View style={{display: 'flex', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Avenir', color: '#909090'}}>
              Frequent
            </Text>

            <View
              style={{
                width: 80,
                height: 2,
                backgroundColor: '#3066D2',
                marginTop: 10,
                opacity: 0,
              }}
            />
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 20,
          paddingHorizontal: 16,
          flexDirection: 'row',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#3066D2',
            alignSelf: 'flex-start',
            backgroundColor: '#3066D24D',
            paddingHorizontal: 20,
            paddingVertical: 9,
            borderRadius: 70,
          }}>
          <Text
            style={{
              borderRadius: 70,
              color: '#3066D2',
              fontFamily: 'Avenir',
              fontWeight: '600',
            }}>
            Semua
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#909090',
            alignSelf: 'flex-start',
            paddingHorizontal: 20,
            paddingVertical: 9,
            borderRadius: 70,
            marginLeft: 15,
          }}>
          <Text
            style={{
              borderRadius: 70,
              color: '#909090',
              fontFamily: 'Avenir',
              fontWeight: '600',
            }}>
            Matematika
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#909090',
            alignSelf: 'flex-start',
            paddingHorizontal: 20,
            paddingVertical: 9,
            borderRadius: 70,
            marginLeft: 15,
          }}>
          <Text
            style={{
              borderRadius: 70,
              color: '#909090',
              fontFamily: 'Avenir',
              fontWeight: '600',
            }}>
            Musik
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#909090',
            alignSelf: 'flex-start',
            paddingHorizontal: 20,
            paddingVertical: 9,
            borderRadius: 70,
            marginLeft: 15,
          }}>
          <Text
            style={{
              borderRadius: 70,
              color: '#909090',
              fontFamily: 'Avenir',
              fontWeight: '600',
            }}>
            Olahraga
          </Text>
        </View>
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 20,
          paddingHorizontal: 16,
          flexDirection: 'row',
          paddingBottom: 3,
        }}>
        <View
          style={{
            marginRight: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.05,
            elevation: 2,
            shadowRadius: 3,
          }}>
          <Image
            source={require('../../assets/images/example-tutor.jpeg')}
            style={{
              width: 200,
              height: 120,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <Text
            style={{
              marginTop: 6,
              fontFamily: 'Avenir',
              fontWeight: '600',
              paddingHorizontal: 10,
            }}>
            Cellyne Lakeysha Gomez
          </Text>

          <View
            style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 5}}>
            <Image
              source={require('../../assets/images/badge_sd.png')}
              style={{width: 50, resizeMode: 'contain', marginRight: 10}}
            />
            <Image
              source={require('../../assets/images/badge_smp.png')}
              style={{width: 50, resizeMode: 'contain'}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/ic_open_book.png')}
              style={{width: 17, resizeMode: 'contain'}}
            />

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 13,
                color: '#909090',
                marginLeft: 10,
              }}>
              Matematika
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Image
              source={require('../../assets/images/ic_location.png')}
              style={{width: 17, resizeMode: 'contain'}}
            />

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 13,
                color: '#909090',
                marginLeft: 10,
              }}>
              Pancoran
            </Text>
          </View>
        </View>

        <View
          style={{
            marginleft: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.05,
            elevation: 2,
            shadowRadius: 3,
          }}>
          <Image
            source={require('../../assets/images/example-tutor.jpeg')}
            style={{
              width: 200,
              height: 120,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <Text
            style={{
              marginTop: 6,
              fontFamily: 'Avenir',
              fontWeight: '600',
              paddingHorizontal: 10,
            }}>
            Andrew Sevchenko
          </Text>

          <View
            style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 5}}>
            <Image
              source={require('../../assets/images/badge_smp.png')}
              style={{width: 50, resizeMode: 'contain'}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/ic_open_book.png')}
              style={{width: 17, resizeMode: 'contain'}}
            />

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 13,
                color: '#909090',
                marginLeft: 10,
              }}>
              IPS
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Image
              source={require('../../assets/images/ic_location.png')}
              style={{width: 17, resizeMode: 'contain'}}
            />

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 13,
                color: '#909090',
                marginLeft: 10,
              }}>
              Mampang
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: 15,
          paddingTop: 25,
          paddingHorizontal: 15,
        }}>
        <MapView
          initialRegion={centerPosition}
          region={centerPosition}
          style={{
            height: 200,
            borderRadius: 8,
          }}>
          <Marker
            coordinate={{
              latitude: currentLatitude,
              longitude: currentLongitude,
            }}
          />
        </MapView>

        <Text style={{fontFamily: 'Avenir', marginTop: 5, fontWeight: '300', fontSize: 13}}>{locationName}</Text>
      </View>
    </ScrollView>
  );
}
