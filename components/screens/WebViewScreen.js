import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ActivityIndicator, Platform, BackHandler} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';

export default function WebViewScreen(props) {
    const [canGoBack, setCanGoBack] = useState(false);
    const webViewRef = useRef(null);

    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
        }

        return () => {
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener('hardwareBackPress');
            }
        }
    }, [canGoBack]);

    const onAndroidBackPress = () => {
        if (webViewRef.current && canGoBack) {
            webViewRef.current.goBack()

            return true;
        } else {
            props.navigation.goBack(null)
        }
        return false;
    }

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
                ref={webViewRef}
                useWebKit={true}
                style={{flex: 1}}
                source={{uri: props.navigation.getParam('url')}}
                startInLoadingState={true}
                onNavigationStateChange={(navState) => {
                    setCanGoBack(navState.canGoBack)
                }}
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
