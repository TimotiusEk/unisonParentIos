import React, {useEffect, useState} from "react";
import {ScrollView, Image, View, Dimensions, Text, TouchableWithoutFeedback} from "react-native";
import AppContainer from "../reusables/AppContainer";
import HttpRequest from "../../util/HttpRequest";
import AsyncStorage from "@react-native-community/async-storage";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Dialog from "react-native-dialog";

export default function HomeScreen(props) {
    const [ads, setAds] = useState([]);
    const [quotes, setQuotes] = useState({});
    const [activeSlide, setActiveSlide] = useState(0);
    const [isComingSoonModalShown, setComingSoonModalShown] = useState(false);

    useEffect(() => {
        getAds()

        getQuotes()
    }, [])

    const getAds = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set("/ads", 'POST', JSON.stringify({
                access_token: user.access_token
            }))
        ).then(res => {
            setAds(res.data)
        }).catch(err => console.log('err', err))
    }

    const getQuotes = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set("/quotes", 'POST', JSON.stringify({
                access_token: user.access_token
            }))
        ).then(res => {
            console.log(res.data[0])
            setQuotes(res.data[0])
        }).catch(err => console.log('err', err))
    }

    return (
        <AppContainer navigation={props.navigation}>
            <ScrollView style={{paddingTop: 30}}>
                <Dialog.Container visible={isComingSoonModalShown}>
                    <Dialog.Description style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
                        Partner feature is under development, please come back later
                    </Dialog.Description>

                    <Dialog.Button label="OK" style={{fontFamily: 'Poppins-Regular'}}
                                   onPress={() => setComingSoonModalShown(false)}/>
                </Dialog.Container>

                <Carousel
                    data={ads}
                    renderItem={(item) => {
                        return (
                            <View style={{paddingHorizontal: 15}}>
                                <Image source={{uri: item.item.image_path}}
                                       style={{width: '100%', height: 200, resizeMode: 'contain'}}/>
                            </View>
                        )
                    }}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    loop={true}
                    useNativeDriver
                    autoplay={true}
                    autoplayDelay={3000}
                    autoplayInterval={3000}
                    onSnapToItem={(idx) => setActiveSlide(idx)}
                />

                <Pagination
                    dotsLength={ads.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{
                        marginTop: -45
                    }}
                    dotStyle={{
                        width: 13,
                        height: 13,
                        borderRadius: 7.5,
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        marginLeft: -3,
                        marginRight: -3
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />

                <View style={{paddingHorizontal: 15}}>
                    <Text style={{
                        fontFamily: 'Graphik-Regular',
                        fontSize: 16,
                        marginBottom: 20
                    }}>
                        School Activities
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TouchableWithoutFeedback onPress={() => {
                                props.navigation.navigate('LearningActivitiesScreen')
                            }}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{
                                        backgroundColor: '#E9E9E9',
                                        height: 95,
                                        width: 95,
                                        borderRadius: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Image source={require('../../assets/images/ic_activity_learning.png')}
                                               style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                                    </View>

                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'Graphik-Regular',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}>
                                        Learning Activities
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{flex: 1}}>
                            <TouchableWithoutFeedback onPress={() => {
                            }}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{
                                        backgroundColor: '#E9E9E9',
                                        height: 95,
                                        width: 95,
                                        borderRadius: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Image source={require('../../assets/images/ic_absense.png')}
                                               style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                                    </View>

                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'Graphik-Regular',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}>
                                        Attendance
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{flex: 1}}>
                            <TouchableWithoutFeedback onPress={() => {
                            }}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{
                                        backgroundColor: '#E9E9E9',
                                        height: 95,
                                        width: 95,
                                        borderRadius: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Image source={require('../../assets/images/ic_report_card.png')}
                                               style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                                    </View>

                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'Graphik-Regular',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}>
                                        Report Card
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={{backgroundColor: '#3e67d6', flexDirection: 'row', height: 90, paddingStart: 16, marginTop : 30}}>
                        <Image source={require('../../assets/images/ic_quotes.png')} style={{
                            width: 95, height: 101,
                            marginTop: -11
                        }}/>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{
                                marginBottom: 8,
                                fontFamily: 'Poppins-Medium',
                                color: 'white'
                            }}>
                                {quotes.title}
                            </Text>
                            <Text style={{color: 'white', fontFamily: 'Graphik', fontWeight: '300'}}>
                                {quotes.quote}
                            </Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 30}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TouchableWithoutFeedback onPress={() => {
                                props.navigation.navigate('LearningMaterialScreen')
                            }}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{
                                        backgroundColor: '#E9E9E9',
                                        height: 95,
                                        width: 95,
                                        borderRadius: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Image source={require('../../assets/images/ic_materi.png')}
                                               style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                                    </View>

                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'Graphik-Regular',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}>
                                        Learning Materials
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{flex: 1}}>
                            <TouchableWithoutFeedback onPress={() => {
                            }}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{
                                        backgroundColor: '#E9E9E9',
                                        height: 95,
                                        width: 95,
                                        borderRadius: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Image source={require('../../assets/images/ic_payment.png')}
                                               style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                                    </View>

                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'Graphik-Regular',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}>
                                        My Order
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{flex: 1}}>
                            <TouchableWithoutFeedback onPress={() => {
                                setComingSoonModalShown(true)
                            }}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{
                                        backgroundColor: '#E9E9E9',
                                        height: 95,
                                        width: 95,
                                        borderRadius: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Image source={require('../../assets/images/ic_mitra.png')}
                                               style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                                    </View>

                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'Graphik-Regular',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}>
                                        Partner
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </AppContainer>
    )
}