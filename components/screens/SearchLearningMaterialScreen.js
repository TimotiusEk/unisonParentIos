import React, {useState} from "react";
import {View, Text, TextInput, ScrollView, ImageBackground, Image, TouchableWithoutFeedback} from "react-native"
import AppContainer from "../reusables/AppContainer";
import {TextInputLayout} from "rn-textinputlayout";
import Ionicons from "react-native-vector-icons/Ionicons";
import HttpRequest from "../../util/HttpRequest";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

export default function SearchLearningMaterialScreen(props) {
    const [keyword, setKeyword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [noData, setNoData] = useState(false);

    const searchRekanan = async (keyword) => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        setLoading(true)

        new Promise(
            await HttpRequest.set("/userRekanan/materi", 'POST', JSON.stringify({
                access_token: user.access_token,
                numberOfRows: 10,
                pages: 1,
                search: keyword,
                materi_type: ''
            }))
        ).then((res) => {
            setLoading(false)
            if (res.data.length === 0) {
                setNoData(true)
            } else {
                setNoData(false)
            }
            setMaterials(res.data)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <AppContainer minimal>
            <View>
                <View style={{
                    backgroundColor: '#3e67d6',
                    borderBottomLeftRadius: 52
                }}>
                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'white',
                        fontSize: 24,
                        marginStart: 40,
                        marginTop: 16,
                        marginBottom: 32,
                    }}>
                        Search Material Learning
                    </Text>
                </View>

                <View style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    marginHorizontal: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    borderRadius: 24,
                    elevation: 2,
                }}>
                    <Ionicons name={keyword ? 'close' : 'search'} color={keyword ? 'grey' : '#e3e3e3'} size={25}
                              onPress={() => {
                                  if (keyword) setKeyword('')
                              }}/>

                    <TextInput
                        onChangeText={(keyword) => {
                            setKeyword(keyword)
                            searchRekanan(keyword)
                        }}
                        value={keyword}
                        style={{
                            fontFamily: 'Montserrat-Regular',
                            marginLeft: 20
                        }}
                        placeholder={'Search Material Learning'}
                    />
                </View>

                {isLoading ?
                    <View>
                        <View style={{
                            marginTop: 36,
                            marginHorizontal: 25,
                            backgroundColor: '#fafafa',
                            height: 200,
                            elevation: 3,
                            borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.25,
                            shadowRadius: 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                width: 45,
                                height: 45,
                                borderRadius: 25,
                                backgroundColor: '#5e5e5e',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Ionicons name={'play'} color={'white'} size={22}/>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 25,
                            marginHorizontal: 25,
                            backgroundColor: '#fafafa',
                            height: 200,
                            elevation: 3,
                            borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.25,
                            shadowRadius: 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                width: 45,
                                height: 45,
                                borderRadius: 25,
                                backgroundColor: '#5e5e5e',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Ionicons name={'play'} color={'white'} size={22}/>
                            </View>
                        </View>
                    </View> :
                    noData ?
                        <View style={{marginTop: 80, marginLeft: 56}}>
                            <Image source={require('../../assets/images/ic_empty.png')}
                                   style={{width: 84, height: 84}}/>

                            <Text style={{fontFamily: 'Montserrat-Bold'}}>None of Your Data {'\n'}at this time</Text>
                            <Text style={{fontFamily: 'Montserrat-Bold', color: '#939598', marginTop: 3}}>There is no
                                data in this moment</Text>
                        </View> :
                        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 300}}>
                            {
                                materials.map(material => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('LearningMaterialDetailScreen', {material})}>
                                            <View style={{
                                                marginTop: 36,
                                                marginHorizontal: 25,
                                                backgroundColor: '#fafafa',
                                                height: 200,
                                                elevation: 3,
                                                borderRadius: 10,
                                                shadowColor: '#000',
                                                shadowOffset: {width: 0, height: 2},
                                                shadowOpacity: 0.25,
                                                shadowRadius: 2,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <ImageBackground source={{uri: material.image_path}}
                                                                 imageStyle={{borderRadius: 10}}
                                                                 style={{
                                                                     width: '100%',
                                                                     height: '100%',
                                                                     resizeMode: 'cover'
                                                                 }}>
                                                    <View style={{
                                                        flex: 1,
                                                        backgroundColor: '#00000099',
                                                        borderRadius: 10
                                                    }}>
                                                        <View style={{
                                                            backgroundColor: 'white',
                                                            alignSelf: 'flex-end',
                                                            flexDirection: 'row',
                                                            padding: 5,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 8,
                                                            marginTop: 8,
                                                            marginEnd: 8
                                                        }}>
                                                            <Ionicons name={'star'} color={'#fdcb03'} size={17}/>

                                                            <Text style={{
                                                                marginLeft: 10,
                                                                fontSize: 12,
                                                                fontFamily: 'Montserrat-Regular'
                                                            }}>
                                                                {material.average ? material.average : '0.0'}
                                                            </Text>
                                                        </View>

                                                        <View style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}>
                                                            <View style={{
                                                                width: 45,
                                                                height: 45,
                                                                borderRadius: 25,
                                                                backgroundColor: '#1d200b',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                                <Ionicons name={'play'} color={'white'} size={22}/>
                                                            </View>
                                                        </View>

                                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                                            <View style={{
                                                                flex: 1,
                                                                justifyContent: 'flex-end',
                                                                marginLeft: 15,
                                                                marginBottom: 5
                                                            }}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    marginBottom: 5
                                                                }}>
                                                                    <Text style={{
                                                                        color: 'white',
                                                                        fontFamily: 'Montserrat-Medium'
                                                                    }}>
                                                                        {material.author}
                                                                    </Text>

                                                                    <View style={{
                                                                        width: 6,
                                                                        height: 6,
                                                                        borderRadius: 40,
                                                                        backgroundColor: 'white',
                                                                        marginHorizontal: 6
                                                                    }}/>

                                                                    <Text style={{
                                                                        color: 'white',
                                                                        fontFamily: 'Montserrat-Medium'
                                                                    }}>
                                                                        {moment(material.created_at).format('DD MMM YYYY')}
                                                                    </Text>
                                                                </View>

                                                                <Text style={{
                                                                    fontFamily: 'Montserrat-Bold',
                                                                    color: 'white',
                                                                    fontSize: 16,
                                                                    marginEnd: 16,
                                                                    marginBottom: 4
                                                                }} numberOfLines={2}>
                                                                    {material.title}
                                                                </Text>

                                                                <Text style={{
                                                                    fontFamily: 'Montserrat-Regular',
                                                                    color: 'white',
                                                                    marginEnd: 16,
                                                                    marginBottom: 4
                                                                }}>
                                                                    {material.subtitle}
                                                                </Text>

                                                                <Text style={{
                                                                    fontFamily: 'Montserrat-Regular',
                                                                    color: 'white',
                                                                    marginEnd: 16,
                                                                    marginBottom: 4
                                                                }} numberOfLines={1}>
                                                                    {material.description}
                                                                </Text>
                                                            </View>

                                                            <View style={{
                                                                justifyContent: 'flex-end',
                                                                marginRight: 15,
                                                                marginBottom: 15
                                                            }}>
                                                                <Text style={{
                                                                    color: 'white', fontFamily: 'Montserrat-Bold'
                                                                }}>
                                                                    {material.price === 0 ? 'Free' : 'Rp' + numberWithCommas(material.price)}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </ScrollView>
                }
            </View>
        </AppContainer>
    )
}