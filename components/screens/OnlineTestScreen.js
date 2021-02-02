import React, {useEffect, useState, useRef} from 'react';
import {
    Platform,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Collapsible from "react-native-collapsible";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function OnlineTestScreen(props) {
    const [isQuestionCollapsed, setQuestionCollapsed] = useState(false);

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
                            style={{opacity: 0}}
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
                        Ujian Online
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

            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#e3e3e380',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: 'Avenir',
                        fontWeight: '700',
                        flex: 1
                    }}>
                        Geografi
                    </Text>

                    <Image source={require('../../assets/images/ic-time.png')}
                           style={{width: 18, resizeMode: 'contain'}}/>

                    <Text style={{
                        color: '#666666',
                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                        fontSize: 12,
                        marginLeft: 6
                    }}>
                        Sisa Waktu :
                    </Text>

                    <Text style={{
                        color: '#3066D2', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                        fontWeight: Platform.OS === 'android' ? undefined : '700', marginLeft: 8
                    }}>
                        59 : 00 : 59
                    </Text>
                </View>

                <View style={{
                    backgroundColor: '#e3e3e380',
                    marginTop: 2,
                    flex: 1
                }}>
                    <TouchableWithoutFeedback onPress={() => setQuestionCollapsed(!isQuestionCollapsed)}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 16,
                            paddingVertical: 12
                        }}>
                            <Text style={{
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                flex: 1,
                            }}>
                                Indikator Pengerjaan Soal (1/45)
                            </Text>

                            <Ionicons name={isQuestionCollapsed ? 'chevron-down-outline' : 'chevron-up-outline'}
                                      color={'#25282b'} size={20}/>
                        </View>
                    </TouchableWithoutFeedback>

                    {!isQuestionCollapsed &&
                    <>
                        <View style={{backgroundColor: '#dddddd', height: 1, marginHorizontal: 16}}/>

                        <View style={{
                            marginTop: 5, paddingLeft: 15, paddingRight: 15,
                            justifyContent: 'center',
                            flex: .3,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <Image source={require('../../assets/images/wave.png')}
                                   style={{position: 'absolute', bottom: 0, right: 0, zIndex: -1, height: '100%', resizeMode: 'stretch'}}/>

                            <ScrollView>
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    color: 'black',
                                    marginTop: 16,
                                    marginBottom: 8
                                }}>
                                    Pilihan Ganda
                                </Text>

                                <View style={{flexDirection: 'row'}}>
                                    <View style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <View style={{
                                            backgroundColor: '#3066D2',
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 1000,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                                fontWeight: Platform.OS === 'android' ? undefined : '700',
                                            }}>1</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <View style={{
                                            backgroundColor: '#C4C4C4',
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 1000,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: 'black',
                                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                                fontWeight: Platform.OS === 'android' ? undefined : '700',
                                            }}>2</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </>
                    }

                    <View style={{flex: 1, backgroundColor: 'white', paddingTop: 24, paddingHorizontal: 16}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                width: 30,
                                color: '#333333',
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'
                            }}>1. </Text>
                            <Text style={{
                                color: '#333333',
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                            }}>Dimanakah Ibukota Jawa Tengah</Text>
                        </View>

                        <View style={{
                            shadowOffset: {width: 0, height: 0},
                            elevation: 2,
                            shadowOpacity: 0.15,
                            shadowRadius: 5,
                            backgroundColor: 'white',
                            marginLeft: 30,
                            marginTop: 16,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderRadius: 8
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    color: '#646464'
                                }}>
                                    A.
                                </Text>

                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    marginLeft: 8,
                                }}>
                                    Banjarnegara
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            shadowOffset: {width: 0, height: 0},
                            elevation: 2,
                            shadowOpacity: 0.15,
                            shadowRadius: 5,
                            backgroundColor: 'white',
                            marginLeft: 30,
                            marginTop: 16,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderRadius: 8
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    color: '#646464'
                                }}>
                                    B.
                                </Text>

                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    marginLeft: 8,
                                }}>
                                    Salatiga
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            shadowOffset: {width: 0, height: 0},
                            elevation: 2,
                            shadowOpacity: 0.15,
                            shadowRadius: 5,
                            backgroundColor: 'white',
                            marginLeft: 30,
                            marginTop: 16,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderRadius: 8
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    color: '#646464'
                                }}>
                                    C.
                                </Text>

                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    marginLeft: 8,
                                }}>
                                    Karanganyar
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            shadowOffset: {width: 0, height: 0},
                            elevation: 2,
                            shadowOpacity: 0.15,
                            shadowRadius: 5,
                            backgroundColor: '#f6f7fc',
                            marginLeft: 30,
                            marginTop: 16,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#3E6EDE'
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    color: '#646464'
                                }}>
                                    D.
                                </Text>

                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    marginLeft: 8,
                                }}>
                                    Semarang
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            shadowOffset: {width: 0, height: 0},
                            elevation: 2,
                            shadowOpacity: 0.15,
                            shadowRadius: 5,
                            backgroundColor: 'white',
                            marginLeft: 30,
                            marginTop: 16,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderRadius: 8
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    color: '#646464'
                                }}>
                                    E.
                                </Text>

                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    marginLeft: 8,
                                }}>
                                    Surakarta
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
