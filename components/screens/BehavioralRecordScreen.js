import React, {useState, useRef, useEffect} from 'react';
import {
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
    Image,
    StatusBar,
    Dimensions,
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
import Carousel from 'react-native-snap-carousel';

export default function AgendaScreen(props) {
    const carouselRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(-1);
    const [behaviors, setBehaviors] = useState([]);

    const [myChildren, setMyChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState({});
    const [selectedSubject, setSelectedSubject] = useState({});
    const [isLoadingShown, setLoadingShown] = useState(false);
    const rbSheetRef = useRef(null);
    const [select, setSelect] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedStartDateTemp, setSelectedStartDateTemp] = useState(null);
    const [selectedEndDateTemp, setSelectedEndDateTemp] = useState(null);
    const [isParent, setParent] = useState(true);

    useEffect(() => {
        if (selectedChild.student_id) {
            if (selectedSubject.subject_id) {
                getBehaviors();
            }
        } else getMyChildren();
    }, [selectedChild, selectedSubject]);

    const getBehaviors = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/behaviours/student',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    class_id: selectedChild.class_id,
                    pages: 1,
                    subject_id: selectedSubject.subject_id,
                    student_id: selectedChild.student_id,
                    keyword: '',
                    numberOfRows: 10,
                }),
            ),
        )
            .then((res) => {
                console.log('res', res);

                setBehaviors(res.data);
            })
            .catch((err) => console.log('err', err));
    };

    const getMyChildren = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        let myChildren = await AsyncStorage.getItem('myChildren');

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
            }).catch(err => console.log(err))
        } else if (!myChildren) {
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
                    console.log(err);
                });
        } else {
            if (JSON.parse(myChildren).length > 0) {
                setSelectedChild(JSON.parse(myChildren)[0]);
            }

            setMyChildren(JSON.parse(myChildren));
        }
    };

    const fetchAndOpenSheet = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        setSelect('subject');
        setLoadingShown(true);

        new Promise(
            await HttpRequest.set(
                '/subjects/class',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    class_id: selectedChild.class_id,
                }),
            ),
        )
            .then((res) => {
                setLoadingShown(false);

                setSubjects(res.data);
                rbSheetRef.current.open();
            })
            .catch((err) => {
                setLoadingShown(false);

                console.log('err', err);
            });
    };

    return (
        <AppContainer navigation={props.navigation}>
            <ScrollView>
                <RBSheet
                    ref={rbSheetRef}
                    closeOnDragDown={true}
                    height={select === 'date' ? 440 : 600}
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
                                        selectedDayColor={'blue'}
                                        selectedDayTextColor={'white'}
                                        allowRangeSelection={true}
                                        previousComponent={
                                            <AntDesign name={'caretleft'} color={'blue'}/>
                                        }
                                        nextComponent={
                                            <AntDesign name={'caretright'} color={'blue'}/>
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
                                            console.log('start', selectedStartDateTemp);
                                            console.log('end', selectedEndDateTemp);
                                        }}>
                                        <Text
                                            style={{
                                                backgroundColor: 'blue',
                                                color: 'white',
                                                alignSelf: 'flex-end',
                                                marginRight: 15,
                                                paddingHorizontal: 32,
                                                paddingVertical: 15,
                                                borderRadius: 10,
                                                fontFamily: 'Montserrat-Regular',
                                                marginTop: 30,
                                            }}>
                                            OK
                                        </Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            )}

                            {select === 'subject' &&
                            subjects.map((subject) => {
                                return (
                                    <>
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                setSelectedSubject(subject);

                                                rbSheetRef.current.close();
                                            }}>
                                            <View style={{padding: 15}}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Montserrat-Regular',
                                                        fontSize: 16,
                                                    }}>
                                                    {subject.subject}
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

                            {select === 'class' &&
                            myChildren.map((child) => {
                                return (
                                    <>
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                setSelectedChild(child);
                                                setSelectedSubject({});
                                                fetchAndOpenSheet();
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

                <View style={{backgroundColor: '#091540', marginBottom: 20}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingStart: 16,
                            // marginTop: 16,
                            marginBottom: 16,
                            paddingTop: 15,
                            backgroundColor: '#091540',
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
                            Behavioral Record's
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
                                            marginEnd: isParent ? 0 : 16,
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

                        <TouchableWithoutFeedback
                            onPress={() => {
                                if (selectedChild) {
                                    fetchAndOpenSheet();
                                } else {
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
                                        {selectedSubject && selectedSubject.subject
                                            ? selectedSubject.subject
                                            : 'Subject'}
                                    </Text>

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
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <Image
                            source={require('../../assets/images/ic_notes_behavior.png')}
                        />
                    </View>
                </View>

                {behaviors.length === 0 ? (
                    <Text
                        style={{
                            fontFamily: 'Montserrat-Bold',
                            textAlign: 'center',
                            marginTop: 20,
                        }}>
                        None Of Your Data{'\n'}at this time
                    </Text>
                ) : (
                    behaviors.map((behavior) => {
                        return (
                            <View
                                style={{
                                    borderColor: '#e0e0e0',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    marginHorizontal: 15,
                                    flexDirection: 'row',
                                    marginBottom: 15,
                                    paddingTop: 12,
                                    paddingBottom: 12
                                }}>
                                <View style={{
                                    backgroundColor: '#D9F6F4',
                                    width: 56,
                                    height: 56,
                                    borderRadius: 28,
                                    justifyContent: 'center',
                                    marginLeft: 20,
                                    marginRight: 10
                                }}>
                                    <Text style={{fontFamily: 'Poppins-Bold', textAlign: 'center'}}>
                                        {moment.utc(behavior.incident_date).format('DD')}
                                        {'\n'}
                                        {moment.utc(behavior.incident_date).format('MMM')}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                        }}>
                                        {behavior.behaviour}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#818181',
                                            fontFamily: 'Poppins-Regular',
                                            marginTop: 10,
                                        }}>
                                        {behavior.student_name}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#818181',
                                            fontFamily: 'Poppins-Regular',
                                        }}>
                                        {behavior.subject}
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                )}
            </ScrollView>
        </AppContainer>
    );
}
