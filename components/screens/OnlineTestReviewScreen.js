import React, {useState, useEffect} from "react";
import {View, Text, Platform, TouchableWithoutFeedback, ScrollView, Image} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import HttpRequest from "../../util/HttpRequest";

export default function OnlineTestReviewScreen(props) {
    const [isMultipleChoicesExpanded, setMultipleChoicesExpanded] = useState(true);
    const [isEssayExpanded, setEssayExpanded] = useState(true);
    const [isScoreExpanded, setScoreExpanded] = useState(true);
    const [numberOfRows, setNumberOfRows] = useState([])
    // const numberOfRows = new Array(Math.ceil(array.length / 30)).fill(0)
    const numberOfColumn = new Array(3).fill(0);
    const [studentInfo, setStudentInfo] = useState({});
    const [examInfo, setExamInfo] = useState({});

    useEffect(() => {
        getExamResult()
    }, [])

    const getExamResult = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/exams/result',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                    exam_id: props.navigation.getParam('examId'),
                    student_id: props.navigation.getParam('studentId')
                }),
            ),
        ).then(res => {
            setStudentInfo(res.data[0])

            if (res.data[1].pilihan_ganda.jumlah_soal !== 0) {
                setNumberOfRows(new Array(Math.ceil(res.data[1].pilihan_ganda.jumlah_soal / 30)).fill(0))
            }


            if (res.data[1].isian.jumlah_soal !== 0) {
                res.data[1].isian.nilai = 0;

                res.data[1].isian.detail.forEach(essay => {
                    res.data[1].isian.nilai += essay.nilai;
                })
            }
            console.log('res.data[1]', res.data[1])
            setExamInfo(res.data[1])

        }).catch(err => {
            console.log('err', err)
        })
    }

    const  round = (value) => {
        var multiplier = Math.pow(10, 1 );
        return Math.round(value * multiplier) / multiplier;
    }

    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: Platform.OS === 'android' ? 16 : 60,
                    paddingBottom: 8,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.15,
                    elevation: 3,
                    shadowRadius: 5,
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
                        Review Ujian Online
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
                <View style={{backgroundColor: '#fefefe', padding: 16}}>
                    <View style={{flexDirection: 'row', marginBottom: 11, alignItems: 'center'}}>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 12,
                            width: 73
                        }}>
                            Nama Siswa
                        </Text>

                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 12,
                        }}>
                            :
                        </Text>

                        <Text style={{
                            marginLeft: 15,
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',
                            fontWeight: '600',
                            color: '#666666'
                        }}>
                            {studentInfo.student_name ? studentInfo.student_name : '-'}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 12,
                            width: 73
                        }}>
                            Kelas
                        </Text>

                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 12,
                        }}>
                            :
                        </Text>

                        <Text style={{
                            marginLeft: 15,
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',
                            fontWeight: '600',
                            color: '#666666'
                        }}>
                            {studentInfo.class_name ? studentInfo.class_name : '-'}
                        </Text>
                    </View>
                </View>

                {examInfo.pilihan_ganda?.detail?.length > 0 &&
                <TouchableWithoutFeedback onPress={() => setMultipleChoicesExpanded(!isMultipleChoicesExpanded)}>
                    <View style={{
                        backgroundColor: '#e3e3e3',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12
                    }}>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 12,
                            flex: 1
                        }}>Pilihan Ganda</Text>

                        <Fontisto name={isMultipleChoicesExpanded ? 'angle-up' : 'angle-down'} color={'#25282B'}/>
                    </View>
                </TouchableWithoutFeedback>
                }

                {isMultipleChoicesExpanded &&
                <View style={{backgroundColor: 'white', padding: 16}}>
                    {
                        numberOfRows.map((value, idx) => {
                            return (
                                <>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            numberOfColumn.map((value2, idx2) => {
                                                return (
                                                    <View style={{flex: 1}}>
                                                        {
                                                            examInfo.pilihan_ganda?.detail?.map((value3, idx3) => {
                                                                if (idx3 >= idx2 * 10 + idx * 30 && idx3 <= (idx2 * 10 + idx * 30) + 9) {
                                                                    return (
                                                                        <View style={{
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center',
                                                                            marginBottom: 8
                                                                        }}>
                                                                            <Text style={{
                                                                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',
                                                                                fontWeight: '600',
                                                                                color: '#333333',
                                                                                fontSize: 16
                                                                            }}>{idx3 + 1}.</Text>

                                                                            <Text style={{
                                                                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                                                                fontWeight: Platform.OS === 'android' ? undefined : '700',
                                                                                color: '#333333',
                                                                                fontSize: 16,
                                                                                width: 30,
                                                                                textAlign: 'center',
                                                                            }}>{value3.jawaban_student}</Text>

                                                                            {value3.keterangan === 'benar' ?
                                                                                <View style={{
                                                                                    backgroundColor: '#27Ae60',
                                                                                    width: 14,
                                                                                    height: 14,
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    borderRadius: 8
                                                                                }}>
                                                                                    <MaterialCommunityIcons
                                                                                        name={'check'}
                                                                                        color={'white'}
                                                                                        size={10}/>
                                                                                </View> :
                                                                                <View style={{
                                                                                    backgroundColor: '#ff4b55',
                                                                                    width: 14,
                                                                                    height: 14,
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    borderRadius: 8
                                                                                }}>
                                                                                    <Ionicons name={'md-close'}
                                                                                              color={'white'}
                                                                                              size={10}/>
                                                                                </View>
                                                                            }
                                                                        </View>
                                                                    )
                                                                }
                                                            })
                                                        }


                                                        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                                                        {/*    <Text style={{*/}
                                                        {/*        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',*/}
                                                        {/*        fontWeight: '600',*/}
                                                        {/*        color: '#333333',*/}
                                                        {/*        fontSize: 16*/}
                                                        {/*    }}>{idx2 + " " + idx}.</Text>*/}

                                                        {/*    <Text style={{*/}
                                                        {/*        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',*/}
                                                        {/*        fontWeight: Platform.OS === 'android' ? undefined : '700',*/}
                                                        {/*        color: '#333333',*/}
                                                        {/*        fontSize: 16,*/}
                                                        {/*        paddingHorizontal: 10*/}
                                                        {/*    }}>A</Text>*/}

                                                        {/*<View style={{*/}
                                                        {/*    backgroundColor: '#ff4b55',*/}
                                                        {/*    width: 14,*/}
                                                        {/*    height: 14,*/}
                                                        {/*    alignItems: 'center',*/}
                                                        {/*    justifyContent: 'center',*/}
                                                        {/*    borderRadius: 8*/}
                                                        {/*}}>*/}
                                                        {/*    <Ionicons name={'md-close'} color={'white'} size={10}/>*/}
                                                        {/*</View>*/}
                                                        {/*</View>*/}
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>

                                    {idx !== numberOfRows.length - 1 &&
                                    <View style={{height: 1, backgroundColor: '#DDDDDD', marginVertical: 16}}/>}
                                </>
                            )
                        })
                    }
                </View>
                }

                {examInfo.isian?.detail?.length > 0 &&
                <TouchableWithoutFeedback onPress={() => setEssayExpanded(!isEssayExpanded)}>
                    <View style={{
                        backgroundColor: '#e3e3e3',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12
                    }}>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 12,
                            flex: 1
                        }}>Essay</Text>

                        <Fontisto name={isEssayExpanded ? 'angle-up' : 'angle-down'} color={'#25282B'}/>
                    </View>
                </TouchableWithoutFeedback>
                }

                {isEssayExpanded &&
                <View style={{backgroundColor: 'white', padding: 16, paddingBottom: 0}}>
                    {
                        examInfo.isian?.detail?.map((essay, idx) => {
                            return (
                                <>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{
                                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                                        }}>
                                            {idx + 1}.
                                        </Text>

                                        <Text style={{
                                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                                            marginLeft: 5
                                        }}>
                                            {essay.pertanyaan}
                                        </Text>
                                    </View>

                                    <Text style={{
                                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',
                                        fontWeight: '600',
                                        color: '#646464',
                                        borderWidth: 1,
                                        borderColor: '#BCBCBC',
                                        borderRadius: 4,
                                        padding: 8,
                                        marginVertical: 16,
                                        minHeight: 100,
                                        lineHeight: 19.12
                                    }}>
                                        {essay.jawaban_student}
                                    </Text>
                                </>
                            )
                        })
                    }


                    {/*<>*/}
                    {/*    <View style={{flexDirection: 'row'}}>*/}
                    {/*        <Text style={{*/}
                    {/*            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',*/}
                    {/*            fontWeight: Platform.OS === 'android' ? undefined : '700',*/}
                    {/*        }}>*/}
                    {/*            2.*/}
                    {/*        </Text>*/}

                    {/*        <Text style={{*/}
                    {/*            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',*/}
                    {/*            fontWeight: Platform.OS === 'android' ? undefined : '700',*/}
                    {/*            marginLeft: 5*/}
                    {/*        }}>*/}
                    {/*            Duluan Telur atau ayam? jelaskan dengan detail!*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}

                    {/*    <Text style={{*/}
                    {/*        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',*/}
                    {/*        fontWeight: '600',*/}
                    {/*        color: '#646464',*/}
                    {/*        borderWidth: 1,*/}
                    {/*        borderColor: '#BCBCBC',*/}
                    {/*        borderRadius: 4,*/}
                    {/*        padding: 8,*/}
                    {/*        marginVertical: 16,*/}
                    {/*        minHeight: 100,*/}
                    {/*        lineHeight: 19.12*/}
                    {/*    }}>*/}
                    {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus, porttitor feugiat viverra*/}
                    {/*        non, nec pretium nullam quam.*/}
                    {/*    </Text>*/}
                    {/*</>*/}
                </View>
                }

                <TouchableWithoutFeedback onPress={() => setScoreExpanded(!isScoreExpanded)}>
                    <View style={{
                        backgroundColor: '#e3e3e3',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12
                    }}>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 12,
                            flex: 1
                        }}>Nilai</Text>

                        <Fontisto name={isScoreExpanded ? 'angle-up' : 'angle-down'} color={'#25282B'}/>
                    </View>
                </TouchableWithoutFeedback>

                {isScoreExpanded &&
                <View style={{backgroundColor: 'white'}}>
                    <View style={{
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 0.15,
                        elevation: 3,
                        shadowRadius: 5,
                        margin: 16,
                        padding: 16,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}>
                        <Text style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 12,
                        }}>Rincian Nilai</Text>

                        <View style={{height: 1, backgroundColor: '#DDDDDD', marginTop: 12, marginBottom: 14}}/>

                        {
                            examInfo.pilihan_ganda?.detail?.length > 0 &&
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image
                                    source={require('../../assets/images/ic-pilihan-ganda.png')}
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />

                                <Text style={{
                                    flex: 1,
                                    marginLeft: 8,
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',
                                    fontWeight: '600',
                                    color: '#666666',
                                    fontSize: 12
                                }}>Nilai Pilihan Ganda</Text>
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    color: '#909090',
                                    fontSize: 20,
                                }}>{round(examInfo.pilihan_ganda?.nilai)}</Text>
                            </View>
                        }

                        {examInfo.isian?.detail?.length > 0 &&
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                            <Image
                                source={require('../../assets/images/ic-essay.png')}
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />

                            <Text style={{
                                flex: 1,
                                marginLeft: 8,
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-65-Medium' : 'Avenir',
                                fontWeight: '600',
                                color: '#666666',
                                fontSize: 12
                            }}>Nilai Essay</Text>
                            <Text style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight: Platform.OS === 'android' ? undefined : '700',
                                color: '#909090',
                                fontSize: 20,
                            }}>{examInfo.isian?.nilai}</Text>
                        </View>
                        }

                        <View style={{height: 1, backgroundColor: '#DDDDDD', marginTop: 12, marginBottom: 14}}/>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{
                                flex: 1,
                                marginLeft: 8,
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight: Platform.OS === 'android' ? undefined : '700',
                                color: '#666666',
                                fontSize: 12
                            }}>Total Nilai</Text>
                            <Text style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight: Platform.OS === 'android' ? undefined : '700',
                                color: '#3066D2',
                                fontSize: 30,
                            }}>
                                {examInfo.pilihan_ganda?.jumlah_soal > 0 && examInfo.isian?.jumlah_soal > 0 && (examInfo.pilihan_ganda?.nilai || examInfo.pilihan_ganda?.nilai >= 0) && (examInfo.isian?.nilai || examInfo.isian?.nilai >= 0) ? round((examInfo.pilihan_ganda?.nilai + examInfo.isian?.nilai) / 2) : examInfo.pilihan_ganda?.jumlah_soal > 0 && (examInfo.pilihan_ganda?.nilai || examInfo.pilihan_ganda?.nilai >= 0) ? round(examInfo.pilihan_ganda?.nilai) : examInfo.isian?.jumlah_soal > 0 && (examInfo.isian?.nilai || examInfo.isian?.nilai >= 0) ? round(examInfo.isian?.nilai) : '-'}
                            </Text>
                        </View>
                        <Image
                            source={require('../../assets/images/wave.png')}
                            style={{
                                position: 'absolute',
                                bottom: -1,
                                right: -1,
                                borderBottomRightRadius: 10,
                            }}
                        />
                    </View>
                </View>
                }
            </ScrollView>
        </View>
    )
}
