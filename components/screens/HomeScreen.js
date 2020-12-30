import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    Image,
    View,
    Dimensions,
    Text,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import AppContainer from '../reusables/AppContainer';
import HttpRequest from '../../util/HttpRequest';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Dialog from 'react-native-dialog';
import {ImageBackground} from 'react-native';

export default function HomeScreen(props) {
    const [ads, setAds] = useState([]);
    const [quotes, setQuotes] = useState({});
    const [activeSlide, setActiveSlide] = useState(0);
    const [isComingSoonModalShown, setComingSoonModalShown] = useState(false);

    useEffect(() => {
        getAds();

        getQuotes();
    }, []);

    const getAds = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/ads',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                }),
            ),
        )
            .then((res) => {
                setAds(res.data);
            })
            .catch((err) => console.log('err', err));
    };

    const getQuotes = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set(
                '/quotes',
                'POST',
                JSON.stringify({
                    access_token: user.access_token,
                }),
            ),
        )
            .then((res) => {
                console.log(res.data[0]);
                setQuotes(res.data[0]);
            })
            .catch((err) => console.log('err', err));
    };

    return (
        <AppContainer navigation={props.navigation}>
            <ScrollView
                style={{paddingTop: Platform.OS === 'ios' ? 30 : 0}}
                contentContainerStyle={{flexGrow: 1}}>
                <Dialog.Container visible={isComingSoonModalShown}>
                    <Dialog.Description
                        style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
                        Partner feature is under development, please come back later
                    </Dialog.Description>

                    <Dialog.Button
                        label="OK"
                        style={{fontFamily: 'Poppins-Regular'}}
                        onPress={() => setComingSoonModalShown(false)}
                    />
                </Dialog.Container>

                <Carousel
                    data={ads}
                    renderItem={(item) => {
                        return (
                            <View
                                style={{
                                    paddingHorizontal: 15,
                                    marginBottom: Platform.OS === 'ios' ? -120 : 0,
                                }}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        if (item.item.url) {
                                            props.navigation.navigate('WebViewScreen', {
                                                url: item.item.url,
                                            });
                                        }
                                        console.log(item.item.url);
                                    }}>
                                    <Image
                                        source={{uri: item.item.image_path}}
                                        style={{
                                            width: '100%',
                                            height: 200,
                                            resizeMode: 'contain',
                                            borderRadius: 16,
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        );
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

                {/* <Pagination
          dotsLength={ads.length}
          activeDotIndex={activeSlide}

          dotStyle={{
            width: 13,
            height: 13,
            borderRadius: 7.5,
            backgroundColor: 'rgba(0, 0, 0, 1)',
            marginLeft: -3,
            marginRight: -3,
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        /> */}

                <View style={{paddingHorizontal: 15, flex: 1}}>
                    <Text
                        style={{
                            fontFamily: 'Avenir',
                            fontSize: 20,
                            marginBottom: 20,
                            fontWeight: '600',
                        }}>
                        Aktivitas Sekolah
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        {/* <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate('LearningActivitiesScreen');
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: '#E9E9E9',
                      height: 95,
                      width: 95,
                      borderRadius: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/images/ic_activity_learning.png')}
                      style={{width: 75, height: 75, resizeMode: 'contain'}}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Avenir',
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    Aktivitas{'\n'}Belajar
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View> */}

                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    props.navigation.navigate('LearningActivitiesScreen');
                                }}>
                                <View style={{alignItems: 'center'}}>
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            height: 95,
                                            width: 95,
                                            borderRadius: 50,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: '#000',
                                            shadowOffset: {width: 0, height: 0},
                                            elevation: 3,
                                            shadowOpacity: 0.15,
                                            shadowRadius: 5,
                                        }}>
                                        <View
                                            style={{
                                                width: 85,
                                                height: 85,
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: 50,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Image
                                                source={require('../../assets/images/ic_activity_learning.png')}
                                                style={{width: 65, height: 65, resizeMode: 'contain'}}
                                            />
                                        </View>
                                    </View>

                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: 'Avenir',
                                            textAlign: 'center',
                                            marginTop: 10,
                                        }}>
                                        Aktivitas{'\n'}Belajar
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setComingSoonModalShown(true);
                                }}>
                                <View style={{alignItems: 'center'}}>
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            height: 95,
                                            width: 95,
                                            borderRadius: 50,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: '#000',
                                            shadowOffset: {width: 0, height: 0},
                                            elevation: 3,
                                            shadowOpacity: 0.15,
                                            shadowRadius: 5,
                                        }}>
                                        <View
                                            style={{
                                                width: 85,
                                                height: 85,
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: 50,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Image
                                                source={require('../../assets/images/ic_mitra.png')}
                                                style={{width: 65, height: 65, resizeMode: 'contain'}}
                                            />
                                        </View>
                                    </View>

                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: 'Avenir',
                                            textAlign: 'center',
                                            marginTop: 10,
                                        }}>
                                        Mitra
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    props.navigation.navigate('LearningMaterialScreen');
                                }}>
                                <View style={{alignItems: 'center'}}>
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            height: 95,
                                            width: 95,
                                            borderRadius: 50,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: '#000',
                                            shadowOffset: {width: 0, height: 0},
                                            elevation: 3,
                                            shadowOpacity: 0.15,
                                            shadowRadius: 5,
                                        }}>
                                        <View
                                            style={{
                                                width: 85,
                                                height: 85,
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: 50,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Image
                                                source={require('../../assets/images/ic_materi.png')}
                                                style={{width: 65, height: 65, resizeMode: 'contain'}}
                                            />
                                        </View>
                                    </View>

                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: 'Avenir',
                                            textAlign: 'center',
                                            marginTop: 10,
                                        }}>
                                        Materi{'\n'}Belajar
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        {/* <View style={{flex: 1}}>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate('AttendanceScreen')}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: '#E9E9E9',
                      height: 95,
                      width: 95,
                      borderRadius: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/images/ic_absense.png')}
                      style={{width: 75, height: 75, resizeMode: 'contain'}}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Graphik-Regular',
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    Attendance
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View> */}

                        {/* <View style={{flex: 1}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate('ReportScreen');
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: '#E9E9E9',
                      height: 95,
                      width: 95,
                      borderRadius: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/images/ic_report_card.png')}
                      style={{width: 75, height: 75, resizeMode: 'contain'}}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Graphik-Regular',
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    Report Card
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View> */}
                    </View>

                    <View style={{flex: 1}}/>

                    <ImageBackground
                        source={require('../../assets/images/blue-rect-gradient.png')}
                        imageStyle={{borderRadius: 8}}
                        style={{
                            flexDirection: 'row',
                            height: 100,
                            paddingStart: 16,
                            marginBottom: Platform.OS === 'ios' ? 10 : 0,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={require('../../assets/images/ic_quotes-2.png')}
                            style={{
                                width: 75,
                                height: 75,
                            }}
                        />
                        <View style={{flex: 1, justifyContent: 'center', marginLeft: 16}}>
                            <Text
                                style={{
                                    marginBottom: 4,
                                    fontFamily: 'Avenir',
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: '700',
                                }}>
                                {quotes.title}
                            </Text>
                            <Text
                                style={{
                                    color: 'white',
                                    fontFamily: 'Avenir',
                                    marginRight: 16,
                                }}>
                                {quotes.quote}
                            </Text>
                        </View>
                    </ImageBackground>

                    <View style={{flexDirection: 'row', marginTop: 30}}>
                        {/* <View style={{flex: 1}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate('MyOrderScreen');
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: '#E9E9E9',
                      height: 95,
                      width: 95,
                      borderRadius: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/images/ic_payment.png')}
                      style={{width: 75, height: 75, resizeMode: 'contain'}}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Graphik-Regular',
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    My Order
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View> */}
                    </View>
                </View>
            </ScrollView>
        </AppContainer>
    );
}
