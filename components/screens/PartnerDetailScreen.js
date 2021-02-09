import React, {useState, useRef, useEffect} from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-community/async-storage";
import HttpRequest from "../../util/HttpRequest";

export default function PartnerDetailScreen(props) {
    const [detail, setDetail] = useState({});
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        getDetail();
    }, [])

    const getDetail = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/users/detailmitra',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    user_id: props.navigation.getParam('id')
                }),
            ),
        ).then(res => {
            console.log('res', res)
        }).catch(err => {
            const districtsTemp = [];

            err.location.map(location => {
                if(!districtsTemp.includes(location.district)) districtsTemp.push(location.district)
            })

            setDistricts(districtsTemp);
            setDetail(err);
            console.log('err', err)
        })
    }

    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: Platform.OS ? 16 : 60,
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
                        Detail Mitra
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
            <ScrollView contentContainerStyle={{paddingBottom: 40}}>
                <View
                    style={{
                        backgroundColor: 'white',
                        marginTop: 20,
                        marginHorizontal: 20,
                        paddingTop: 20,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.05,
                        elevation: 2,
                        shadowRadius: 3,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}/>
                        <Image
                            source={require('../../assets/images/example-tutor.jpeg')}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                marginTop: 10,
                            }}
                        />
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Image
                                source={require('../../assets/images/badge_elite_tutor.png')}
                                style={{width: 88 * 1.2, height: 24 * 1.2, opacity: 0}}
                            />

                            <Image
                                source={require('../../assets/images/badge_professional.png')}
                                style={{width: 88 * 1.2, height: 24 * 1.2, marginTop: 10, opacity: 0}}
                            />
                        </View>
                    </View>

                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Avenir',
                            fontWeight: '700',
                            fontSize: 18,
                            color: '#373737',
                            marginTop: 10,
                        }}>
                        {detail?.user?.name}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 15,
                            justifyContent: 'center',
                            opacity: districts.length > 0 ? 1 : 0
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
                                marginLeft: 6,
                            }}>
                            {
                                districts.map((district, idx) => {
                                    const comma = idx === districts.length -1 ? '' : ', ';

                                    return district + comma;
                                })
                            }
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{marginRight: 40}}>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#333333',
                                    textAlign: 'center',
                                }}>
                                {detail.rating ? detail.rating : '-'}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    fontWeight: '300',
                                    color: '#BBBBBB',
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}>
                                Rating
                            </Text>
                        </View>

                        <View style={{marginRight: 40}}>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#333333',
                                    textAlign: 'center',
                                }}>
                                20
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    fontWeight: '300',
                                    color: '#BBBBBB',
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}>
                                Favorit
                            </Text>
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    color: '#333333',
                                    textAlign: 'center',
                                }}>
                                10
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    fontWeight: '300',
                                    color: '#BBBBBB',
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}>
                                Questions
                            </Text>
                        </View>

                        <Image
                            source={require('../../assets/images/wave.png')}
                            style={{
                                width: 269,
                                height: 116,
                                position: 'absolute',
                                right: -10,
                                bottom: -16,
                            }}
                        />
                    </View>

                    <View style={{marginTop: 15}}>
                        <View style={{height: 1, backgroundColor: '#e3e3e3'}}/>

                        {detail?.user?.tentang_saya &&
                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                fontWeight: '300',
                                color: '#666666',
                                marginTop: 20,
                            }}>
                            {detail?.user?.tentang_saya}
                        </Text>
                        }

                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            <Text
                                style={{
                                    textDecorationLine: 'underline',
                                    marginTop: 20,
                                    fontSize: 13,
                                    color: '#3066D2',
                                    marginBottom: 30,
                                }}>
                                Lihat Pengalaman
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <Text
                    style={{
                        fontFamily: 'Avenir',
                        fontWeight: '600',
                        fontSize: 16,
                        marginTop: 25,
                        marginBottom: 15,
                        marginHorizontal: 20,
                    }}>
                    Jadwal Tutor
                </Text>

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
                            Online
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
                            Offline
                        </Text>
                    </View>
                </ScrollView>

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ClassDetailScreen')}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.1,
                            elevation: 3,
                            shadowRadius: 3,
                            borderRadius: 10,
                            paddingLeft: 20,
                            paddingRight: 10,
                            paddingVertical: 15,
                            marginTop: 15,
                            flexDirection: 'row',
                            marginHorizontal: 16,
                        }}>
                        <Image
                            source={require('../../assets/images/example_class_cover_photo.jpg')}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 4,
                                marginRight: 20,
                            }}
                        />

                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        color: '#373737',
                                        fontWeight: '700',
                                        flex: 1,
                                        marginTop: 2,
                                    }}>
                                    Matematika kelas 5
                                </Text>

                                <Image
                                    source={require('../../assets/images/badge_sd.png')}
                                    style={{width: 50, resizeMode: 'contain', marginRight: 10}}
                                />
                            </View>

                            <View style={{flexDirection: 'row'}}>
                                <MaterialIcons name={'date-range'} size={16} color={'#66666680'}/>

                                <View style={{marginLeft: 5}}>
                                    <Text
                                        style={{fontFamily: 'Avenir', color: '#909090', fontSize: 13}}>
                                        31 Dec 2020 - 30 Jan 2021
                                    </Text>

                                    <Text
                                        style={{
                                            fontFamily: 'Avenir',
                                            fontWeight: '600',
                                            color: '#666666',
                                            fontSize: 13,
                                        }}>
                                        16:00 - 17:30 WIB
                                    </Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 6}}>
                                <MaterialIcons name={'people'} size={16} color={'#66666680'}/>

                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        color: '#909090',
                                        fontSize: 13,
                                        marginLeft: 5,
                                    }}>
                                    10 Murid
                                </Text>
                            </View>

                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Avenir',
                                    fontWeight: '700',
                                    color: '#3066D2',
                                    marginTop: 10,
                                }}>
                                Rp250.000
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View
                    style={{
                        backgroundColor: 'white',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.1,
                        elevation: 3,
                        shadowRadius: 3,
                        borderRadius: 10,
                        paddingLeft: 20,
                        paddingRight: 10,
                        paddingVertical: 15,
                        marginTop: 15,
                        flexDirection: 'row',
                        marginHorizontal: 16,
                    }}>
                    <Image
                        source={require('../../assets/images/example_class_cover_photo.jpg')}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 4,
                            marginRight: 20,
                        }}
                    />

                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#373737',
                                    fontWeight: '700',
                                    flex: 1,
                                    marginTop: 2,
                                }}>
                                Matematika kelas 6
                            </Text>

                            <Image
                                source={require('../../assets/images/badge_sd.png')}
                                style={{width: 50, resizeMode: 'contain', marginRight: 10}}
                            />
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <MaterialIcons name={'date-range'} size={16} color={'#66666680'}/>

                            <View style={{marginLeft: 5}}>
                                <Text
                                    style={{fontFamily: 'Avenir', color: '#909090', fontSize: 13}}>
                                    31 Dec 2020 - 30 Jan 2021
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        fontWeight: '600',
                                        color: '#666666',
                                        fontSize: 13,
                                    }}>
                                    16:00 - 17:30 WIB
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', marginTop: 6}}>
                            <MaterialIcons name={'people'} size={16} color={'#66666680'}/>

                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#909090',
                                    fontSize: 13,
                                    marginLeft: 5,
                                }}>
                                10 Murid
                            </Text>
                        </View>

                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                color: '#3066D2',
                                marginTop: 10,
                            }}>
                            Rp270.000
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.1,
                        elevation: 3,
                        shadowRadius: 3,
                        borderRadius: 10,
                        paddingLeft: 20,
                        paddingRight: 10,
                        paddingVertical: 15,
                        marginTop: 15,
                        flexDirection: 'row',
                        marginHorizontal: 16,
                    }}>
                    <Image
                        source={require('../../assets/images/example_class_cover_photo.jpg')}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 4,
                            marginRight: 20,
                        }}
                    />

                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#373737',
                                    fontWeight: '700',
                                    flex: 1,
                                    marginTop: 2,
                                }}>
                                Matematika kelas 7
                            </Text>

                            <Image
                                source={require('../../assets/images/badge_smp.png')}
                                style={{width: 50, resizeMode: 'contain', marginRight: 10}}
                            />
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <MaterialIcons name={'date-range'} size={16} color={'#66666680'}/>

                            <View style={{marginLeft: 5}}>
                                <Text
                                    style={{fontFamily: 'Avenir', color: '#909090', fontSize: 13}}>
                                    31 Dec 2020 - 30 Jan 2021
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        fontWeight: '600',
                                        color: '#666666',
                                        fontSize: 13,
                                    }}>
                                    16:00 - 17:30 WIB
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', marginTop: 6}}>
                            <MaterialIcons name={'people'} size={16} color={'#66666680'}/>

                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#909090',
                                    fontSize: 13,
                                    marginLeft: 5,
                                }}>
                                10 Murid
                            </Text>
                        </View>

                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                color: '#3066D2',
                                marginTop: 10,
                            }}>
                            Rp300.000
                        </Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.1,
                            elevation: 3,
                            shadowRadius: 3,
                            borderRadius: 1000,
                            paddingHorizontal: 8,
                            marginTop: 25,
                            flexDirection: 'row',
                            marginLeft: 16,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <MaterialCommunityIcons name={'heart'} size={20} color={'#3066D2'}/>
                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                fontSize: 13,
                                color: '#3066D2',
                                marginLeft: 5,
                            }}>
                            600
                        </Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.1,
                            elevation: 3,
                            shadowRadius: 3,
                            borderRadius: 1000,
                            paddingHorizontal: 8,
                            marginTop: 25,
                            flexDirection: 'row',
                            marginLeft: 16,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10,
                        }}>
                        <Ionicons name={'md-chatbubbles'} size={20} color={'#3066D2'}/>
                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                fontSize: 13,
                                color: '#3066D2',
                                marginLeft: 5,
                            }}>
                            120
                        </Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.1,
                            elevation: 3,
                            shadowRadius: 3,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            marginTop: 25,
                            flex: 2,
                            marginRight: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#3066D2',
                            marginLeft: 16,
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                fontSize: 13,
                                color: 'white',
                            }}>
                            Kirim Pesan
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
