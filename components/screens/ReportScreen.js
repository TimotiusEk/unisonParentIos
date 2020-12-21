import React, {useEffect, useState, useRef} from "react";
import AppContainer from "../reusables/AppContainer";
import {
    TouchableWithoutFeedback,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Image,
    Dimensions
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-community/async-storage";
import HttpRequest from "../../util/HttpRequest";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";

export default function ReportScreen(props) {
    const months = [
        'January',
        'February',
        'Marcy',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'Oktober',
        'November',
        'December'
    ]

    const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
    const [activeSlide, setActiveSlide] = useState(0);
    const [myChildren, setMyChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState({});
    const rbSheetRef = useRef(null);
    const [select, setSelect] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        getMyChildren();
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
                console.log('child', JSON.parse(myChildren)[0])

                setSelectedChild(JSON.parse(myChildren)[0])
            }

            setMyChildren(JSON.parse(myChildren))
        }
    }

    return (
        <View style={{flex: 1, paddingBottom: 10}}>
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
                        {select === 'class' ? 'Class Children' : 'Choose Month'}
                    </Text>

                    <View style={{width: '100%', height: 1, backgroundColor: '#f3f3f3'}}/>

                    <ScrollView>
                        {
                            select === 'month' && months.map(month => {
                                return (
                                    <>
                                        <TouchableWithoutFeedback onPress={() => {
                                            setSelectedMonth(month)

                                            rbSheetRef.current.close();
                                        }}>
                                            <View style={{padding: 15}}>
                                                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 16}}>
                                                    {month}
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
                                            rbSheetRef.current.close();
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

            <View style={{
                backgroundColor: '#3e67d6',
                paddingTop: 50,
                paddingBottom: 90,
                borderBottomLeftRadius: 24,
                marginBottom: -60
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                }}>
                    <MaterialCommunityIcons name={'arrow-left'} size={28}
                                            style={{marginLeft: 16}}
                                            color={'white'}
                                            onPress={() => props.navigation.goBack(null)}/>
                    <Text
                        style={{color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 16, marginLeft: 10}}>
                        Report Card
                    </Text>
                </View>

                <Text style={{color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 24, marginStart: 54}}>
                    Report
                </Text>

                <View style={{alignItems: 'flex-start', marginStart: 54, marginTop: 15, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => carouselRef.current.snapToItem(0)}>
                        <View style={{backgroundColor: activeSlide === 0 ? 'white' : 'transparent', borderRadius: 100}}>
                            <Text style={{
                                color: activeSlide === 0 ? '#033AA8' : '#FFFFFF80',
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 10,
                                paddingHorizontal: 16,
                                paddingVertical: 9
                            }}>
                                CURRENT SEMESTER
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => carouselRef.current.snapToItem(1)}>
                        <View style={{backgroundColor: activeSlide === 1 ? 'white' : 'transparent', borderRadius: 100}}>
                            <Text style={{
                                color: activeSlide === 1 ? '#033AA8' : '#FFFFFF80',
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 10,
                                paddingHorizontal: 16,
                                paddingVertical: 9
                            }}>
                                HISTORY
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <Carousel
                data={[{}, {}]}
                renderItem={(item) => {
                    if (item.index === 0) {
                        return (
                            <ScrollView>
                                <View style={{
                                    backgroundColor: 'white',
                                    borderRadius: 12,
                                    marginHorizontal: 15,
                                    padding: 8,
                                }}>
                                    <TouchableWithoutFeedback onPress={() => {
                                        setSelect('class')
                                        rbSheetRef.current.open();
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                        }}>
                                            <Image source={require('../../assets/images/ic_user.png')}
                                                   style={{width: 52, height: 52, marginStart: 16, marginVertical: 8}}/>

                                            <View style={{flex: 1, marginVertical: 8}}>
                                                <Text
                                                    style={{
                                                        marginHorizontal: 8,
                                                        fontFamily: 'Montserrat-Bold',
                                                        fontSize: 16
                                                    }}>
                                                    {selectedChild.student_name}
                                                </Text>

                                                <Text style={{
                                                    marginHorizontal: 8,
                                                    fontFamily: 'Montserrat-Medium',
                                                    fontSize: 12,
                                                    color: '#818181'
                                                }}>
                                                    {selectedChild.student_code}
                                                </Text>
                                            </View>

                                            <View style={{marginVertical: 8, marginEnd: 8}}>
                                                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12}}>
                                                    {selectedChild.class_name}
                                                </Text>

                                                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12}}>
                                                    {selectedChild.year}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback>
                                        <View style={{
                                            opacity: 0,
                                            alignSelf: 'flex-end',
                                            paddingHorizontal: 16,
                                            paddingVertical: 8,
                                            borderRadius: 16,
                                            marginEnd: 16, marginBottom: 8, backgroundColor: '#e3e3e3'
                                        }}>
                                            <Text style={{color: '#3e67d6', fontFamily: 'Avenir', fontWeight: '500'}}>Download
                                                Report</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={{
                                    backgroundColor: 'white',
                                    borderRadius: 12,
                                    marginHorizontal: 15,
                                    padding: 8,
                                    marginTop: 16
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 24
                                    }}>
                                        <View style={{flex: 1, marginStart: 32}}>
                                            <Text style={{
                                                fontFamily: 'Montserrat-Bold',
                                                fontSize: 18,
                                            }}>
                                                Avg Score
                                            </Text>

                                            <Text style={{fontFamily: 'Poppins', fontSize: 12, marginTop: 2}}>
                                                December
                                            </Text>
                                        </View>

                                        <Text style={{
                                            color: '#3e67d6',
                                            marginEnd: 24,
                                            fontSize: 24,
                                            fontFamily: 'Montserrat-Bold',
                                            alignSelf: 'center'
                                        }}>
                                            0
                                        </Text>
                                    </View>

                                    <View style={{marginTop: 12, justifyContent: 'center', flexDirection: 'row'}}>
                                        <View style={{alignItems: 'center', marginHorizontal: 32}}>
                                            <Text style={{
                                                color: '#3e67d6',
                                                fontSize: 24,
                                                fontFamily: 'Montserrat-Bold',
                                            }}>
                                                0
                                            </Text>

                                            <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12}}>
                                                Exam's
                                            </Text>
                                        </View>

                                        <View style={{alignItems: 'center', marginHorizontal: 32}}>
                                            <Text style={{
                                                color: '#3e67d6',
                                                fontSize: 24,
                                                fontFamily: 'Montserrat-Bold',
                                            }}>
                                                0
                                            </Text>

                                            <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12}}>
                                                Assignment
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={{
                                        textAlign: 'center',
                                        marginBottom: 16,
                                        marginTop: 16,
                                        fontSize: 10,
                                        fontFamily: 'Poppins',
                                        paddingHorizontal: 16
                                    }}>
                                        All score are <Text
                                        style={{fontFamily: 'Poppins-Bold', color: '#3e67d6'}}>good</Text>,
                                        please keep maintain the score until the last semester
                                    </Text>
                                </View>

                                <View style={{
                                    backgroundColor: 'white',
                                    borderRadius: 12,
                                    marginHorizontal: 15,
                                    padding: 8,
                                    marginTop: 16
                                }}>
                                    <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12}}>
                                        Tips
                                    </Text>

                                    <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12}}>
                                        Now you can view your children's digital report
                                    </Text>
                                </View>

                                <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 30}}>
                                    <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12, flex: 1}}>
                                        This Month
                                    </Text>

                                    <TouchableWithoutFeedback onPress={() => {
                                        setSelect('month')
                                        rbSheetRef.current.open();
                                    }}>
                                        <Text style={{
                                            backgroundColor: 'white',
                                            fontFamily: 'Montserrat-Regular',
                                            paddingHorizontal: 12,
                                            fontSize: 12,
                                            paddingVertical: 7,
                                            borderRadius: 100
                                        }}>
                                            {selectedMonth}
                                        </Text>
                                    </TouchableWithoutFeedback>
                                </View>

                                <Text style={{fontFamily: 'Montserrat-Bold', textAlign: 'center', marginTop: 25}}>
                                    None Of Your Data{'\n'}at this time
                                </Text>
                            </ScrollView>
                        )
                    } else {
                        return (
                            <View style={{paddingLeft: 30, paddingRight: 15, flex: 1}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>Class
                                            Period</Text>
                                        <Text style={{
                                            fontFamily: 'Montserrat-Regular',
                                            color: 'white'
                                        }}>{selectedChild.year}</Text>
                                    </View>

                                    <Text style={{
                                        backgroundColor: 'white',
                                        fontFamily: 'Montserrat-Regular',
                                        paddingHorizontal: 12,
                                        fontSize: 12,
                                        paddingVertical: 7,
                                        borderRadius: 100,
                                        alignSelf: 'flex-start'
                                    }}>
                                        {selectedChild.class_name}
                                    </Text>
                                </View>

                                <View style={{marginTop: 22, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontFamily: 'Montserrat-Bold', textAlign: 'center'}}>
                                        None Of Your Data{'\n'}at this time
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                }}
                ref={carouselRef}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                useNativeDriver
                onSnapToItem={(idx) => setActiveSlide(idx)}
            />
        </View>
    )
}
