import AppContainer from '../reusables/AppContainer';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    TouchableWithoutFeedback, Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LearningActivitiesScreen(props) {
    return (
        <AppContainer navigation={props.navigation}>
            <ScrollView>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginStart: 16,
                        marginEnd: 32,
                        marginTop: 20,
                        marginBottom: 16,
                    }}>
                    <MaterialCommunityIcons
                        name={'chevron-left'}
                        size={28}
                        onPress={() => props.navigation.goBack(null)}
                    />

                    <Text
                        style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                            fontSize: 22,
                            marginLeft: 16,
                            fontWeight: '500',
                        }}>
                        Aktivitas Belajar
                    </Text>
                </View>

                <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate('ExamScreen')}>
                    <View
                        style={{
                            backgroundColor: '#B9C0DA',
                            borderRadius: 8,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            marginBottom: 15,
                            alignItems: 'center'
                        }}>
                        <Text
                            style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight:  Platform.OS === 'android' ? undefined: '700',
                                fontSize: 22,
                                marginStart: 30,
                                flex: 1,
                                color: 'white',
                            }}>
                            Ujian
                        </Text>

                        <Image
                            source={require('../../assets/images/ic_exam.png')}
                            style={{
                                width: 76,
                                height: 140,
                                marginRight: 24,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate('AgendaScreen')}>
                    <View
                        style={{
                            backgroundColor: '#627FC1',
                            borderRadius: 8,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            paddingTop: -30,
                            marginBottom: 15,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={require('../../assets/images/ic_agenda.png')}
                            style={{
                                width: 76,
                                height: 130,
                                marginRight: 24,
                                marginStart: 24,
                                resizeMode: 'contain',
                            }}
                        />

                        <Text
                            style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight:  Platform.OS === 'android' ? undefined: '700',
                                textAlign: 'right',
                                marginRight: 30,
                                flex: 1,
                                color: 'white',
                                fontSize: 22,
                            }}>
                            Agenda
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate('AssignmentScreen')}>
                    <View
                        style={{
                            backgroundColor: '#1D3461',
                            borderRadius: 8,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            marginBottom: 15,
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight:  Platform.OS === 'android' ? undefined: '700',
                                fontSize: 22,
                                marginStart: 30,
                                flex: 1,
                                color: 'white',
                            }}>
                            Tugas
                        </Text>

                        <Image
                            source={require('../../assets/images/ic_assignment.png')}
                            style={{
                                width: 76,
                                height: 140,
                                marginRight: 24,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate('BehavioralRecordScreen')}>
                    <View
                        style={{
                            backgroundColor: '#091540',
                            borderRadius: 8,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            paddingTop: -30,
                            marginBottom: 15,
                            alignItems: 'center'
                        }}>
                        <Image
                            source={require('../../assets/images/ic_behaviour.png')}
                            style={{
                                width: 76,
                                height: 130,
                                marginRight: 24,
                                marginStart: 24,
                                resizeMode: 'contain'
                            }}
                        />

                        <Text
                            style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight:  Platform.OS === 'android' ? undefined: '700',
                                textAlign: 'right',
                                marginRight: 30,
                                flex: 1,
                                color: 'white',
                                fontSize: 22,
                            }}>
                            Catatan Perilaku
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate('AttendanceScreen')}>
                    <View
                        style={{
                            backgroundColor: '#42619B',
                            borderRadius: 8,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            marginBottom: 15,
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight:  Platform.OS === 'android' ? undefined: '700',
                                fontSize: 22,
                                marginStart: 30,
                                flex: 1,
                                color: 'white',
                            }}>
                            Absensi
                        </Text>

                        <Image
                            source={require('../../assets/images/ic_attendance.png')}
                            style={{
                                width: 76,
                                height: 140,
                                marginRight: 24,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate('ReportScreen')}>
                    <View
                        style={{
                            backgroundColor: '#7A91E5',
                            borderRadius: 8,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            paddingTop: -30,
                            marginBottom: 15,
                            alignItems: 'center'
                        }}>
                        <Image
                            source={require('../../assets/images/ic_report.png')}
                            style={{
                                width: 76,
                                height: 130,
                                marginRight: 24,
                                marginStart: 24,
                                resizeMode: 'contain'
                            }}
                        />

                        <Text
                            style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight:  Platform.OS === 'android' ? undefined: '700',
                                textAlign: 'right',
                                marginRight: 30,
                                flex: 1,
                                color: 'white',
                                fontSize: 22,
                            }}>
                            Hasil Laporan
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('OnlineTestIntroScreen')}>
                    <Text>Go To Online Test ></Text>
                </TouchableWithoutFeedback>
            </ScrollView>
        </AppContainer>
    );
}
