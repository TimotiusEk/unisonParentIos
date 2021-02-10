import React, {useEffect, useState, useRef} from 'react';
import {
    Platform,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function OnlineTestIntroScreen(props) {
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

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../assets/images/ic-online-learning.png')}
                       style={{width: 150, resizeMode: 'contain'}}/>

                <Text
                    style={{
                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                        fontWeight: Platform.OS === 'android' ? undefined : '700',
                        fontSize: 20,
                        color: '#666666'
                    }}>
                    Selamat Datang di test online
                </Text>

                <Text style={{
                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                    fontSize: 20,
                    color: '#333333',
                    marginTop: 5
                }}>
                    Geografi
                </Text>

                <View style={{flexDirection: 'row', marginTop: 38}}>
                    <View style={{marginRight: 40}}>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                            color: '#666666',
                            fontSize: 12
                        }}>
                            Waktu Pelaksanaan
                        </Text>

                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            fontSize: 16,
                            marginTop: 8,
                            color: '#3066D2'
                        }}>
                            21 Januari{'\n'}
                            2020
                        </Text>
                    </View>

                    <View style={{marginRight: 40}}>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                            color: '#666666',
                            fontSize: 12
                        }}>
                            Durasi Test
                        </Text>

                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            fontSize: 16,
                            marginTop: 8,
                            color: '#3066D2'
                        }}>
                            60 Menit
                        </Text>
                    </View>

                    <View>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                            color: '#666666',
                            fontSize: 12
                        }}>
                            Jumlah Soal
                        </Text>

                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            fontSize: 16,
                            marginTop: 8,
                            color: '#3066D2'
                        }}>
                            10
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => props.navigation.navigate('OnlineTestScreen')}
                disabled={false}>
                <View style={{backgroundColor: '#3066D2', margin: 16, padding: 13, borderRadius: 8,
                    marginBottom: Platform.OS === 'ios' ? 40 : 16
                    // opacity: .3
                }}>
                    <Text style={{
                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                        fontWeight: Platform.OS === 'android' ? undefined : '700',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        Mulai Test
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
