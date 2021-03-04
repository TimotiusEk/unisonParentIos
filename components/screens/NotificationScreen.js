import React, {useEffect, useState} from "react";
import {View, ScrollView, Text, Image, Platform} from "react-native";
import HttpRequest from "../../util/HttpRequest";
import AsyncStorage from "@react-native-community/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

export default function NotificationScreen(props) {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        getNotification()
    }, [])

    const getNotification = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);


        console.log({
            access_token: user.access_token,
            numberOfRows: 10,
            pages: 1
        })

        new Promise(
            await HttpRequest.set("/notifications", 'POST', JSON.stringify({
                access_token: user.access_token,
                numberOfRows: 10,
                pages: 1
            }))
        ).then((res) => {
            console.log(res)
            setNotifications(res.data)
        }).catch(err => console.log(err))
    }

    return (
        <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 60 : 20}}>
            <View style={{flexDirection: 'row', marginHorizontal: 15, marginBottom: 15}}>
                <MaterialCommunityIcons name={'arrow-left'} size={28} onPress={() => props.navigation.goBack(null)}/>
                <Text style={{fontFamily: 'Poppins-Medium', flex: 1, fontSize: 20, textAlign: 'center'}}>
                    Notification
                </Text>
                <MaterialCommunityIcons name={'arrow-left'} size={30} style={{opacity: 0}}/>
            </View>
            <ScrollView style={{
                paddingHorizontal: 20
            }}>
                {
                    notifications.map(notification => {
                        return (

                            <View style={{flexDirection: 'row', marginBottom: 20}}>
                                <View style={{
                                    height: 55,
                                    width: 55,
                                    backgroundColor: '#3e67d6',
                                    borderRadius: 30,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        source={notification.type === 'AGENDA' ? require('../../assets/images/ic_agenda_activity.png') : notification.type === 'EXAM' ? require('../../assets/images/ic_exam_activity.png') : notification.type === 'ASSIGNMENT' ? require('../../assets/images/ic_assignment.png') : require('../../assets/images/ic_bell_white.png')}
                                        style={{width: 45, height: 45, resizeMode: 'contain'}}/>
                                </View>

                                <View style={{flex: 1, marginLeft: 30}}>
                                    <Text style={{
                                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                        fontWeight:  Platform.OS === 'android' ? undefined: '700',
                                        flex: 1
                                    }}>{
                                        notification.title + ', '}
                                        <Text style={{color: 'grey'}}>{notification.description}</Text>
                                    </Text>

                                    <Text style={{color: 'grey',
                                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                       }}>
                                        {moment.utc(notification.created_at).format('HH:mm, DD MMMM YYYY')}
                                    </Text>
                                </View>


                            </View>


                        )
                    })
                }
            </ScrollView>
        </View>
    )
}
