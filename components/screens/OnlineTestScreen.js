import React, {useEffect, useState, useRef} from 'react';
import {
    Platform,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    Modal,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppContainer from '../reusables/AppContainer';
import AsyncStorage from "@react-native-community/async-storage";
import HttpRequest from "../../util/HttpRequest";
import Image from 'react-native-scalable-image';

export default function OnlineTestScreen(props) {
    const [duration, setDuration] = useState(props.navigation.getParam('duration')); //in seconds
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDuration(duration => {
                return duration - 1
            })
        }, 1000)

        setIntervalId(intervalId);
    }, [])

    useEffect(() => {
        if (duration === 0 && intervalId) {
            setFinishModalVisible(true)

            clearInterval(intervalId)
        }
    }, [duration, intervalId])

    useEffect(() => {
        return () => {
            clearInterval(intervalId)
        }
    }, [intervalId])

    const [multipleChoices, setMultipleChoices] = useState(props.navigation.getParam('multipleChoices'));

    const [essays, setEssays] = useState(props.navigation.getParam('essays'));

    const [isQuestionCollapsed, setQuestionCollapsed] = useState(false);
    const [showFinishModal, setFinishModalVisible] = useState(false);

    const [selectedQuestion, setSelectedQuestion] = useState(props.navigation.getParam('selectedQuestion'));

    const calculateAnsweredQuestions = () => {
        let answered = 0;

        multipleChoices.forEach((multipleChoice) => {
            if (multipleChoice.answer) answered++;
        });

        essays.forEach((essay) => {
            if (essay.answer) answered++;
        });

        return answered;
    };

    const pad = (n) => {
        let width = 2;
        let z = '0';

        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    const updateAnswer = async (examDetailsId, answer, cb) => {
        console.log('save answer with API than update UI if successful')

        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/exams/answer/save',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    student_id: props.navigation.getParam('studentId'),
                    exam_details_id: examDetailsId,
                    jawaban: answer
                }),
            ),
        ).then(res => {
            console.log(res)

            cb();
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View style={{flex: 1}}>
            <Modal visible={showFinishModal} transparent={true}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#00000040',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 24,
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            borderRadius: 20,
                            alignItems: 'center',
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingBottom: 16,
                            paddingTop: 30
                        }}>
                        <Image
                            source={require('../../assets/images/ic-okay.png')}
                            // style={{width: 140, resizeMode: 'contain'}}
                            width={140}
                        />

                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily:
                                    Platform.OS === 'android'
                                        ? 'Avenir-LT-Std-95-Black'
                                        : 'Avenir',
                                fontWeight: Platform.OS === 'android' ? undefined : '700',
                                color: '#333333',
                                fontSize: 20,
                                marginTop: 20
                            }}>
                            Terimakasih
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily:
                                    Platform.OS === 'android'
                                        ? 'Avenir-LT-Std-55-Roman'
                                        : 'Avenir',
                                marginTop: 4,
                                color: '#666666',
                            }}>
                            Kamu telah menyelesaikan Ujian Online
                        </Text>

                        <TouchableOpacity style={{width: '100%'}} onPress={() => {
                            setFinishModalVisible(false)
                            props.navigation.goBack(null)
                        }}>
                            <View
                                style={{
                                    backgroundColor: '#3066D2',
                                    width: '100%',
                                    marginTop: 24,
                                    borderRadius: 8,
                                    paddingTop: 14,
                                    paddingBottom: 14,
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontFamily:
                                            Platform.OS === 'android'
                                                ? 'Avenir-LT-Std-95-Black'
                                                : 'Avenir',
                                        fontWeight: Platform.OS === 'android' ? undefined : '700',
                                        color: 'white',
                                    }}>
                                    Oke
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#e3e3e380',
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Avenir',
                            fontWeight: '700',
                            flex: 1,
                        }}>
                        Geografi
                    </Text>

                    <Image
                        source={require('../../assets/images/ic-time.png')}
                        style={{width: 18, resizeMode: 'contain'}}
                    />

                    <Text
                        style={{
                            color: '#666666',
                            fontFamily:
                                Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                            fontSize: 12,
                            marginLeft: 6,
                        }}>
                        Sisa Waktu :
                    </Text>

                    <Text
                        style={{
                            color: '#3066D2',
                            fontFamily:
                                Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            marginLeft: 8,
                        }}>
                        {pad(Math.floor(duration / 3600))}:{pad(Math.floor((duration % 3600) / 60))}:{pad(duration - Math.floor(duration / 60) * 60)}
                    </Text>
                </View>

                {(selectedQuestion.type === 'MULTIPLE_CHOICES' ||
                    selectedQuestion.type === 'ESSAY') && (
                    <View
                        style={{
                            backgroundColor: '#e3e3e380',
                            marginTop: 2,
                            flex: 1,
                        }}>
                        <TouchableWithoutFeedback
                            onPress={() => setQuestionCollapsed(!isQuestionCollapsed)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 16,
                                    paddingVertical: 12,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: 'Avenir',
                                        fontWeight: '700',
                                        flex: 1,
                                    }}>
                                    Indikator Pengerjaan Soal ({calculateAnsweredQuestions()}/
                                    {multipleChoices.length + essays.length})
                                </Text>

                                <Ionicons
                                    name={
                                        isQuestionCollapsed
                                            ? 'chevron-down-outline'
                                            : 'chevron-up-outline'
                                    }
                                    color={'#25282b'}
                                    size={20}
                                />
                            </View>
                        </TouchableWithoutFeedback>

                        {!isQuestionCollapsed && (
                            <>
                                <View
                                    style={{
                                        backgroundColor: '#dddddd',
                                        height: 1,
                                        marginHorizontal: 16,
                                    }}
                                />

                                <View
                                    style={{
                                        marginTop: 5,
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        justifyContent: 'center',
                                        flex: 0.3,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        paddingBottom: 16,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/wave.png')}
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            zIndex: -1,
                                            height: '100%',
                                            resizeMode: 'stretch',
                                        }}
                                    />

                                    <ScrollView>
                                        {multipleChoices.length > 0 && (
                                            <>
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            Platform.OS === 'android'
                                                                ? 'Avenir-LT-Std-55-Roman'
                                                                : 'Avenir',
                                                        color: 'black',
                                                        marginTop: 16,
                                                        marginBottom: 8,
                                                    }}>
                                                    Pilihan Ganda
                                                </Text>

                                                <FlatList
                                                    data={multipleChoices}
                                                    numColumns={8}
                                                    renderItem={(item) => {
                                                        return (
                                                            <TouchableWithoutFeedback
                                                                onPress={() => {
                                                                    setSelectedQuestion({
                                                                        type: 'MULTIPLE_CHOICES',
                                                                        idx: item.index,
                                                                    });
                                                                }}>
                                                                <View
                                                                    style={{
                                                                        flex: 0.125,
                                                                        aspectRatio: 1,
                                                                        padding: 4,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                    }}>
                                                                    <View
                                                                        style={{
                                                                            backgroundColor: item.item.answer
                                                                                ? '#3066D2'
                                                                                : '#C4C4C4',
                                                                            height: '100%',
                                                                            width: '100%',
                                                                            borderRadius: 1000,
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                        }}>
                                                                        <Text
                                                                            style={{
                                                                                color: item.item.answer
                                                                                    ? 'white'
                                                                                    : 'black',
                                                                                fontFamily:
                                                                                    Platform.OS === 'android'
                                                                                        ? 'Avenir-LT-Std-95-Black'
                                                                                        : 'Avenir',
                                                                                fontWeight:
                                                                                    Platform.OS === 'android'
                                                                                        ? undefined
                                                                                        : '700',
                                                                            }}>
                                                                            {item.index + 1}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        );
                                                    }}
                                                />
                                            </>
                                        )}

                                        {essays.length > 0 && (
                                            <>
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            Platform.OS === 'android'
                                                                ? 'Avenir-LT-Std-55-Roman'
                                                                : 'Avenir',
                                                        color: 'black',
                                                        marginTop: 16,
                                                        marginBottom: 8,
                                                    }}>
                                                    Essay
                                                </Text>

                                                <FlatList
                                                    data={essays}
                                                    numColumns={8}
                                                    renderItem={(item) => {
                                                        console.log(item);

                                                        return (
                                                            <TouchableWithoutFeedback
                                                                onPress={() => {
                                                                    setSelectedQuestion({
                                                                        type: 'ESSAY',
                                                                        idx: item.index,
                                                                    });
                                                                }}>
                                                                <View
                                                                    style={{
                                                                        flex: 0.125,
                                                                        aspectRatio: 1,
                                                                        padding: 4,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                    }}>
                                                                    <View
                                                                        style={{
                                                                            backgroundColor: item.item.answer
                                                                                ? '#3066D2'
                                                                                : '#C4C4C4',
                                                                            height: '100%',
                                                                            width: '100%',
                                                                            borderRadius: 1000,
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                        }}>
                                                                        <Text
                                                                            style={{
                                                                                color: item.item.answer
                                                                                    ? 'white'
                                                                                    : 'black',
                                                                                fontFamily:
                                                                                    Platform.OS === 'android'
                                                                                        ? 'Avenir-LT-Std-95-Black'
                                                                                        : 'Avenir',
                                                                                fontWeight:
                                                                                    Platform.OS === 'android'
                                                                                        ? undefined
                                                                                        : '700',
                                                                            }}>
                                                                            {item.index + 1}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        );
                                                    }}
                                                />
                                            </>
                                        )}
                                    </ScrollView>
                                </View>
                            </>
                        )}

                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                paddingTop: 24,
                                paddingHorizontal: 16,
                            }}>
                            <ScrollView contentContainerStyle={{padding: 1, paddingBottom: 30}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text
                                        style={{
                                            width: 30,
                                            color: '#333333',
                                            fontFamily:
                                                Platform.OS === 'android'
                                                    ? 'Avenir-LT-Std-65-Medium'
                                                    : 'Avenir',
                                            fontWeight: '500',
                                        }}>
                                        {selectedQuestion.idx + 1}.{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#333333',
                                            fontFamily:
                                                Platform.OS === 'android'
                                                    ? 'Avenir-LT-Std-65-Medium'
                                                    : 'Avenir',
                                            fontWeight: '500',
                                            flex: 1,
                                        }}>
                                        {selectedQuestion.type === 'MULTIPLE_CHOICES'
                                            ? multipleChoices[selectedQuestion.idx].question
                                            : essays[selectedQuestion.idx].question}
                                    </Text>
                                </View>

                                {(selectedQuestion.type === 'MULTIPLE_CHOICES' && multipleChoices[selectedQuestion.idx].image_path) ||
                                (selectedQuestion.type === 'ESSAY' && essays[selectedQuestion.idx].image_path) ?
                                    <Image
                                        width={Dimensions.get('window').width - 32}
                                        source={{
                                            uri: selectedQuestion.type === 'MULTIPLE_CHOICES'
                                                ? multipleChoices[selectedQuestion.idx].image_path
                                                : essays[selectedQuestion.idx].image_path
                                        }}/> : null
                                }

                                {selectedQuestion.type === 'MULTIPLE_CHOICES' ? (
                                    <>
                                        {multipleChoices[selectedQuestion.idx].choices[0] &&
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                updateAnswer(multipleChoices[selectedQuestion.idx].id, 'A', () => {
                                                    const multipleChoicesTemp = [...multipleChoices];

                                                    multipleChoicesTemp[selectedQuestion.idx].answer = 'A';

                                                    setMultipleChoices(multipleChoicesTemp);
                                                })
                                            }}>
                                            <View
                                                style={{
                                                    shadowOffset: {width: 0, height: 0},
                                                    elevation: 2,
                                                    shadowOpacity: 0.15,
                                                    shadowRadius: 5,
                                                    marginLeft: 30,
                                                    marginTop: 16,
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 12,
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'A'
                                                            ? '#f6f7fc'
                                                            : 'white',
                                                    borderColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'A'
                                                            ? '#3E6EDE'
                                                            : 'white',
                                                }}>
                                                <View
                                                    style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-95-Black'
                                                                    : 'Avenir',
                                                            fontWeight:
                                                                Platform.OS === 'android' ? undefined : '700',
                                                            color: '#646464',
                                                        }}>
                                                        A.
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-55-Roman'
                                                                    : 'Avenir',
                                                            marginLeft: 8,
                                                            flex: 1,
                                                        }}>
                                                        {multipleChoices[selectedQuestion.idx].choices[0]}
                                                    </Text>

                                                    <View
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 30,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: '#3066D2',
                                                            opacity:
                                                                multipleChoices[selectedQuestion.idx].answer ===
                                                                'A'
                                                                    ? 1
                                                                    : 0,
                                                        }}>
                                                        <MaterialCommunityIcons
                                                            name={'check'}
                                                            color={'white'}
                                                            size={13}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        }

                                        {multipleChoices[selectedQuestion.idx].choices[1] &&
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                updateAnswer(multipleChoices[selectedQuestion.idx].id, 'B', () => {
                                                    const multipleChoicesTemp = [...multipleChoices];

                                                    multipleChoicesTemp[selectedQuestion.idx].answer = 'B';

                                                    setMultipleChoices(multipleChoicesTemp);
                                                })
                                            }}>
                                            <View
                                                style={{
                                                    shadowOffset: {width: 0, height: 0},
                                                    elevation: 2,
                                                    shadowOpacity: 0.15,
                                                    shadowRadius: 5,
                                                    marginLeft: 30,
                                                    marginTop: 16,
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 12,
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'B'
                                                            ? '#f6f7fc'
                                                            : 'white',
                                                    borderColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'B'
                                                            ? '#3E6EDE'
                                                            : 'white',
                                                }}>
                                                <View
                                                    style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-95-Black'
                                                                    : 'Avenir',
                                                            fontWeight:
                                                                Platform.OS === 'android' ? undefined : '700',
                                                            color: '#646464',
                                                        }}>
                                                        B.
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-55-Roman'
                                                                    : 'Avenir',
                                                            marginLeft: 8,
                                                            flex: 1,
                                                        }}>
                                                        {multipleChoices[selectedQuestion.idx].choices[1]}
                                                    </Text>

                                                    <View
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 30,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: '#3066D2',
                                                            opacity:
                                                                multipleChoices[selectedQuestion.idx].answer ===
                                                                'B'
                                                                    ? 1
                                                                    : 0,
                                                        }}>
                                                        <MaterialCommunityIcons
                                                            name={'check'}
                                                            color={'white'}
                                                            size={13}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        }

                                        {multipleChoices[selectedQuestion.idx].choices[2] &&
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                updateAnswer(multipleChoices[selectedQuestion.idx].id, 'C', () => {
                                                    const multipleChoicesTemp = [...multipleChoices];

                                                    multipleChoicesTemp[selectedQuestion.idx].answer = 'C';

                                                    setMultipleChoices(multipleChoicesTemp);
                                                })
                                            }}>
                                            <View
                                                style={{
                                                    shadowOffset: {width: 0, height: 0},
                                                    elevation: 2,
                                                    shadowOpacity: 0.15,
                                                    shadowRadius: 5,
                                                    marginLeft: 30,
                                                    marginTop: 16,
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 12,
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'C'
                                                            ? '#f6f7fc'
                                                            : 'white',
                                                    borderColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'C'
                                                            ? '#3E6EDE'
                                                            : 'white',
                                                }}>
                                                <View
                                                    style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-95-Black'
                                                                    : 'Avenir',
                                                            fontWeight:
                                                                Platform.OS === 'android' ? undefined : '700',
                                                            color: '#646464',
                                                        }}>
                                                        C.
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-55-Roman'
                                                                    : 'Avenir',
                                                            marginLeft: 8,
                                                            flex: 1,
                                                        }}>
                                                        {multipleChoices[selectedQuestion.idx].choices[2]}
                                                    </Text>

                                                    <View
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 30,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: '#3066D2',
                                                            opacity:
                                                                multipleChoices[selectedQuestion.idx].answer ===
                                                                'C'
                                                                    ? 1
                                                                    : 0,
                                                        }}>
                                                        <MaterialCommunityIcons
                                                            name={'check'}
                                                            color={'white'}
                                                            size={13}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        }

                                        {multipleChoices[selectedQuestion.idx].choices[3] &&
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                updateAnswer(multipleChoices[selectedQuestion.idx].id, 'D', () => {
                                                    const multipleChoicesTemp = [...multipleChoices];

                                                    multipleChoicesTemp[selectedQuestion.idx].answer = 'D';

                                                    setMultipleChoices(multipleChoicesTemp);
                                                })
                                            }}>
                                            <View
                                                style={{
                                                    shadowOffset: {width: 0, height: 0},
                                                    elevation: 2,
                                                    shadowOpacity: 0.15,
                                                    shadowRadius: 5,
                                                    marginLeft: 30,
                                                    marginTop: 16,
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 12,
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'D'
                                                            ? '#f6f7fc'
                                                            : 'white',
                                                    borderColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'D'
                                                            ? '#3E6EDE'
                                                            : 'white',
                                                }}>
                                                <View
                                                    style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-95-Black'
                                                                    : 'Avenir',
                                                            fontWeight:
                                                                Platform.OS === 'android' ? undefined : '700',
                                                            color: '#646464',
                                                        }}>
                                                        D.
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-55-Roman'
                                                                    : 'Avenir',
                                                            marginLeft: 8,
                                                            flex: 1,
                                                        }}>
                                                        {multipleChoices[selectedQuestion.idx].choices[3]}
                                                    </Text>

                                                    <View
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 30,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: '#3066D2',
                                                            opacity:
                                                                multipleChoices[selectedQuestion.idx].answer ===
                                                                'D'
                                                                    ? 1
                                                                    : 0,
                                                        }}>
                                                        <MaterialCommunityIcons
                                                            name={'check'}
                                                            color={'white'}
                                                            size={13}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        }

                                        {multipleChoices[selectedQuestion.idx].choices[4] &&
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                updateAnswer(multipleChoices[selectedQuestion.idx].id, 'E', () => {
                                                    const multipleChoicesTemp = [...multipleChoices];

                                                    multipleChoicesTemp[selectedQuestion.idx].answer = 'E';

                                                    setMultipleChoices(multipleChoicesTemp);
                                                })
                                            }}>
                                            <View
                                                style={{
                                                    shadowOffset: {width: 0, height: 0},
                                                    elevation: 2,
                                                    shadowOpacity: 0.15,
                                                    shadowRadius: 5,
                                                    marginLeft: 30,
                                                    marginTop: 16,
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 12,
                                                    borderRadius: 8,
                                                    marginBottom: 24,
                                                    borderWidth: 1,
                                                    backgroundColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'E'
                                                            ? '#f6f7fc'
                                                            : 'white',
                                                    borderColor:
                                                        multipleChoices[selectedQuestion.idx].answer === 'E'
                                                            ? '#3E6EDE'
                                                            : 'white',
                                                }}>
                                                <View
                                                    style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-95-Black'
                                                                    : 'Avenir',
                                                            fontWeight:
                                                                Platform.OS === 'android' ? undefined : '700',
                                                            color: '#646464',
                                                        }}>
                                                        E.
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                Platform.OS === 'android'
                                                                    ? 'Avenir-LT-Std-55-Roman'
                                                                    : 'Avenir',
                                                            marginLeft: 8,
                                                            flex: 1,
                                                        }}>
                                                        {multipleChoices[selectedQuestion.idx].choices[4]}
                                                    </Text>

                                                    <View
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 30,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: '#3066D2',
                                                            opacity:
                                                                multipleChoices[selectedQuestion.idx].answer ===
                                                                'E'
                                                                    ? 1
                                                                    : 0,
                                                        }}>
                                                        <MaterialCommunityIcons
                                                            name={'check'}
                                                            color={'white'}
                                                            size={13}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        }
                                    </>
                                ) : (
                                    <TextInput
                                        value={
                                            essays[selectedQuestion.idx].answer
                                                ? essays[selectedQuestion.idx].answer
                                                : ''
                                        }
                                        onChangeText={(text) => {
                                            const essaysTemp = [...essays];

                                            essaysTemp[selectedQuestion.idx].answer = text;

                                            setEssays(essaysTemp);

                                            updateAnswer(essays[selectedQuestion.idx].id, text, () => {

                                            })
                                        }}
                                        multiline={true}
                                        maxLines={10}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#BCBCBC',
                                            borderRadius: 4,
                                            height: 150,
                                            fontFamily:
                                                Platform.OS === 'android'
                                                    ? 'Avenir-LT-Std-65-Medium'
                                                    : 'Avenir',
                                            fontWeight: '500',
                                            color: '#646464',
                                            textAlignVertical: 'top',
                                            padding: 15,
                                            marginBottom: 40,
                                            marginTop: 16,
                                        }}
                                    />
                                )}
                            </ScrollView>

                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    disabled={
                                        (multipleChoices.length !== 0 &&
                                            selectedQuestion.type === 'MULTIPLE_CHOICES' &&
                                            selectedQuestion.idx === 0) ||
                                        (multipleChoices.length === 0 &&
                                            essays.length !== 0 &&
                                            selectedQuestion.type === 'ESSAY' &&
                                            selectedQuestion.idx === 0)
                                    }
                                    onPress={() => {
                                        if (
                                            selectedQuestion.type === 'MULTIPLE_CHOICES' ||
                                            selectedQuestion.type === 'ESSAY'
                                        ) {
                                            const selectedQuestionTemp = {...selectedQuestion};

                                            if (selectedQuestion.type === 'ESSAY') {
                                                if (selectedQuestionTemp.idx === 0) {
                                                    if (multipleChoices.length !== 0) {
                                                        selectedQuestionTemp.type = 'MULTIPLE_CHOICES';
                                                        selectedQuestionTemp.idx =
                                                            multipleChoices.length - 1;
                                                    }
                                                } else {
                                                    selectedQuestionTemp.idx--;
                                                }
                                            } else {
                                                selectedQuestionTemp.idx--;
                                            }

                                            setSelectedQuestion(selectedQuestionTemp);
                                        }
                                    }}>
                                    <View
                                        style={{
                                            opacity:
                                                (multipleChoices.length !== 0 &&
                                                    selectedQuestion.type === 'MULTIPLE_CHOICES' &&
                                                    selectedQuestion.idx === 0) ||
                                                (multipleChoices.length === 0 &&
                                                    essays.length !== 0 &&
                                                    selectedQuestion.type === 'ESSAY' &&
                                                    selectedQuestion.idx === 0)
                                                    ? 0.35
                                                    : 1,
                                            borderWidth: 1,
                                            borderColor: '#3066D2',
                                            width: 120,
                                            height: 45,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 8,
                                        }}>
                                        <Text
                                            style={{
                                                color: '#3066D2',
                                                fontFamily:
                                                    Platform.OS === 'android'
                                                        ? 'Avenir-LT-Std-95-Black'
                                                        : 'Avenir',
                                                fontWeight:
                                                    Platform.OS === 'android' ? undefined : '700',
                                            }}>
                                            Kembali
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{flex: 1}}/>

                                <View
                                    style={{marginBottom: Platform.OS === 'ios' ? 40 : 0}}
                                >
                                    {calculateAnsweredQuestions() ===
                                    multipleChoices.length + essays.length ||
                                    (essays.length === 0 &&
                                        selectedQuestion.type === 'MULTIPLE_CHOICES' &&
                                        selectedQuestion.idx === multipleChoices.length - 1) ||
                                    (essays.length !== 0 &&
                                        selectedQuestion.type === 'ESSAY' &&
                                        selectedQuestion.idx === essays.length - 1) ? (
                                        <TouchableOpacity
                                            onPress={() => props.navigation.goBack(null)}
                                            disabled={
                                                calculateAnsweredQuestions() !==
                                                multipleChoices.length + essays.length
                                            }>
                                            <View
                                                style={{
                                                    backgroundColor: '#3066D2',
                                                    width: 120,
                                                    height: 45,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 8,
                                                    opacity:
                                                        calculateAnsweredQuestions() ===
                                                        multipleChoices.length + essays.length
                                                            ? 1
                                                            : 0.35,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontFamily:
                                                            Platform.OS === 'android'
                                                                ? 'Avenir-LT-Std-95-Black'
                                                                : 'Avenir',
                                                        fontWeight:
                                                            Platform.OS === 'android' ? undefined : '700',
                                                    }}>
                                                    Submit Test
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (
                                                    selectedQuestion.type === 'MULTIPLE_CHOICES' ||
                                                    selectedQuestion.type === 'ESSAY'
                                                ) {
                                                    const selectedQuestionTemp = {...selectedQuestion};

                                                    if (selectedQuestion.type === 'MULTIPLE_CHOICES') {
                                                        if (
                                                            selectedQuestionTemp.idx ===
                                                            multipleChoices.length - 1
                                                        ) {
                                                            if (essays.length !== 0) {
                                                                selectedQuestionTemp.type = 'ESSAY';
                                                                selectedQuestionTemp.idx = 0;
                                                            }
                                                        } else {
                                                            selectedQuestionTemp.idx++;
                                                        }
                                                    } else {
                                                        selectedQuestionTemp.idx++;
                                                    }

                                                    setSelectedQuestion(selectedQuestionTemp);
                                                }
                                            }}>
                                            <View
                                                style={{
                                                    backgroundColor: '#3066D2',
                                                    width: 120,
                                                    height: 45,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 8,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontFamily:
                                                            Platform.OS === 'android'
                                                                ? 'Avenir-LT-Std-95-Black'
                                                                : 'Avenir',
                                                        fontWeight:
                                                            Platform.OS === 'android' ? undefined : '700',
                                                    }}>
                                                    Selanjutnya
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}
