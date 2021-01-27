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

const {config, fs} = RNFetchBlob;

export default function ExamScreen(props) {
    const [myChildren, setMyChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState({});
    const [selectedSubject, setSelectedSubject] = useState({});
    const [isLoadingShown, setLoadingShown] = useState(false);
    const rbSheetRef = useRef(null);
    const uploadRbSheetRef = useRef(null);
    const selectUploadRbSheetRef = useRef(null);
    const [select, setSelect] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedStartDateTemp, setSelectedStartDateTemp] = useState(null);
    const [selectedEndDateTemp, setSelectedEndDateTemp] = useState(null);
    const [exams, setExams] = useState([]);
    const [isExamErrorModalShown, setExamErrorModalShown] = useState(false);
    const [uploadFileIdx, setUploadFileIdx] = useState(null);
    const [selectedExam, setSelectedExam] = useState({});
    const [note, setNote] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageColor, setMessageColor] = useState(null);
    const [isParent, setParent] = useState(true);

    useEffect(() => {
        console.log('a');
        if (selectedChild.student_id) {
            if (selectedSubject.subject_id) getExam();
        } else {
            getMyChildren();
        }
    }, [selectedChild, selectedSubject, selectedStartDate, selectedEndDate]);

    const getExam = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        console.log('exam body', {
            access_token: user.access_token,
            class_id: selectedChild.class_id,
            pages: 1,
            subject_id: selectedSubject.subject_id,
            student_id: selectedChild.student_id,
            start_date: selectedStartDate
                ? moment(selectedStartDate).format('YYYY-MM-DD')
                : moment().format('YYYY-MM-DD'),
            end_date: selectedEndDate
                ? moment(selectedEndDate).format('YYYY-MM-DD')
                : moment().format('YYYY-MM-DD'),
        });

        new Promise(
            await HttpRequest.set(
                '/exams/student',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    class_id: selectedChild.class_id,
                    subject_id: selectedSubject.subject_id,
                    student_id: selectedChild.student_id,
                    start_date: selectedStartDate
                        ? moment(selectedStartDate).format('YYYY-MM-DD')
                        : moment().format('YYYY-MM-DD'),
                    end_date: selectedEndDate
                        ? moment(selectedEndDate).format('YYYY-MM-DD')
                        : moment().format('YYYY-MM-DD'),
                }),
            ),
        )
            .then((res) => {
                console.log('exams', res.data);
                setExams(res.data);
            })
            .catch((err) => console.log('exam err', err));
    };

    const getChildrenData = () => {

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
            }).catch(err => console.log(err))
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
                        console.log(err);
                    });
            } else {
                if (JSON.parse(myChildren).length > 0) {
                    setSelectedChild(JSON.parse(myChildren)[0]);
                }

                setMyChildren(JSON.parse(myChildren));
            }
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
        <AppContainer
            navigation={props.navigation}
            message={message}
            messageColor={messageColor}>
            <Dialog.Container visible={isExamErrorModalShown}>
                <Dialog.Title style={{fontFamily: 'Poppins-Regular', fontSize: 17}}>
                    Message
                </Dialog.Title>

                <Dialog.Description
                    style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
                    You are not allowed to view details yet exam!
                </Dialog.Description>

                <Dialog.Button
                    label="OK"
                    style={{fontFamily: 'Poppins-Regular'}}
                    onPress={() => {
                        setExamErrorModalShown(false);
                    }}
                />
            </Dialog.Container>

            <RBSheet
                ref={selectUploadRbSheetRef}
                closeOnDragDown={true}
                onClose={() => setUploadFileIdx(null)}
                height={350}
                openDuration={250}></RBSheet>

            <RBSheet
                ref={uploadRbSheetRef}
                closeOnDragDown={true}
                onClose={() => setUploadFileIdx(null)}
                height={350}
                openDuration={250}>
                <View style={{margin: 8, padding: 8}}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontFamily: 'Montserrat-Bold',
                        }}>
                        Upload File
                    </Text>

                    {uploadFileIdx === null && (
                        <View style={{flexDirection: 'row', marginTop: 16}}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setUploadFileIdx(1);
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Ionicons name="attach" size={24} color="#9EA3BA"/>

                                    <Text
                                        style={{
                                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                            fontSize: 18, marginLeft: 4
                                        }}>
                                        Upload File
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text
                                style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    fontSize: 18,
                                    marginLeft: 12
                                }}>
                                {selectedExam.file_path_student
                                    ? selectedExam.file_path_student.split('/')[
                                    selectedExam.file_path_student.split('/').length - 1
                                        ]
                                    : 'File 1 no data'}
                            </Text>
                        </View>
                    )}

                    {uploadFileIdx === null && (
                        <View style={{flexDirection: 'row', marginTop: 16}}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setUploadFileIdx(2);
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Ionicons name="attach" size={24} color="#9EA3BA"/>

                                    <Text
                                        style={{
                                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                            fontSize: 18,
                                            marginLeft: 4
                                        }}>
                                        Upload File
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text
                                style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    fontSize: 18,
                                    marginLeft: 12
                                }}>
                                {selectedExam.file_path_student2
                                    ? selectedExam.file_path_student2.split('/')[
                                    selectedExam.file_path_student2.split('/').length - 1
                                        ]
                                    : 'File 2 no data'}
                            </Text>
                        </View>
                    )}

                    {uploadFileIdx === null && (
                        <View style={{flexDirection: 'row', marginTop: 16}}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setUploadFileIdx(3);
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Ionicons name="attach" size={24} color="#9EA3BA"/>

                                    <Text
                                        style={{
                                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                            fontSize: 18,
                                            marginLeft: 4
                                        }}>
                                        Upload File
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text
                                style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    fontSize: 18,
                                    marginLeft: 12
                                }}>
                                {selectedExam.file_path_student3
                                    ? selectedExam.file_path_student3.split('/')[
                                    selectedExam.file_path_student3.split('/').length - 1
                                        ]
                                    : 'File 3 no data'}
                            </Text>
                        </View>
                    )}

                    {uploadFileIdx ? (
                        <TextInput
                            placeholder={'Exam Note'}
                            value={note}
                            onChangeText={(note) => setNote(note)}
                            style={{
                                borderBottomWidth: 1,
                                marginTop: 24,
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',
                                fontWeight: '500',
                            }}
                        />
                    ) : null}

                    {uploadFileIdx ? (
                        <Text
                            style={{
                                marginTop: 16,
                                padding: 12,
                                fontSize: 18,
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                            }}>
                            Choose your Photo or File
                        </Text>
                    ) : null}

                    {uploadFileIdx ? (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                ImagePicker.launchImageLibrary(
                                    {
                                        mediaType: 'photo',
                                    },
                                    async (response) => {


                                        const res = await fetch(response.uri);

                                        const blob = await res.blob();

                                        const file = new File([blob], response.fileName, {
                                            type: response.type,
                                        });

                                        let user = await AsyncStorage.getItem('user');
                                        user = JSON.parse(user);

                                        const data = new FormData();
                                        data.append('access_token', user.access_token);
                                        data.append('exam_id', selectedExam.exam_id);
                                        data.append('student_id', selectedChild.student_id);
                                        data.append('file', Platform.OS === 'ios' ? file : {
                                            uri: response.uri,
                                            name: response.fileName,
                                            type: response.type
                                        });
                                        data.append('file1', uploadFileIdx === 1);
                                        data.append('file2', uploadFileIdx === 2);
                                        data.append('file3', uploadFileIdx === 3);
                                        data.append('note', note);

                                        fetch('https://api.unison.id/uploadResult/exam', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'multipart/form-data',
                                            },
                                            body: data,
                                        })
                                            .then((response) => response.json())
                                            .then((res) => {
                                                getExam();
                                                uploadRbSheetRef.current.close();
                                                setMessage(res.msg);

                                                setTimeout(() => {
                                                    setMessage(null);
                                                }, 3000);
                                            })
                                            .catch((err) => {
                                                console.log('err', err);

                                                uploadRbSheetRef.current.close();
                                                setMessageColor('red');
                                                setMessage(res.msg);

                                                setTimeout(() => {
                                                    setMessageColor(null);
                                                    setMessage(null);
                                                }, 3000);
                                            });
                                    },
                                );
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 16,
                                    padding: 12,
                                    alignItems: 'center',
                                }}>
                                <MaterialCommunityIcons
                                    name="image"
                                    size={24}
                                    color={'#757575'}
                                    style={{marginRight: 16}}
                                />
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    fontSize: 18
                                }}>
                                    Take from gallery
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}

                    {uploadFileIdx ? (
                        <TouchableWithoutFeedback
                            onPress={async () => {
                                let user = await AsyncStorage.getItem('user');
                                user = JSON.parse(user);

                                try {
                                    const response = await DocumentPicker.pick({});

                                    const res = await fetch(response.uri);

                                    const blob = await res.blob();

                                    const file = new File([blob], response.name, {
                                        type: response.type,
                                    });

                                    const data = new FormData();
                                    data.append('access_token', user.access_token);
                                    data.append('exam_id', selectedExam.exam_id);
                                    data.append('student_id', selectedChild.student_id);
                                    data.append('file', Platform.OS === 'ios' ? file : {
                                        uri: response.uri,
                                        name: response.name,
                                        type: response.type
                                    });
                                    data.append('file1', uploadFileIdx === 1);
                                    data.append('file2', uploadFileIdx === 2);
                                    data.append('file3', uploadFileIdx === 3);
                                    data.append('note', note);

                                    fetch('https://api.unison.id/uploadResult/exam', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                        body: data,
                                    })
                                        .then((response) => response.json())
                                        .then((res) => {
                                            getExam();
                                            uploadRbSheetRef.current.close();

                                            setMessage(res.msg);

                                            setTimeout(() => {
                                                setMessage(null);
                                            }, 3000);
                                        })
                                        .catch((err) => {
                                            console.log('err', err);

                                            uploadRbSheetRef.current.close();
                                            setMessageColor('red');
                                            setMessage(res.msg);

                                            setTimeout(() => {
                                                setMessageColor(null);
                                                setMessage(null);
                                            }, 3000);
                                        });
                                } catch (e) {
                                    console.log('e', e);
                                }
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 16,
                                    padding: 12,
                                    alignItems: 'center',
                                }}>
                                <Ionicons
                                    name="attach"
                                    size={24}
                                    color="#9EA3BA"
                                    style={{marginRight: 16}}
                                />
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                    fontSize: 18
                                }}>
                                    Upload File (apart from photos)
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}
                </View>
            </RBSheet>

            <ScrollView>
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
                                            console.log('start', selectedStartDateTemp);
                                            console.log('end', selectedEndDateTemp);
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
                            Exam
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
                            source={require('../../assets/images/ic_exam_activity.png')}
                        />
                    </View>
                </View>

                <View
                    style={{flexDirection: 'row', marginTop: 15, marginHorizontal: 15}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontFamily: 'Montserrat-Regular'}}>Exam</Text>
                        <Text
                            style={{
                                color: '#425AC2',
                                fontFamily: 'Montserrat-Regular',
                            }}>
                            {selectedStartDate
                                ? moment(selectedStartDate).format('DD MMM YYYY')
                                : moment().format('DD MMM YYYY')}{' '}
                            {selectedEndDate &&
                            ` - ${moment(selectedEndDate).format('DD MMM YYYY')}`}
                        </Text>
                    </View>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            rbSheetRef.current.open();

                            setSelect('date');
                        }}>
                        <View
                            style={{
                                borderWidth: 2,
                                borderColor: '#f3f3f3',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'flex-start',
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                            }}>
                            <Text
                                style={{
                                    fontFamily: 'Montserrat-Regular',
                                    fontSize: 12,
                                    textDecorationLine: 'underline',
                                }}>
                                {' '}
                                Choose Date
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <Text
                    style={{
                        fontFamily: 'Montserrat-Bold',
                        marginHorizontal: 15,
                        marginTop: 20,
                        marginBottom: 5,
                    }}>
                    Summary
                </Text>

                <View
                    style={{
                        marginHorizontal: 15,
                        marginTop: 15,
                        backgroundColor: '#E1E6F0',
                        paddingHorizontal: 15,
                        borderRadius: 8,
                        flexDirection: 'row',
                    }}>
                    <View style={{flex: 1, paddingVertical: 20}}>
                        <Text
                            style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 12,
                                marginBottom: 7,
                            }}>
                            Passed
                        </Text>

                        <Text
                            style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 12,
                                marginBottom: 7,
                            }}>
                            Not Passed
                        </Text>

                        <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12}}>
                            Not Follow Exam
                        </Text>
                    </View>

                    <Image
                        source={require('../../assets/images/ic_exam_summary.png')}
                        style={{width: 76, resizeMode: 'contain'}}
                    />
                </View>

                {exams.map((exam) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                console.log();
                                if (moment().isBefore(moment.utc(exam.start_time))) {
                                    setExamErrorModalShown(true);
                                } else {
                                    props.navigation.navigate('ExamDetailScreen', {exam});
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
                                        {exam.exam}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                            marginTop: 8,
                                            marginBottom: 8,
                                            fontSize: 12,
                                            color: '#878787',
                                        }}>
                                        {exam.subject}
                                    </Text>
                                </View>

                                {exam.file_path && (
                                    <TouchableWithoutFeedback
                                        onPress={(e) => {
                                            if (moment().isBefore(moment.utc(exam.start_time))) {
                                                setExamErrorModalShown(true);
                                            } else {
                                                e.stopPropagation();

                                                let PictureDir =
                                                    Platform.OS === 'ios'
                                                        ? fs.dirs.DocumentDir
                                                        : fs.dirs.PictureDir;
                                                let options = {
                                                    fileCache: true,
                                                    path:
                                                        PictureDir +
                                                        `/${
                                                            exam.file_path.split('/')[
                                                            exam.file_path.split('/').length - 1
                                                                ]
                                                        }`,
                                                    addAndroidDownloads: {
                                                        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                                                        notification: true,
                                                        path:  PictureDir + `${
                                                            exam.file_path.split('/')[
                                                            exam.file_path.split('/').length - 1
                                                                ]
                                                        }`,
                                                        description: 'Downloading exam file',
                                                    },
                                                };

                                                config(options)
                                                    .fetch('GET', exam.file_path)
                                                    .then((res) => {
                                                        if (Platform.OS === 'ios') {
                                                            console.log(res.data);

                                                            RNFetchBlob.ios.openDocument(res.data);
                                                        }
                                                    })
                                                    .catch((err) => console.log('err', err));
                                            }
                                        }}>
                                        <View
                                            style={{
                                                backgroundColor: '#f2f2f2',
                                                width: 28,
                                                height: 28,
                                                borderRadius: 14,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                marginStart: 8,
                                                marginEnd: 8,
                                            }}>
                                            <AntDesign name={'download'} size={20}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )}
                                <TouchableWithoutFeedback
                                    onPress={(e) => {
                                        if (moment().isBefore(moment.utc(exam.start_time))) {
                                            setExamErrorModalShown(true);
                                        } else {
                                            e.stopPropagation();
                                            setNote(null);
                                            setSelectedExam(exam);
                                            uploadRbSheetRef.current.open();
                                        }
                                    }}>
                                    <Image
                                        source={require('../../assets/images/ic_upload.png')}
                                        style={{
                                            width: 28,
                                            height: 28,
                                            marginTop: 16,
                                            marginEnd: 16,
                                            marginStart: 8,
                                        }}
                                    />
                                </TouchableWithoutFeedback>

                                <Text
                                    style={{
                                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                        color: '#878787',
                                        fontSize: 12,
                                        marginTop: 10,
                                        marginEnd: 10,
                                    }}>
                                    {moment.utc(exam.exam_date).format('DD MMM')}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        </AppContainer>
    );
}
