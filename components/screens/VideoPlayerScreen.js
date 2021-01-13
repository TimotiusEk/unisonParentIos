import React, {useEffect} from "react";
import {View, StatusBar} from "react-native";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import {hideNavigationBar, showNavigationBar} from 'react-native-navigation-bar-color';
import Orientation from "react-native-orientation-locker";

export default function VideoPlayerScreen(props) {
    useEffect(() => {
        hideNavigationBar()
        Orientation.lockToLandscape()

        return () => {
            Orientation.lockToPortrait()
            showNavigationBar()
            StatusBar.setTranslucent(false);
        }
    }, [])

    return (
        <View style={{flex: 1}}>
            <StatusBar translucent={true} backgroundColor={'transparent'}/>

            <VideoPlayer
                source={{uri: props.navigation.getParam('url')}}
                navigator={props.navigation}
            />
        </View>
    )
}
