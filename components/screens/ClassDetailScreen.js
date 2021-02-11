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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';

export default function ClassDetailScreen(props) {
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

    const [detail, setDetail] = useState({});
    const [districts, setDistricts] = useState([]);
    const [subject, setSubject] = useState({});

    const fullyBooked = false;

    useEffect(() => {
        console.log(props.navigation.getParam('class'))

        const districtsTemp = [];

        props.navigation.getParam('class').location.map(location => {
            if (!districtsTemp.includes(location.district)) districtsTemp.push(location.district)
        })

        setDistricts(districtsTemp);
        setSubject(props.navigation.getParam('subject'));
        setDetail(props.navigation.getParam('class'));
    }, [])

    return (
        <View style={{flex: 1}}>
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
                        Detail
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
                <View>
                    <Image
                        source={detail?.subject?.image_path ? {uri: detail?.subject?.image_path} : require('../../assets/images/default-class-img.jpg')}
                        style={{width: '100%', resizeMode: 'cover', height: 220}}
                    />

                    {fullyBooked && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#00000099',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#ffffffd9',
                                    paddingHorizontal: 60,
                                    paddingVertical: 13,
                                    borderRadius: 50,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        fontWeight: '700',
                                    }}>
                                    Fully Booked
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        paddingTop: 18,
                        paddingHorizontal: 16,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                fontSize: 18,
                                flex: 1,
                            }}>
                            {`${subject.subject} ${subject.jenjang}`}
                        </Text>

                        <Image
                            source={SD.includes(subject.jenjang) ? require('../../assets/images/badge_sd.png') : SMP.includes(subject.jenjang) ? require('../../assets/images/badge_smp.png') : SMA.includes(subject.jenjang) ? require('../../assets/images/badge_sma.png') : null}
                            style={{width: SD.includes(subject.jenjang) ? 50 : 60, resizeMode: 'contain', marginRight:  SD.includes(subject.jenjang) ? 10 : 0}}
                        />
                    </View>

                    <Text
                        style={{
                            fontFamily: 'Avenir',
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#3066D2',
                            marginTop: 2,
                        }}>
                        Rp{subject?.tarif?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </Text>

                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <MaterialIcons name={'date-range'} size={16} color={'#66666680'}/>

                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                color: '#909090',
                                fontSize: 13,
                                marginLeft: 5,
                            }}>
                            31 Dec 2020 - 30 Jan 2021 |
                        </Text>

                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                fontWeight: '600',
                                color: '#666666',
                                fontSize: 13,
                                marginLeft: 4,
                            }}>
                            16:00 - 17:30 WIB
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Image
                            source={require('../../assets/images/ic_location.png')}
                            style={{width: 17, resizeMode: 'contain', marginTop: -4}}
                        />

                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                color: '#909090',
                                fontSize: 13,
                                marginLeft: 5,
                            }}>
                            {
                                districts.map((district, idx) => {
                                    const comma = idx === districts.length - 1 ? '' : ', ';

                                    return district + comma;
                                })
                            }
                        </Text>

                        <MaterialIcons
                            name={'people'}
                            size={16}
                            color={'#66666680'}
                            style={{marginLeft: 20}}
                        />

                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                color: '#909090',
                                fontSize: 13,
                                marginLeft: 5,
                            }}>
                            {subject.jumlah_murid ? subject.jumlah_murid : '0'} Murid
                        </Text>
                    </View>

                    <Text
                        style={{
                            fontFamily: 'Avenir',
                            color: '#909090',
                            fontSize: 13,
                            marginTop: 10,
                        }}>
                        Tutor
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 7,
                            marginBottom: 20,
                        }}>
                        <Image
                            source={detail.user?.image_path ? {uri: detail.user?.image_path} : require('../../assets/images/ic_user.png')}
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 40,
                            }}
                        />

                        <Text
                            style={{
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                marginLeft: 7,
                                color: '#373737',
                            }}>
                            {detail?.user?.name}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        marginTop: 10,
                        paddingTop: 15,
                        paddingHorizontal: 16,
                    }}>
                    <Text
                        style={{fontFamily: 'Avenir', fontWeight: '300', color: '#666666'}}>
                        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                        dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                        dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.15,
                            elevation: 2,
                            shadowRadius: 3,
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            marginTop: 20,
                        }}>
                        <View style={{flex: 1}}>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#3066D2',
                                    fontSize: 13,
                                }}>
                                Review
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 5,
                                }}>
                                <Rating
                                    defaultValue={4.5}
                                    readonly={true}
                                    imageSize={16}
                                    style={{
                                        alignItems: 'flex-start',
                                        alignSelf: 'flex-start',
                                    }}
                                />

                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        fontSize: 13,
                                        color: '#66666680',
                                        marginLeft: 8,
                                    }}>
                                    (4,5/5)
                                </Text>
                            </View>
                        </View>

                        <View style={{flex: 1}}>
                            <Text
                                style={{
                                    fontFamily: 'Avenir',
                                    color: '#3066D2',
                                    fontSize: 13,
                                }}>
                                Pemesan Kelas
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 5,
                                }}>
                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: 'white',
                                    }}
                                />

                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        marginLeft: -10,
                                    }}
                                />
                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        marginLeft: -10,
                                    }}
                                />

                                <Image
                                    source={require('../../assets/images/example-tutor.jpeg')}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        marginLeft: -10,
                                    }}
                                />

                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        fontSize: 13,
                                        color: '#66666680',
                                        marginLeft: 8,
                                    }}>
                                    (4/10)
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 1000,
                                shadowColor: '#000',
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.1,
                                elevation: 2,
                                shadowRadius: 2,
                                marginTop: 20,
                                aspectRatio: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Ionicons name={'heart-outline'} size={20} color={'#3066D2'}/>
                        </View>

                        <View style={{flex: 1, paddingLeft: 16}}>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    marginTop: 25,
                                    flex: 1,
                                    marginRight: 16,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 10,
                                    borderWidth: 1,
                                    borderColor: '#3066D2',
                                }}>
                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        fontWeight: '700',
                                        fontSize: 13,
                                        color: '#3066D2',
                                    }}>
                                    Ingatkan Saya
                                </Text>
                            </View>
                        </View>

                        <View style={{flex: 1}}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (!fullyBooked) props.navigation.navigate('PaymentSummaryScreen')
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
                                        paddingHorizontal: 10,
                                        marginTop: 25,
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: fullyBooked ? '#3066D233' : '#3066D2',
                                        paddingVertical: 10,
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Avenir',
                                            fontWeight: '700',
                                            fontSize: 13,
                                            color: 'white',
                                        }}>
                                        {fullyBooked ? 'Fully Booked' : 'Booking Sekarang'}
                                    </Text>
                                </View>
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
                        }}>
                        Tutor yang sejenis
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
                                    Kebon Sirih
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
                                Tono Pradana
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
                                    Cakung
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
                                Suminah, drs
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
                                    Ketintang Surabaya
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
