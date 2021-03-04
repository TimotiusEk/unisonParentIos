import React, {useState, useRef, useEffect} from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    Platform,
    PermissionsAndroid
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import Permissions from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from "@react-native-community/async-storage";
import HttpRequest from "../../util/HttpRequest";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PartnerScreen(props) {
    const SD = [
        "Kelas 1",
        "Kelas 2",
        "Kelas 3",
        "Kelas 4",
        "Kelas 5",
        "Kelas 6"
    ];

    const SMP = [
        "Kelas 7",
        "Kelas 8",
        "Kelas 9",
    ]

    const SMA = [
        "Kelas 10",
        "Kelas 11",
        "Kelas 12",
    ]


    const [partners, setPartners] = useState([]);
    const [locationStatus, setLocationStatus] = useState('');
    const [locationName, setLocationName] = useState('');
    const [centerPosition, setCenterPosition] = useState({
        latitude: -6.2269,
        longitude: 106.7979,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
    });

    const [userPosition, setUserPosition] = useState({
        latitude: -6.2269,
        longitude: 106.7979
    })

    const [keyword, setKeyword] = useState('');

    const getPartner = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/users/listmitra',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                }),
            ),
        ).then(res => {
            console.log(res)
        }).catch(err => {
            console.log('err', err)

            if (Array.isArray(err)) {
                setPartners(err);
            }
        })
    }

    useEffect(() => {
        checkAndRequestLocationPermission()

        getPartner()

        // const requestLocationPermission = async () => {
        //     if (Platform.OS === 'ios') {
        //         getOneTimeLocation();
        //         subscribeLocationLocation();
        //     } else {
        //         try {
        //             request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
        //                 console.log('ACCESS_COARSE_LOCATION', result);
        //                 if(result === PermissionsAndroid.RESULTS.GRANTED) {
        //                     getOneTimeLocation();
        //                     subscribeLocationLocation();
        //                 }
        //             });
        //
        //             request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        //                 console.log('ACCESS_FINE_LOCATION', result);
        //             });
        //
        //             // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //             //     console.log('granted')
        //             //
        //             //     //To Check, If Permission is granted
        //             //     getOneTimeLocation();
        //             //     subscribeLocationLocation();
        //             // } else {
        //             //     console.log('not granted')
        //             //
        //             //     setLocationStatus('Permission Denied');
        //             // }
        //         } catch (err) {
        //             console.warn(err);
        //         }
        //     }
        // };
        // requestLocationPermission();
        // return () => {
        //   Geolocation.clearWatch(watchID);
        // };
    }, []);

    const checkAndRequestLocationPermission = () => {
        if (Platform.OS === 'ios') {
            // Geolocation.requestAuthorization((location)=>{
            //     console.log("succ", location)
            // }, (error)=>{
            //     console.log("loc_error", error)
            // })
            Geolocation.requestAuthorization()

            return;
        }

        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
            if (result === 'granted') goToMyLocation();
        });
    }

    const getLocationFromLatLng = (lat, lng) => {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB9xzd70SM1ifAaiIoERg0CcAsOwsRXIDY`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        )
            .then((response) => {
                // console.log('response', response)

                return response.json();
            })
            .then((data) => {
                setLocationName(data.results[0].formatted_address);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // const getOneTimeLocation = () => {
    //     setLocationStatus('Getting Location ...');
    //     Geolocation.getCurrentPosition(
    //         //Will give you the current location
    //         (position) => {
    //             setLocationStatus('You are Here');
    //
    //             console.log('xaxa');
    //
    //             //getting the Longitude from the location json
    //             const currentLongitude = JSON.stringify(position.coords.longitude);
    //
    //             //getting the Latitude from the location json
    //             const currentLatitude = JSON.stringify(position.coords.latitude);
    //
    //             getLocationFromLatLng(
    //                 parseFloat(position.coords.latitude),
    //                 parseFloat(position.coords.longitude),
    //             );
    //
    //             setCenterPosition({
    //                 latitude: parseFloat(position.coords.latitude),
    //                 longitude: parseFloat(position.coords.longitude),
    //                 latitudeDelta: 0.008,
    //                 longitudeDelta: 0.008,
    //             });
    //
    //             //Setting Longitude state
    //             setCurrentLongitude(currentLongitude);
    //
    //             //Setting Longitude state
    //             setCurrentLatitude(currentLatitude);
    //         },
    //         (error) => {
    //             setLocationStatus(error.message);
    //         },
    //         {
    //             enableHighAccuracy: false,
    //             timeout: 30000,
    //             maximumAge: 1000,
    //         },
    //     );
    // };

    // const subscribeLocationLocation = () => {
    //     watchID = Geolocation.watchPosition(
    //         (position) => {
    //             //Will give you the location on location change
    //
    //             setLocationStatus('You are Here');
    //
    //             //getting the Longitude from the location json
    //             const currentLongitude = JSON.stringify(position.coords.longitude);
    //
    //             //getting the Latitude from the location json
    //             const currentLatitude = JSON.stringify(position.coords.latitude);
    //
    //             getLocationFromLatLng(
    //                 parseFloat(position.coords.latitude),
    //                 parseFloat(position.coords.longitude),
    //             );
    //
    //             setCenterPosition({
    //                 latitude: parseFloat(position.coords.latitude),
    //                 longitude: parseFloat(position.coords.longitude),
    //                 latitudeDelta: 0.008,
    //                 longitudeDelta: 0.008,
    //             });
    //
    //             //Setting Longitude state
    //             setCurrentLongitude(currentLongitude);
    //
    //             //Setting Latitude state
    //             setCurrentLatitude(currentLatitude);
    //         },
    //         (error) => {
    //             console.log(error);
    //             setLocationStatus(error.message);
    //         },
    //         {
    //             enableHighAccuracy: false,
    //             maximumAge: 1000,
    //         },
    //     );
    // };

    const goToMyLocation = () => {

        if (Platform.OS === "ios") {
            console.log("requersting")
        }

        Geolocation.getCurrentPosition(
            (position) => {
                //getting the Longitude from the location json
                const currentLongitude = JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);

                getLocationFromLatLng(
                    position.coords.latitude,
                    position.coords.longitude,
                );

                setCenterPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                });

                setUserPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            (error) => {
                // See error code charts below.
                console.log('error bro');
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
    }

    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: Platform.OS === 'android' ? 16 : 60,
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
                        Mitra
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
                        paddingHorizontal: 10,
                        marginTop: 15,
                        marginHorizontal: 16,
                        paddingVertical: Platform.OS === 'ios' ? 8 : 0
                    }}>
                    <Ionicons name={'search-outline'} color={'#909090'} size={17}/>
                    <TextInput
                        placeholder={'Cari Mitra'}
                        onChangeText={(text) => {
                            setKeyword(text)
                        }}
                        style={{
                            fontFamily: 'Avenir',
                            fontSize: 17,
                            color: '#909090',
                            marginLeft: 10,
                            width: '100%'

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
            <ScrollView contentContainerStyle={{marginTop: 15}}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
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
                    {
                        partners.map(partner => {
                            console.log('subject', partner.subject.length)

                            if(!partner.name.toLowerCase().includes(keyword.toLowerCase()) || partner.subject.length === 0) return null;

                            const subjects = [];
                            const districts = [];

                            partner.subject.map(subject => {
                                if (!subjects.includes(subject.subject)) subjects.push(subject.subject)
                            })

                            partner.location.map(location => {
                                if (!districts.includes(location.district)) districts.push(location.district)
                            })

                            let isSD = false;
                            let isSMP = false;
                            let isSMA = false;

                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => props.navigation.navigate('PartnerDetailScreen', {id: partner.id})}>
                                    <View
                                        style={{
                                            marginRight: 15,
                                            borderRadius: 10,
                                            shadowColor: '#000',
                                            shadowOffset: {width: 0, height: 0},
                                            shadowOpacity: 0.05,
                                            elevation: 2,
                                            shadowRadius: 3,
                                            backgroundColor: 'white'
                                        }}>

                                        <View style={{
                                            width: 200,
                                            height: 120,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#b9cde5',
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10
                                        }}>
                                            {
                                                partner.image_path ?
                                                    <Image source={{uri: partner.image_path}} style={{
                                                        resizeMode: 'cover',
                                                        width: '100%',
                                                        height: '100%',
                                                        borderTopLeftRadius: 10,
                                                        borderTopRightRadius: 10
                                                    }}/> :
                                                    <FontAwesome name={'user'} color={'#d4dff7'} size={55}/>
                                            }
                                        </View>
                                        {/*<Image*/}
                                        {/*    source={require('../../assets/images/ic_user.png')}*/}
                                        {/*    style={{*/}
                                        {/*        resizeMode: 'contain',*/}
                                        {/*        width: 200,*/}
                                        {/*        height: 120,*/}
                                        {/*        borderTopLeftRadius: 10,*/}
                                        {/*        borderTopRightRadius: 10,*/}
                                        {/*    }}*/}
                                        {/*/>*/}

                                        <Text
                                            style={{
                                                marginTop: 6,
                                                fontFamily: 'Avenir',
                                                fontWeight: '600',
                                                paddingHorizontal: 10,
                                            }}>
                                            {partner.name}
                                        </Text>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginHorizontal: 10,
                                                marginTop: 5,
                                            }}>

                                            {
                                                partner.subject.forEach(subject => {
                                                    isSD = SD.includes(subject.jenjang);
                                                    isSMP = SMP.includes(subject.jenjang);
                                                    isSMA = SMA.includes(subject.jenjang);
                                                })
                                            }

                                            {isSD &&
                                            <Image
                                                source={require('../../assets/images/badge_sd.png')}
                                                style={{width: 50, resizeMode: 'contain', marginRight: 10}}
                                            />
                                            }

                                            {isSMP &&
                                            <Image
                                                source={require('../../assets/images/badge_smp.png')}
                                                style={{width: 50, resizeMode: 'contain', marginRight: 10}}
                                            />
                                            }

                                            {isSMA &&
                                            <Image
                                                source={require('../../assets/images/badge_sma.png')}
                                                style={{width: 50, resizeMode: 'contain'}}
                                            />
                                            }
                                        </View>

                                        <View style={{flex: 1}}/>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginHorizontal: 10,
                                                alignItems: 'center',
                                                opacity: subjects.length > 0 ? 1 : 0
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
                                                {
                                                    subjects.map((subject, idx) => {
                                                        const comma = idx === subjects.length - 1 ? '' : ', ';

                                                        return subject + comma;
                                                    })
                                                }
                                            </Text>
                                        </View>


                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginHorizontal: 10,
                                                alignItems: 'center',
                                                marginBottom: 15,
                                                opacity: partner.location.length > 0 ? 1 : 0
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
                                                    maxWidth: 153
                                                }}>
                                                {
                                                    districts.map((district, idx) => {
                                                        const comma = idx === districts.length - 1 ? '' : ', ';

                                                        return district + comma;
                                                    })
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
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
                        pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}
                        initialRegion={centerPosition}
                        region={centerPosition}
                        style={{
                            height: 200,
                            borderRadius: 8,
                        }}>
                        <Marker
                            coordinate={userPosition}
                        />
                    </MapView>

                    <Text
                        style={{
                            fontFamily: 'Avenir',
                            marginTop: 5,
                            fontWeight: '300',
                            fontSize: 13,
                        }}>
                        {locationName}
                    </Text>

                    <Text
                        style={{
                            fontFamily: 'Avenir',
                            fontWeight: '600',
                            fontSize: 16,
                            marginTop: 25,
                            marginBottom: 15,
                        }}>
                        Mitra di dekat Anda
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.1,
                            elevation: 3,
                            shadowRadius: 3,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingTop: 17,
                            marginBottom: 20,
                        }}>
                        <Image
                            source={require('../../assets/images/example-tutor.jpeg')}
                            style={{width: 50, height: 50, borderRadius: 25}}
                        />

                        <View style={{marginLeft: 15}}>
                            <Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>
                                John Mayer Tom Morello
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
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
                                    Kebon Jeruk | 3,5 km
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.1,
                            elevation: 3,
                            shadowRadius: 3,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingTop: 17,
                            marginBottom: 20,
                        }}>
                        <Image
                            source={require('../../assets/images/example-tutor.jpeg')}
                            style={{width: 50, height: 50, borderRadius: 25}}
                        />

                        <View style={{marginLeft: 15}}>
                            <Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>
                                Ahmad John Key
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
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
                                    IPA
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
                                    Kebon Jeruk | 3,5 km
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.1,
                            elevation: 3,
                            shadowRadius: 3,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingTop: 17,
                            marginBottom: 20,
                        }}>
                        <Image
                            source={require('../../assets/images/example-tutor.jpeg')}
                            style={{width: 50, height: 50, borderRadius: 25}}
                        />

                        <View style={{marginLeft: 15}}>
                            <Text style={{fontFamily: 'Avenir', fontWeight: '600'}}>
                                John Doe Ramadhan
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <Image
                                    source={require('../../assets/images/badge_sma.png')}
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
                                    Kebon Jeruk | 3,5 km
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Text
                        style={{
                            fontFamily: 'Avenir',
                            fontWeight: '600',
                            fontSize: 16,
                            marginBottom: 15,
                        }}>
                        Mitra Kami
                    </Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            paddingBottom: 15,
                        }}>
                        <View style={{width: 60, marginRight: 15}}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#3066D2',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{width: 50, height: 50, borderRadius: 25}}
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#909090',
                                    marginTop: 6,
                                    fontSize: 13,
                                }}>
                                Tony Martinez
                            </Text>
                        </View>

                        <View style={{width: 60, marginRight: 15}}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#3066D2',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{width: 50, height: 50, borderRadius: 25}}
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#909090',
                                    marginTop: 6,
                                    fontSize: 13,
                                }}>
                                Selena gemez
                            </Text>
                        </View>

                        <View style={{width: 60, marginRight: 15}}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#3066D2',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{width: 50, height: 50, borderRadius: 25}}
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#909090',
                                    marginTop: 6,
                                    fontSize: 13,
                                }}>
                                Andri sedayu
                            </Text>
                        </View>

                        <View style={{width: 60, marginRight: 15}}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#3066D2',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{width: 50, height: 50, borderRadius: 25}}
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#909090',
                                    marginTop: 6,
                                    fontSize: 13,
                                }}>
                                Maya Rudianto
                            </Text>
                        </View>

                        <View style={{width: 60, marginRight: 15}}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#3066D2',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{width: 50, height: 50, borderRadius: 25}}
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#909090',
                                    marginTop: 6,
                                    fontSize: 13,
                                }}>
                                Andri schrodinger
                            </Text>
                        </View>

                        <View style={{width: 60, marginRight: 15}}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#3066D2',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{width: 50, height: 50, borderRadius: 25}}
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#909090',
                                    marginTop: 6,
                                    fontSize: 13,
                                }}>
                                Glenn Timothy
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}
