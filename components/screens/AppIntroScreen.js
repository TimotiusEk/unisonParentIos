import {Image, ImageBackground, StatusBar, Text, View} from "react-native";
import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";

export default function AppIntroScreen (props)  {
    const _renderItem = ({item, index}) => {
        if (index === 0) {
            return (
                <View style={{
                    backgroundColor: '#343434',
                    flex: 1,
                    paddingTop: '20%'
                }}>
                    <Image source={require('../../assets/images/welcome-page-bg-a.png')}
                           style={{height: 340, resizeMode: 'contain', alignSelf: 'center', marginTop: StatusBar.currentHeight}}/>
                    <Text style={{
                        color: 'white',
                        fontFamily: 'Poppins-Bold',
                        fontSize: 24,
                        marginTop: 8,
                        marginLeft: 30
                    }}>
                        Manage and supervise{'\n'}your children's activities
                    </Text>
                    <View style={{width: 76, height: 1, marginLeft: 30, backgroundColor: '#eeeeee', marginTop: 10}}/>

                    <Text style={{
                        marginTop: 16,
                        fontSize: 18,
                        color: 'white',
                        fontFamily: 'Poppins-Regular',
                        marginLeft: 30
                    }}>With a goal drive approach</Text>
                </View>
            );
        } else if (index === 1) {
            return (
                <ImageBackground
                    source={require('../../assets/images/welcome-page-b-bg.jpg')}
                    style={{flex: 1, resizeMode: 'cover', paddingTop: '20%'}}
                >
                    <Image source={require('../../assets/images/welcome-page-bg-b.png')}
                           style={{height: 360, resizeMode: 'contain', alignSelf: 'center', marginTop: StatusBar.currentHeight}}/>

                    <Text style={{
                        color: 'white',
                        fontFamily: 'Poppins-Bold',
                        fontSize: 24,
                        marginTop: 8,
                        marginLeft: 30
                    }}>
                        Find a tutor as easy{'\n'}as a click of a button
                    </Text>
                </ImageBackground>
            )
        } else {
            return (
                <View style={{flex: 1, backgroundColor: '#335CCC', paddingTop: '30%'}}>
                    <Image source={require('../../assets/images/bg_welcome_c.png')}
                           style={{height: 320, resizeMode: 'contain', alignSelf: 'center', marginTop: StatusBar.currentHeight}}/>

                    <Text style={{
                        color: 'white',
                        fontFamily: 'Poppins-Bold',
                        fontSize: 24,
                        marginTop: 8,
                        marginLeft: 30
                    }}>
                        One integrated app{'\n'}for digital{'\n'}education solution
                    </Text>
                </View>
            )
        }
    }

    return (
        <View style={{flex: 1}}>
            <StatusBar translucent={true} backgroundColor={'transparent'}/>

            <AppIntroSlider
                dotStyle={{backgroundColor: 'white', width: 9, height: 9}}
                activeDotStyle={{width: 17, height: 9, backgroundColor: 'white'}}
                data={[
                    {},
                    {},
                    {}
                ]}
                showSkipButton
                onDone={() => props.navigation.navigate('LoginScreen')}
                renderSkipButton={() => {
                    return (
                        <View style={{marginTop: 14, marginLeft: 10}}>
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 15}}>SKIP</Text>
                        </View>
                    )
                }}
                renderNextButton={() => {
                    return (
                        <View style={{marginTop: 14, marginRight: 10}}>
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 15}}>NEXT</Text>
                        </View>
                    )
                }}
                renderDoneButton={() => {
                    return (
                        <View style={{marginTop: 14}}>
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 15}}>GET STARTED</Text>
                        </View>
                    )
                }}
                renderItem={_renderItem}
                // renderDoneButton={this._renderDoneButton}
                // renderNextButton={this._renderNextButton}
            />
        </View>
    );
}