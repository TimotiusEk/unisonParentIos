import React, {useEffect, useState, useRef} from 'react';
import {
    Platform,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Dialog from "react-native-dialog";
import HttpRequest from "../../util/HttpRequest";
import AsyncStorage from "@react-native-community/async-storage";
import LoadingModal from "../reusables/LoadingModal";

export default function OnlineTestIntroScreen(props) {
    const [savedState, setSavedState] = useState(false)
    const [isLoading, setLoading] = useState(true);
    const [examDetail, setExamDetail] = useState({});
    const [multipleChoices, setMultipleChoices] = useState([]);
    const [essays, setEssays] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({idx: 0, type: 'MULTIPLE_CHOICES'});
    const [duration, setDuration] = useState(0); //in seconds

    useEffect(() => {
        getExamState()
    }, [])

    useEffect(() => {
        if (savedState && Object.keys(examDetail).length > 0) {
            goToOnlineTestScreen()
        }
    }, [selectedQuestion, multipleChoices, essays, duration, examDetail])

    const goToOnlineTestScreen = () => {
        props.navigation.navigate('OnlineTestScreen', {
            examId: props.navigation.getParam('examId'),
            selectedQuestion,
            multipleChoices,
            essays,
            duration,
            examDetail
        })
    }

    const getExamState = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/exams/state',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    exam_id: props.navigation.getParam('examId'),
                    student_id: props.navigation.getParam('studentId')
                }),
            ),
        ).then(response => {
            console.log('state', response)

            setSavedState(true)
            getExam(moment().diff(moment(moment.utc(response.data[0].exam_start_time).format('DD MMM YYYY, HH:mm:ss')), 'seconds'), response.data[0])
        }).catch(err => {
            if (err.msg) {
                if (err.msg === 'State not found') {
                    getExam()
                }
            }
        })
        // fetchAPI('exams/state', 'POST', {
        //     access_token: localStorage.getItem('access_token'),
        //     exam_id: parseInt(props.match?.params?.id),
        //     student_id: parseInt(props.match?.params?.student_id)
        // }, (response) => {
        //     if (response.result) {
        //         setSavedState(true)
        //         getExam(moment().diff(moment(moment.utc(response.data[0].exam_start_time).format('DD MMM YYYY, HH:mm:ss')), 'seconds'), response.data[0])
        //     } else {
        //         getExam()
        //     }
        // })
    }

    const getExam = async (runningDuration, savedState) => {
        const savedAnswers = savedState?.jawaban
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/exams/details',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    exam_id: props.navigation.getParam('examId'),
                }),
            ),
        ).then(response => {
            setLoading(false)
            if (response.data && Array.isArray(response.data)) {
                const multipleChoicesTemp = [];
                const essaysTemp = [];

                response.data[0].soal.pilihan_ganda.forEach((multipleChoice) => {
                    let answer = null;

                    if (savedAnswers) {
                        savedAnswers.forEach(savedAnswer => {
                            if (savedAnswer.exam_details_id === multipleChoice.id) {
                                answer = savedAnswer.jawaban_student;
                            }
                        })
                    }

                    multipleChoicesTemp.push({
                        ...multipleChoice,
                        question: multipleChoice.pertanyaan,
                        choices: [multipleChoice.pilihan?.pilihan_a, multipleChoice.pilihan?.pilihan_b, multipleChoice.pilihan?.pilihan_c, multipleChoice.pilihan?.pilihan_d, multipleChoice.pilihan?.pilihan_e],
                        answer
                    })
                })

                setMultipleChoices(multipleChoicesTemp)

                response.data[0].soal.isian.forEach((essay) => {
                    let answer = null;

                    if (savedAnswers) {
                        savedAnswers.forEach(savedAnswer => {
                            if (savedAnswer.exam_details_id === essay.id) {
                                answer = savedAnswer.jawaban_student;
                            }
                        })
                    }

                    essaysTemp.push({
                        ...essay,
                        question: essay.pertanyaan,
                        answer
                    })
                })

                if (multipleChoicesTemp.length === 0) {
                    setSelectedQuestion({
                        ...selectedQuestion,
                        type: 'ESSAY'
                    })
                }

                setEssays(essaysTemp)

                if (runningDuration) setDuration(response.data[0].durasi * 60 - runningDuration > 0 ? response.data[0].durasi * 60 - runningDuration : 0);
                else setDuration(response.data[0].durasi * 60);

                setExamDetail(response.data[0])

                // if (savedState) {
                //     goToOnlineTestScreen()
                // }
            }
        })
    }

    return (
        <View style={{flex: 1}}>
            <LoadingModal visible={isLoading}/>

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
                    {examDetail.subject}
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
                            {moment(examDetail.exam_date).format('DD MMMM YYYY')}
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
                            {examDetail.durasi} Menit
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
                            {examDetail.soal ? examDetail.soal?.isian?.length + examDetail.soal?.pilihan_ganda?.length : '-'}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={async () => {
                    if (!savedState) {
                        let user = await AsyncStorage.getItem('user');
                        user = JSON.parse(user);

                        new Promise(
                            await HttpRequest.set(
                                '/exams/state/save',
                                'POST',
                                JSON.stringify({
                                    access_token: user.access_token,
                                    exam_id: props.navigation.getParam('examId'),
                                    student_id: props.navigation.getParam('studentId')
                                }),
                            ),
                        ).then(response => {
                            if (response.result) {
                                goToOnlineTestScreen()
                            }
                        }).catch(err => {
                            // console.log('err', err)
                        })
                    } else {
                        goToOnlineTestScreen()
                    }
                }}
                disabled={false}>
                <View style={{
                    backgroundColor: '#3066D2', margin: 16, padding: 13, borderRadius: 8,
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
