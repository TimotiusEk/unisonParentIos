import React, {useState, useRef, useEffect} from 'react';
import {
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
    Image,
    TextInput,
} from 'react-native';
import AppContainer from '../reusables/AppContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import HttpRequest from '../../util/HttpRequest';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import CalendarPicker from 'react-native-calendar-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Dialog from 'react-native-dialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker/src';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import {NavigationEvents} from "react-navigation";

const {config, fs} = RNFetchBlob;

export default function OnlineTestListScreen(props) {
    const [myChildren, setMyChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState({});
    const rbSheetRef = useRef(null);
    const [select, setSelect] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedStartDateTemp, setSelectedStartDateTemp] = useState(null);
    const [selectedEndDateTemp, setSelectedEndDateTemp] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageColor, setMessageColor] = useState(null);
    const [isParent, setParent] = useState(true);
    const [onlineExams, setOnlineExams] = useState([]);

    useEffect(() => {
        if (selectedChild.student_id) {
            getOnlineExamList()
        } else {
            getMyChildren();
        }
    }, [selectedChild, selectedStartDate, selectedEndDate]);

    const getOnlineExamList = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/exams/online/parent',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    class_id: selectedChild.class_id,
                    student_id: selectedChild.student_id,
                    pages: 1
                }),
            ),
        ).then(res => {
            // console.log(res)
            setOnlineExams(res.data)
        }).catch(err => {
            // console.log(err)
        })
    }

    const getMyChildren = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        if (!user.parent_id) {
            setParent(false)

            new Promise(
                await HttpRequest.set(
                    '/users/student',
                    'POST',
                    JSON.stringify({
                        access_token: user.access_token,
                    }),
                ),
            ).then(res => {
                setSelectedChild(res.data[0]);
            }).catch(err => {
                // console.log(err)
            })
        } else {
            let myChildren = await AsyncStorage.getItem('myChildren');

            if (!myChildren) {
                new Promise(
                    await HttpRequest.set(
                        '/students/mychildren',
                        'POST',
                        JSON.stringify({
                            access_token: user.access_token,
                        }),
                    ),
                )
                    .then(async (res) => {
                        if (res.data.length > 0) {
                            setSelectedChild(res.data[0]);
                        }

                        setMyChildren(res.data);

                        await AsyncStorage.setItem('myChildren', JSON.stringify(res.data));
                    })
                    .catch((err) => {
                        // console.log(err);
                    });
            } else {
                if (JSON.parse(myChildren).length > 0) {
                    setSelectedChild(JSON.parse(myChildren)[0]);
                }

                setMyChildren(JSON.parse(myChildren));
            }
        }
    };

    const showMessage = (message) => {
        setMessage(message)

        setTimeout(() => {
            setMessage(null);
        }, 3000);
    }

    return (
        <AppContainer
            navigation={props.navigation}
            message={message}
            messageColor={messageColor}>
            <ScrollView>
                <NavigationEvents
                    onDidFocus={getOnlineExamList}
                />

                <RBSheet
                    ref={rbSheetRef}
                    closeOnDragDown={true}
                    height={select === 'date' ? 500 : 600}
                    openDuration={250}>
                    <View style={{flex: 1}}>
                        <Text
                            style={{
                                fontFamily: 'Montserrat-SemiBold',
                                marginLeft: select === 'date' ? 0 : 15,
                                marginTop: 8,
                                marginBottom: 15,
                                fontSize: 16,
                                textAlign: select === 'date' ? 'center' : 'left',
                            }}>
                            {select === 'class'
                                ? 'Class Children'
                                : select === 'subject'
                                    ? 'Subject'
                                    : 'Selected Date & Times'}
                        </Text>

                        {select !== 'date' && (
                            <View
                                style={{width: '100%', height: 1, backgroundColor: '#f3f3f3'}}
                            />
                        )}

                        <ScrollView>
                            {select === 'date' && (
                                <View style={{flex: 1}}>
                                    <CalendarPicker
                                        selectedDayColor={'#3e67d6'}
                                        selectedDayTextColor={'white'}
                                        allowRangeSelection={true}
                                        previousComponent={
                                            <AntDesign name={'caretleft'} color={'#3e67d6'}/>
                                        }
                                        nextComponent={
                                            <AntDesign name={'caretright'} color={'#3e67d6'}/>
                                        }
                                        onDateChange={(date, type) => {
                                            if (type === 'END_DATE') {
                                                setSelectedEndDateTemp(date);
                                            } else {
                                                setSelectedStartDateTemp(date);
                                            }
                                        }}
                                    />

                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            setSelectedStartDate(selectedStartDateTemp);
                                            setSelectedEndDate(selectedEndDateTemp);
                                            rbSheetRef.current.close();
                                        }}>
                                        <View
                                            style={{
                                                backgroundColor: '#3e67d6',
                                                paddingHorizontal: 32,
                                                paddingVertical: 15,
                                                borderRadius: 8,
                                                marginTop: 30,
                                                alignSelf: 'flex-end',
                                                marginRight: 15,
                                            }}>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontFamily: 'Montserrat-Regular',
                                                }}>
                                                OK
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )}

                            {select === 'class' &&
                            myChildren.map((child) => {
                                return (
                                    <>
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                setSelectedChild(child);
                                                rbSheetRef.current.close();
                                            }}>
                                            <View style={{padding: 15}}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Montserrat-Regular',
                                                        fontSize: 16,
                                                    }}>
                                                    {child.student_name} - {child.class_name}
                                                </Text>

                                                <Text
                                                    style={{
                                                        fontFamily: 'Montserrat-Regular',
                                                        fontSize: 13,
                                                        marginTop: 10,
                                                        color: 'grey',
                                                    }}>
                                                    {child.school_name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Montserrat-Regular',
                                                        fontSize: 13,
                                                        marginTop: 2,
                                                        color: 'grey',
                                                    }}>
                                                    {child.class_name}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <View
                                            style={{
                                                width: '100%',
                                                height: 1,
                                                backgroundColor: '#f3f3f3',
                                            }}
                                        />
                                    </>
                                );
                            })}
                        </ScrollView>
                    </View>
                </RBSheet>

                <View style={{backgroundColor: '#B9C0DA'}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingStart: 16,
                            // marginTop: 16,
                            marginBottom: 16,
                            paddingTop: 15,
                            backgroundColor: '#B9C0DA',
                        }}>
                        <MaterialCommunityIcons
                            name={'arrow-left'}
                            size={28}
                            color={'white'}
                            onPress={() => props.navigation.goBack(null)}
                        />

                        <Text
                            style={{
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 24,
                                marginLeft: 16,
                                color: 'white',
                            }}>
                            Online Test
                        </Text>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 24,
                            margin: 8,
                            marginTop: 16,
                            flexDirection: 'row',
                        }}>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                if (isParent) {
                                    setSelect('class');
                                    rbSheetRef.current.open();
                                }
                            }}>
                            <View style={{flex: 1, marginTop: 20}}>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 4,
                                        marginStart: 8,
                                        marginTop: 4,
                                        flexDirection: 'row',
                                    }}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode={'tail'}
                                        style={{
                                            fontFamily: 'Montserrat-Regular',
                                            color: 'grey',
                                            marginStart: 16,
                                            marginTop: 8,
                                            marginBottom: 8,
                                            flex: 1,
                                        }}>
                                        {selectedChild.student_name} - {selectedChild.class_name}
                                    </Text>

                                    {isParent &&
                                    <Fontisto
                                        name={'angle-down'}
                                        style={{
                                            color: 'grey',
                                            marginEnd: 8,
                                            marginTop: 8,
                                            marginBottom: 8,
                                        }}
                                        size={16}
                                    />
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{flex: 1}}/>

                        <Image
                            source={require('../../assets/images/ic_exam_activity.png')}
                        />
                    </View>
                </View>

                {/*<View*/}
                {/*    style={{flexDirection: 'row', marginTop: 15, marginHorizontal: 15}}>*/}
                {/*    <View style={{flex: 1}}>*/}
                {/*        <Text style={{fontFamily: 'Montserrat-Regular'}}>Online Test</Text>*/}
                {/*        <Text*/}
                {/*            style={{*/}
                {/*                color: '#425AC2',*/}
                {/*                fontFamily: 'Montserrat-Regular',*/}
                {/*            }}>*/}
                {/*            {selectedStartDate*/}
                {/*                ? moment(selectedStartDate).format('DD MMM YYYY')*/}
                {/*                : moment().format('DD MMM YYYY')}{' '}*/}
                {/*            {selectedEndDate &&*/}
                {/*            ` - ${moment(selectedEndDate).format('DD MMM YYYY')}`}*/}
                {/*        </Text>*/}
                {/*    </View>*/}

                {/*    <TouchableWithoutFeedback*/}
                {/*        onPress={() => {*/}
                {/*            rbSheetRef.current.open();*/}

                {/*            setSelect('date');*/}
                {/*        }}>*/}
                {/*        <View*/}
                {/*            style={{*/}
                {/*                borderWidth: 2,*/}
                {/*                borderColor: '#f3f3f3',*/}
                {/*                alignItems: 'center',*/}
                {/*                justifyContent: 'center',*/}
                {/*                alignSelf: 'flex-start',*/}
                {/*                borderRadius: 10,*/}
                {/*                paddingHorizontal: 10,*/}
                {/*                paddingVertical: 5,*/}
                {/*            }}>*/}
                {/*            <Text*/}
                {/*                style={{*/}
                {/*                    fontFamily: 'Montserrat-Regular',*/}
                {/*                    fontSize: 12,*/}
                {/*                    textDecorationLine: 'underline',*/}
                {/*                }}>*/}
                {/*                {' '}*/}
                {/*                Choose Date*/}
                {/*            </Text>*/}
                {/*        </View>*/}
                {/*    </TouchableWithoutFeedback>*/}
                {/*</View>*/}

                {
                    onlineExams.map(exam => {
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                if (!exam.total_nilai) {
                                    const isBeforeTodayDate = moment(moment(exam.exam_date).format('DD MMM YYYY')).isBefore(moment(moment().format('DD MMM YYYY')));
                                    const isAfterTodayDate = moment(moment(exam.exam_date).format('DD MMM YYYY')).isAfter(moment(moment().format('DD MMM YYYY')));

                                    if (exam.is_finish === "true") {
                                        showMessage('Ujian Anda sedang dalam proses penilaian')
                                    } else if (isBeforeTodayDate || isAfterTodayDate) {
                                        if (isBeforeTodayDate) {
                                            showMessage('Ujian online telah berlalu')
                                        } else {
                                            showMessage('Ujian online belum dimulai')
                                        }
                                    } else {
                                        props.navigation.navigate('OnlineExamSwitch', {
                                            studentId: selectedChild.student_id,
                                            examId: exam.id
                                        })
                                    }
                                } else {
                                    props.navigation.navigate('OnlineTestReviewScreen', {
                                        studentId: selectedChild.student_id,
                                        examId: exam.id
                                    })
                                }
                            }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        borderColor: '#2DBBBBBB',
                                        borderRadius: 8,
                                        margin: 8,
                                    }}>
                                    <View style={{flex: 1, marginStart: 16, marginTop: 16}}>
                                        <Text style={{
                                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                            fontWeight: Platform.OS === 'android' ? undefined : '700'
                                        }}>
                                            {exam.subject}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                                marginTop: 8,
                                                marginBottom: 8,
                                                fontSize: 12,
                                                color: '#878787',
                                            }}>
                                            {exam.durasi} Menit
                                        </Text>
                                    </View>

                                    <View>
                                        <Text
                                            style={{
                                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                                color: '#878787',
                                                fontSize: 12,
                                                marginTop: 10,
                                                marginEnd: 10,
                                                textAlign: 'right'
                                            }}>
                                            {moment(exam.exam_date).format('DD MMM')}
                                        </Text>

                                        <Text style={{
                                            textAlign: 'right',
                                            marginTop: 10,
                                            marginEnd: 10,
                                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                                            fontSize: 17,
                                            color: '#3066D2'
                                        }}>
                                            {exam.total_nilai}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </AppContainer>
    );
}
