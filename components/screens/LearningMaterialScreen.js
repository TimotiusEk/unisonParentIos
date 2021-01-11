import React, {useRef, useState, useEffect} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
    Platform,
    TouchableWithoutFeedback,
    PanResponder
} from "react-native"
import AppContainer from "../reusables/AppContainer";
import Carousel, {Pagination} from "react-native-snap-carousel";
import HttpRequest from "../../util/HttpRequest";
import AsyncStorage from "@react-native-community/async-storage";
import {Rating} from "react-native-ratings";

export default function LearningMaterialScreen(props) {
    const mainCarouselRef = useRef(null);
    const SLIDE = {
        NEW: 0,
        VIDEO: 1,
        BOOK_AND_AUDIO: 2,
    }

    const [activeSlide, setActiveSlide] = useState(SLIDE.NEW);
    const [mustHaveActiveSlide, setMustHaveActiveSlide] = useState(SLIDE.NEW);
    const [mustHaveBooks, setMustHaveBooks] = useState([]);
    const [audioNewRelease, setAudioNewRelease] = useState([]);
    const [carouselScrollEnabled, setCarouselScrollEnabled] = useState(false);

    const _panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (e, gestureState) => {
            setCarouselScrollEnabled(false)
        },
        onPanResponderMove: () => {

        },
        onPanResponderTerminationRequest: () => true,
        onPanResponderRelease: () => {
            setCarouselScrollEnabled(true)
        },
    })

    const _renderItem = (item) => {
        item = item.item

        switch (item.page) {
            case SLIDE.NEW:
                return (
                    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}} bounces={false}>
                        <View style={{
                            backgroundColor: '#E6E367',
                            height: 250,
                            marginBottom: -220
                        }}>
                            <Text style={{
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                textAlign: 'center',
                                fontSize: 16,
                                marginTop: 16
                            }}>
                                Buku Wajib Yang Harus Kamu Punya
                            </Text>
                        </View>

                        <Carousel
                            data={mustHaveBooks}
                            renderItem={(item) => {
                                item = item.item;

                                return (
                                    <TouchableWithoutFeedback
                                        onPress={() => props.navigation.navigate('LearningMaterialDetailScreen', {material: item})}>
                                        <View style={{alignItems: 'center'}}>
                                            <Image source={{uri: item.image_path}} style={{
                                                width: '80%',
                                                height: 250,
                                                resizeMode: 'contain',
                                                marginTop: 40
                                            }}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width}
                            loop={true}
                            useNativeDriver
                            useScrollView={true}
                            autoplay={true}
                            autoplayDelay={3000}
                            autoplayInterval={3000}
                            onSnapToItem={(idx) => setMustHaveActiveSlide(idx)}
                        />

                        <Pagination
                            dotsLength={mustHaveBooks.length}
                            activeDotIndex={mustHaveActiveSlide}
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

                        <Text style={{marginStart: 12, marginTop: 40, fontFamily: 'Montserrat-Bold', fontSize: 16}}>Audio
                            New
                            Release</Text>

                        <ScrollView horizontal contentContainerStyle={{margin: 16}}>
                            {
                                audioNewRelease.map(audio => {
                                    return (
                                        <TouchableWithoutFeedback
                                            onPress={() => props.navigation.navigate('LearningMaterialDetailScreen', {material: audio})}>
                                            <View style={{flexDirection: 'column'}}>
                                                <Image source={{uri: audio.image_path}}
                                                       style={{width: 136, height: 168, borderRadius: 5}}/>
                                                <Text style={{
                                                    fontFamily: 'Montserrat-Bold',
                                                    marginTop: 8,
                                                    marginEnd: 8
                                                }}>
                                                    {audio.title}
                                                </Text>
                                                <Text style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginTop: 8,
                                                    color: '#818181'
                                                }}>
                                                    {audio.author}
                                                </Text>

                                                <Rating defaultValue={parseFloat(audio.average)} readonly={true}
                                                        imageSize={16} style={{marginLeft: -60, marginTop: 16}}/>

                                                <Text style={{
                                                    marginTop: 8,
                                                    fontFamily: 'Poppins-Medium',
                                                    color: '#818181'
                                                }}>{audio.totalReview} Review{audio.totalReview > 1 && 's'}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </ScrollView>

                        <Text style={{marginStart: 12, marginTop: 16, fontFamily: 'Montserrat-Bold', fontSize: 16}}>Video
                            New Release</Text>
                        <Text style={{marginStart: 12, marginTop: 32, fontFamily: 'Montserrat-Bold', fontSize: 16}}>Materi
                            Popular</Text>

                        <ScrollView horizontal contentContainerStyle={{margin: 16}}>
                            {
                                mustHaveBooks.map(book => {
                                    const rating = parseFloat(book.average)

                                    return (
                                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('LearningMaterialDetailScreen', {material: book})}>
                                            <View style={{flexDirection: 'column', marginRight: 40}}>
                                                <Image source={{uri: book.image_path}}
                                                       style={{width: 136, height: 168, borderRadius: 5}}/>
                                                <Text style={{
                                                    fontFamily: 'Montserrat-Bold',
                                                    marginTop: 8,
                                                    marginEnd: 8
                                                }}>
                                                    {book.title}
                                                </Text>
                                                <Text style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginTop: 8,
                                                    color: '#818181'
                                                }}>
                                                    {book.author}
                                                </Text>

                                                <Rating startingValue={isNaN(rating) ? 0 : rating} readonly={true}
                                                        imageSize={16}
                                                        style={{
                                                            marginTop: 16,
                                                            display: 'flex',
                                                            alignItems: 'flex-start'
                                                        }}/>

                                                <Text style={{
                                                    marginTop: 8,
                                                    fontFamily: 'Poppins-Medium',
                                                    color: '#818181'
                                                }}>{book.totalReview} Review{book.totalReview > 1 && 's'}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </ScrollView>
                    </ScrollView>
                )

            case SLIDE.VIDEO:
                return (
                    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
                        <Text style={{fontFamily: 'Montserrat-Bold', marginLeft: 12, marginTop: 32, fontSize: 16}}>New
                            Release</Text>
                    </ScrollView>
                )

            case SLIDE.BOOK_AND_AUDIO:
                return (
                    <ScrollView bounces={false}>
                        <ScrollView
                            contentContainerStyle={{
                                paddingLeft: 15,
                                paddingTop: 20,
                            }}
                            horizontal>
                            {
                                mustHaveBooks.map(book => {
                                    return (
                                        <View style={{flexDirection: 'column', marginRight: 30}}>
                                            <Image source={{uri: book.image_path}}
                                                   style={{width: 144, height: 192}}/>

                                            <Text style={{
                                                fontFamily: 'montserrat-bold',
                                                marginTop: 8,
                                                marginEnd: 8,
                                                fontSize: 16
                                            }}>{book.title}</Text>

                                            {book.price === 0 &&
                                            <View style={{
                                                borderWidth: 1,
                                                borderColor: '#f99500',
                                                alignSelf: 'flex-start',
                                                borderRadius: 300,
                                                marginTop: 6
                                            }}>
                                                <Text style={{
                                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                                    color: '#f99500',
                                                    paddingHorizontal: 8
                                                }}>
                                                    Free
                                                </Text>
                                            </View>
                                            }

                                        </View>
                                    )
                                })
                            }
                        </ScrollView>

                        <Text style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 16,
                            marginTop: 32,
                            marginStart: 12,
                            marginBottom: 30
                        }}>Audio
                            New Release</Text>

                        {
                            audioNewRelease && audioNewRelease[0] &&
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Image source={require('../../assets/images/ic_default_pict.png')}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{
                                            fontFamily: 'Montserrat-Bold',
                                            fontSize: 16
                                        }}>{audioNewRelease[0].title}</Text>
                                        <Text
                                            style={{
                                                fontFamily: 'Avenir',
                                                marginTop: 6,
                                                marginEnd: 8
                                            }}>{audioNewRelease[0].description.split('\n')[0]}</Text>
                                    </View>
                                </View>

                                {audioNewRelease[0].price === 0 &&
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#f99500',
                                    alignSelf: 'flex-end',
                                    borderRadius: 300,
                                    marginTop: -6,
                                    marginEnd: 15
                                }}>
                                    <Text style={{
                                        fontFamily: 'Avenir',
                                        color: '#f99500',
                                        paddingHorizontal: 8
                                    }}>
                                        Free
                                    </Text>
                                </View>
                                }
                            </View>
                        }
                    </ScrollView>
                )
            default:
                return (
                    <View>
                        <Text>DEFAULT</Text>
                    </View>
                )
        }
    }

    const getLearningMaterial = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(await HttpRequest.set("/userRekanan/materi", 'POST', JSON.stringify({
            access_token: user.access_token,
            numberOfRows: 10,
            pages: 1,
            search: '',
            materi_type: 'PDF'
        }))).then(res => {
            setMustHaveBooks(res.data)
        }).catch(err => console.log(err))
    }

    const getAudioNewRelease = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(await HttpRequest.set("/userRekanan/materi", 'POST', JSON.stringify({
            access_token: user.access_token,
            numberOfRows: 10,
            pages: 1,
            search: '',
            materi_type: 'Podcast'
        }))).then(res => {
            setAudioNewRelease(res.data);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getLearningMaterial()

        getAudioNewRelease();

        // getPopularMaterial();
    }, [])

    // const getPopularMaterial = async () => {
    //     let user = await AsyncStorage.getItem('user');
    //     user = JSON.parse(user);
    //
    //     new Promise(await HttpRequest.set("/userRekanan/materi", 'POST', JSON.stringify({
    //         access_token: user.access_token,
    //         numberOfRows: 10,
    //         pages: 1,
    //         search: '',
    //         materi_type: ''
    //     }))).then(res => {
    //         console.log('res', res)
    //     }).catch(err => console.log(err))
    // }

    return (
        <AppContainer navigation={props.navigation}>
            <ScrollView contentContainerStyle={{backgroundColor: 'white', flexGrow: 1}}>
                <View style={{backgroundColor: '#f7f9f9', paddingTop: 16}}>
                    <Text style={{fontFamily: 'Avenir', fontWeight: '600', fontSize: 23, marginStart: 24}}>
                        Materi
                    </Text>

                    <View
                        style={{marginTop: 20, marginBottom: 15, marginLeft: 5, flexDirection: 'row', paddingLeft: 24}}>
                        <TouchableOpacity onPress={() => mainCarouselRef.current.snapToItem(SLIDE.NEW)}>
                            <Text style={{
                                fontFamily: 'Avenir',
                                fontWeight: '600',
                                fontSize: 16,
                                color: activeSlide === SLIDE.NEW ? 'black' : '#868887'
                            }}>New</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => mainCarouselRef.current.snapToItem(SLIDE.VIDEO)}>
                            <Text style={{
                                fontFamily: 'Avenir',
                                fontWeight: '600',
                                fontSize: 16,
                                marginLeft: 30,
                                color: activeSlide === SLIDE.VIDEO ? 'black' : '#868887'
                            }}>Video</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => mainCarouselRef.current.snapToItem(SLIDE.BOOK_AND_AUDIO)}>
                            <Text style={{
                                fontFamily: 'Avenir',
                                fontWeight: '600',
                                fontSize: 16,
                                marginLeft: 30,
                                color: activeSlide === SLIDE.BOOK_AND_AUDIO ? 'black' : '#868887'
                            }}>Book & Audio</Text>
                        </TouchableOpacity>
                    </View>

                    <Carousel
                        ref={mainCarouselRef}
                        data={[{page: SLIDE.NEW}, {page: SLIDE.VIDEO}, {page: SLIDE.BOOK_AND_AUDIO}]}
                        renderItem={_renderItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        useScrollView={true}
                        scrollEnabled={carouselScrollEnabled}
                    />

                </View>
            </ScrollView>
        </AppContainer>
    )
}
