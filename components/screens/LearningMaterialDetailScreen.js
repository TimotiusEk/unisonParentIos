import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import Ionicons from "react-native-vector-icons/Ionicons";
import Collapsible from "react-native-collapsible";
import AsyncStorage from "@react-native-community/async-storage";
import HttpRequest from "../../util/HttpRequest";

export default function LearningMaterialDetailScreen(props) {
    const {height: SCREEN_HEIGHT} = Dimensions.get('window');

    const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
    const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
    const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
    const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

    const [material, setMaterial] = useState({});
    const [ratings, setRatings] = useState([]);
    const [isDescriptionCollapse, setDescriptionCollapse] = useState(false);

    const title = () => {
        return (
            <View style={styles.body}>
                <Image source={{uri: material.image_path}} style={{
                    height: 200,
                    width: Dimensions.get('window').width,
                    resizeMode: 'contain',
                    marginTop: STATUS_BAR_HEIGHT
                }}/>
                <View style={{
                    backgroundColor: '#033AA8',
                    borderRadius: 24,
                    flexDirection: 'row',
                    width: 95,
                    paddingVertical: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: -20
                }}>
                    <View style={{
                        width: 18,
                        height: 18,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30
                    }}>
                        <Ionicons name={'play'} color={'#033AA8'} size={10}/>
                    </View>

                    <Text style={{fontFamily: 'Montserrat-Regular', color: 'white', marginLeft: 6}}>Read</Text>
                </View>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white'
        },
        contentContainer: {
            flexGrow: 1,
        },
        navContainer: {
            height: HEADER_HEIGHT,
            marginHorizontal: 10,
        },
        statusBar: {
            height: STATUS_BAR_HEIGHT,
            backgroundColor: 'transparent',
        },
        navBar: {
            height: NAV_BAR_HEIGHT,
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'transparent',
        },
        titleStyle: {
            color: '#000000',
            fontWeight: 'bold',
            fontSize: 18,
        },
    });

    const renderNavBar = () => (
        <View style={styles.navContainer}>
            <View style={styles.statusBar}/>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                    <Ionicons name={'chevron-back'} size={23} style={{marginLeft: 5}}/>
                </TouchableOpacity>

                <Text style={{marginLeft: 15, fontSize: 18, fontFamily: 'Graphik'}}>
                    {material.title}
                </Text>
            </View>
        </View>
    );

    const getRatings = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        new Promise(
            await HttpRequest.set("/userRekanan/materi/review", 'POST', JSON.stringify({
                access_token: user.access_token,
                numberOfRows: 10,
                pages: 1,
                "rekanan_materi_id": props.navigation.getParam('material').id
            }))
        ).then((res) => {
            setRatings(res.data);
            console.log('res', res)
        }).catch(err => {
            console.log('err', err)
        })
    }

    const renderContent = () => {
        return (
            <ScrollView contentContainerStyle={{marginTop: 40, paddingHorizontal: 16}}>
                <Text style={{fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 18}}>{material.title}</Text>
                <Text style={{
                    fontFamily: 'Montserrat-Regular',
                    marginTop: 8,
                    textAlign: 'center',
                    color: '#818181'
                }}>By {material.author}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name={'star'} color={'#fdcb03'} size={25}/>

                    <Text style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 18,
                        marginStart: 8
                    }}>{material.average}</Text>
                </View>

                <Text style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center',
                    color: '#818181'
                }}>{material.view} {material.view > 0 ? 'views' : 'view'}</Text>

                <Text style={{fontFamily: 'montserrat-bold', fontSize: 18, marginTop: 24}}>
                    {material.price > 0 ? material.price : 'Free'}
                </Text>

                <TouchableWithoutFeedback onPress={() => setDescriptionCollapse(!isDescriptionCollapse)}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 24,
                            alignItems: 'center',
                            marginBottom: 20
                        }}>
                        <Text style={{fontFamily: 'montserrat-bold', flex: 1, fontSize: 16}}>
                            Description
                        </Text>

                        <Ionicons name={isDescriptionCollapse ? 'chevron-down' : 'chevron-up'} size={20}
                                  style={{marginRight: 15}} color={'grey'}/>
                    </View>
                </TouchableWithoutFeedback>

                <Collapsible collapsed={isDescriptionCollapse}>
                    <Text style={{fontFamily: 'Avenir', fontSize: 16, paddingHorizontal: 10, paddingBottom: 20}}>
                        {material.description}
                    </Text>
                </Collapsible>

                <View style={{height: 1, backgroundColor: '#e3e3e3'}}/>

                <View style={{flexDirection: 'row', marginTop: 24, alignItems: 'center', marginBottom: 20}}>
                    <Text style={{fontFamily: 'Montserrat-SemiBold', flex: 1, fontSize: 16}}>
                        Review & Ratings
                    </Text>

                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <Text style={{
                            marginEnd: 8,
                            fontFamily: 'Poppins-Regular',
                            fontSize: 12,
                            color: '#818181'
                        }}>
                            See all
                        </Text>
                    </TouchableWithoutFeedback>
                </View>

                <TouchableWithoutFeedback>
                    <View style={{
                        borderWidth: 2,
                        borderColor: '#033AA8',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 18,
                        borderRadius: 5,
                        marginBottom: 15
                    }}>
                        <Text style={{
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 15
                        }}>
                            Write a review
                        </Text>
                    </View>
                </TouchableWithoutFeedback>


                <View style={{paddingBottom: 50}}>
                    {
                        ratings.map(rating => {
                            return (
                                <View style={{flexDirection: 'row', marginTop: 20}}>
                                    <Image source={{uri: rating.image_path}}
                                           style={{width: 50, height: 50, borderRadius: 25}}/>

                                    <View style={{marginLeft: 25, flex: 1}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <Text style={{
                                                color: '#3E3F68',
                                                flex: 1,
                                                fontFamily: 'Montserrat-SemiBold'
                                            }}>
                                                {rating.reviewer_name}
                                            </Text>

                                            <Ionicons name={'star'} color={'#fdcb03'} size={20}/>

                                            <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12, marginLeft: 10}}>{rating.rating.toFixed(1)}</Text>
                                        </View>
                                        <Text style={{color: '#818181', fontFamily: 'Poppins-Regular'}}>{rating.review}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    };

    useEffect(() => {
        setMaterial(props.navigation.getParam('material'))
        getRatings();
    }, [])

    return (
        <ReactNativeParallaxHeader
            headerMinHeight={HEADER_HEIGHT}
            headerMaxHeight={250}
            navbarColor="white"
            backgroundColor={'white'}
            titleStyle={styles.titleStyle}
            title={title()}
            backgroundImageScale={1.2}
            renderNavBar={renderNavBar}
            renderContent={renderContent}
            containerStyle={styles.container}
            contentContainerStyle={styles.contentContainer}
            innerContainerStyle={styles.container}
            alwaysShowTitle={false}
            alwaysShowNavBar={false}
            scrollViewProps={{
                onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                onScrollEndDrag: () => console.log('onScrollEndDrag'),
            }}
        />
    )
}