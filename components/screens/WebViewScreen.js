import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';

export default function WebViewScreen(props) {
    useEffect(() => {
        console.log('url', props.navigation.getParam('url'));
    }, []);

    return (
        <View style={{flex: 1}}>
            {!props.navigation.getParam('hideHeader') &&
            <View
                style={{backgroundColor: '#3e67d6', paddingTop: Platform.OS === 'ios' ? 60 : 15, paddingBottom: 12}}>
                <Ionicons
                    name={'md-arrow-back'}
                    size={28}
                    color={'white'}
                    style={{marginLeft: 10}}
                    onPress={() => props.navigation.goBack(null)}
                />
            </View>
            }

            <WebView
                useWebKit={true}
                style={{flex: 1}}
                source={{uri: props.navigation.getParam('url')}}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator
                        size="large"
                        color={'#3e67d6'}
                        style={{marginTop: 100}}
                    />
                )}></WebView>
        </View>
    );
}
