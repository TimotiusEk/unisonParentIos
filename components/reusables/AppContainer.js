import React, {useEffect, useState} from "react";
import {Image, View, Text, TouchableWithoutFeedback} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-community/async-storage";

export default function AppContainer(props) {
    const [user, setUser] = useState({});

    const {minimal} = props;

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = async () => {
        let user = await AsyncStorage.getItem('user');

        user = JSON.parse(user);

        setUser(user);
    }

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <View style={{
                backgroundColor: 'white', shadowColor: '#000',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.15,
                shadowRadius: 5,
                paddingTop: 60,
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 15
            }}>
                {!minimal && <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            props.navigation.navigate('SearchLearningMaterialScreen')
                    }}>
                        <View style={{
                            backgroundColor: '#edeef0',
                            flex: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#9D9D9E', fontFamily: 'Montserrat-Regular', flex: 1}}>
                                Search Material Learning
                            </Text>

                            <Feather name={'search'} color={'#D3D3D3'} size={23}/>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ProfileScreen')}>
                        <Image
                            source={user.image_path ? {uri: user.image_path.replace('https://api.unison.id/', '')} : require('../../assets/images/ic_user.png')}
                            style={{width: 45, height: 45, marginLeft: 15, borderRadius: 100}}/>
                    </TouchableWithoutFeedback>
                </View>
                }


                <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15}}>
                    <Image source={require('../../assets/images/logo_one_line.png')}
                           style={{height: 74 / 2, width: 239 / 2}}/>
                    <View style={{flex: 1}}/>
                    <Entypo name={'shopping-cart'} size={22} color={'#757575'} style={{marginRight: 30}}/>
                    <MaterialIcons name={'notifications-none'} size={27} color={'#9DA2B9'}
                                   onPress={() => props.navigation.navigate('NotificationScreen')}/>
                </View>
            </View>
            {props.children}
        </View>
    )
}