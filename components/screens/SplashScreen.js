import React, {useEffect} from "react";
import {View, Image, Dimensions, Platform} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Orientation from "react-native-orientation-locker";

export default function SplashScreen(props) {
    useEffect(() => {
        Orientation.lockToPortrait()

        if(Platform.OS === 'android') setTimeout(redirectIfUserFinishedIntro, 3000)
        else redirectIfUserFinishedIntro()
    }, [])

    const redirectIfUserFinishedIntro = async () => {
        const isUserFinishedIntro = await AsyncStorage.getItem('isUserFinishedIntro');

        if(isUserFinishedIntro === 'true') {
           redirectIfLoggedIn()
        } else props.navigation.navigate('AppIntroScreen')
    }

    const redirectIfLoggedIn = async () => {
        const user = await AsyncStorage.getItem('user');

        if (user) props.navigation.navigate('HomeStack')
        else props.navigation.navigate('LoginStack')
    }

    if (Platform.OS === 'android') {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../assets/images/ic_logo.png')}
                       style={{width: Dimensions.get('window').width * .5, resizeMode: 'contain'}}/>
            </View>
        )
    }

    return null;
}
