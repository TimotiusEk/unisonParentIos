import React, {useEffect, useState, useRef} from "react";
import AppContainer from "../reusables/AppContainer";
import {TouchableWithoutFeedback, Text, View, ScrollView, ActivityIndicator, Modal} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-community/async-storage";
import HttpRequest from "../../util/HttpRequest";
import RBSheet from "react-native-raw-bottom-sheet";

export default function AttendanceScreen(props) {
    const [myChildren, setMyChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState({});
    const [selectedSubject, setSelectedSubject] = useState({});
    const [isLoadingShown, setLoadingShown] = useState(false);
    const rbSheetRef = useRef(null);
    const [select, setSelect] = useState(null);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getMyChildren()
    }, [])

    const getMyChildren = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        let myChildren = await AsyncStorage.getItem('myChildren');

        if (!myChildren) {
            new Promise(
                await HttpRequest.set("/students/mychildren", 'POST', JSON.stringify({
                    access_token: user.access_token
                }))
            ).then(async (res) => {
                if (res.data.length > 0) {
                    setSelectedChild(res.data[0])
                }

                setMyChildren(res.data)

                await AsyncStorage.setItem('myChildren', JSON.stringify(res.data))
            }).catch(err => {
                console.log(err)
            })
        } else {
            if (JSON.parse(myChildren).length > 0) {
                setSelectedChild(JSON.parse(myChildren)[0])
            }

            setMyChildren(JSON.parse(myChildren))
        }
    }

    const fetchAndOpenSheet = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        setSelect('subject')
        setLoadingShown(true)

        new Promise(await HttpRequest.set('/subjects/class', 'POST', JSON.stringify({
            access_token: user.access_token,
            class_id: selectedChild.class_id
        }))).then(res => {
            setLoadingShown(false)

            setSubjects(res.data)
            rbSheetRef.current.open();
        }).catch(err => {
            setLoadingShown(false)

            console.log('err', err)
        })
    }

    return (
        <AppContainer navigation={props.navigation}>
            <Modal visible={isLoadingShown} transparent={true}>
                <View
                    style={{flex: 1, backgroundColor: '#00000040', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="small" color="#3e67d6"/>
                </View>
            </Modal>

            <RBSheet
                ref={rbSheetRef}
                closeOnDragDown={true}
                height={600}
                openDuration={250}
            >
                <View style={{flex: 1}}>
                    <Text style={{
                        fontFamily: 'Montserrat-SemiBold',
                        marginLeft: 15,
                        marginTop: 8,
                        marginBottom: 15,
                        fontSize: 16
                    }}>
                        {select === 'class' ? 'Class Children' : 'Subject'}
                    </Text>

                    <View style={{width: '100%', height: 1, backgroundColor: '#f3f3f3'}}/>

                    <ScrollView>
                        {
                            select === 'subject' && subjects.map(subject => {
                                return (
                                    <>
                                        <TouchableWithoutFeedback onPress={() => {
                                            setSelectedSubject(subject)

                                            rbSheetRef.current.close();
                                        }}>
                                            <View style={{padding: 15}}>
                                                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 16}}>
                                                    {subject.subject}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <View style={{width: '100%', height: 1, backgroundColor: '#f3f3f3'}}/>
                                    </>
                                )
                            })
                        }

                        {
                            select === 'class' && myChildren.map(child => {
                                return (
                                    <>
                                        <TouchableWithoutFeedback onPress={() => {
                                            setSelectedChild(child)
                                            setSelectedSubject({})
                                            fetchAndOpenSheet()
                                        }}>
                                            <View style={{padding: 15}}>
                                                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 16}}>
                                                    {child.student_name} - {child.class_name}
                                                </Text>

                                                <Text style={{
                                                    fontFamily: 'Montserrat-Regular',
                                                    fontSize: 13,
                                                    marginTop: 10,
                                                    color: 'grey'
                                                }}>
                                                    {child.school_name}
                                                </Text>
                                                <Text style={{
                                                    fontFamily: 'Montserrat-Regular',
                                                    fontSize: 13,
                                                    marginTop: 2,
                                                    color: 'grey'
                                                }}>
                                                    {child.class_name}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <View style={{width: '100%', height: 1, backgroundColor: '#f3f3f3'}}/>
                                    </>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </RBSheet>

            <View style={{backgroundColor: '#3e67d6', borderBottomLeftRadius: 44}}>
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name={'arrow-left'} size={28}
                                            style={{marginLeft: 16, marginTop: 12}}
                                            color={'white'}
                                            onPress={() => props.navigation.goBack(null)}/>

                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'Montserrat-Bold',
                        color: 'white',
                        marginLeft: 9,
                        marginTop: 13
                    }}>
                        Attendance
                    </Text>
                </View>

                <Text style={{
                    fontFamily: 'Montserrat-Bold',
                    color: 'white',
                    marginTop: 20,
                    marginBottom: 2,
                    paddingHorizontal: 36
                }}>
                    {selectedChild.student_name} - {selectedChild.class_name}
                </Text>

                <Text style={{fontFamily: 'Montserrat-Bold', color: 'white', marginBottom: 20, paddingHorizontal: 36}}>
                    {selectedSubject && selectedSubject.subject}
                </Text>
            </View>

            <View style={{marginHorizontal: 24, margin: 8, marginTop: 16, flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={() => {
                    setSelect('class');
                    rbSheetRef.current.open()
                }}>
                    <View style={{flex: 1}}>
                        <Text style={{fontFamily: 'Montserrat-SemiBold', marginStart: 8, marginTop: 8}}>
                            Class
                        </Text>

                        <View style={{
                            backgroundColor: '#3D8BFF',
                            borderRadius: 4,
                            marginStart: 8,
                            marginTop: 4,
                            flexDirection: 'row'
                        }}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={{
                                fontFamily: 'Montserrat-Bold',
                                color: 'white',
                                marginStart: 16,
                                marginTop: 8,
                                marginBottom: 8,
                                flex: 1
                            }}>
                                {selectedChild.student_name} - {selectedChild.class_name}
                            </Text>

                            <Fontisto name={'angle-down'}
                                      style={{color: '#c2ddff', marginEnd: 8, marginTop: 8, marginBottom: 8}}
                                      size={16}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    if (selectedChild) {
                        fetchAndOpenSheet()
                    } else {
                        setSelect('class');
                        rbSheetRef.current.open()
                    }
                }}>
                    <View style={{flex: 1}}>
                        <Text style={{fontFamily: 'Montserrat-SemiBold', marginStart: 8, marginTop: 8}}>
                            Subject
                        </Text>

                        <View style={{
                            backgroundColor: '#3D8BFF',
                            borderRadius: 4,
                            marginStart: 8,
                            marginTop: 4,
                            flexDirection: 'row'
                        }}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={{
                                fontFamily: 'Montserrat-Bold',
                                color: 'white',
                                marginStart: 16,
                                marginTop: 8,
                                marginBottom: 8,
                                flex: 1
                            }}>
                                {selectedSubject && selectedSubject.subject ? selectedSubject.subject : 'Subject'}
                            </Text>

                            <Fontisto name={'angle-down'}
                                      style={{color: '#c2ddff', marginEnd: 8, marginTop: 8, marginBottom: 8}}
                                      size={16}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </AppContainer>
    )
}