import React from "react";
import {
    View,
    Text, ScrollView, Platform,
    Image,
    TouchableWithoutFeedback
} from "react-native"
import AppContainer from "../reusables/AppContainer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function LearningMaterialMenuScreen(props) {
    return (
        <AppContainer navigation={props.navigation}>
            <ScrollView>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginStart: 16,
                        marginEnd: 32,
                        marginTop: 20,
                        marginBottom: 16,
                    }}>
                    <MaterialCommunityIcons
                        name={'chevron-left'}
                        size={28}
                        onPress={() => props.navigation.goBack(null)}
                    />

                    <Text
                        style={{
                            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                            fontSize: 22,
                            marginLeft: 16,
                            fontWeight: '500',
                        }}>
                        Learning Materials
                    </Text>
                </View>


                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('LearningMaterialScreen')}>
                    <View style={{
                        backgroundColor: '#b9c0da',
                        margin: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 5,
                        paddingLeft: 30,
                        paddingRight: 15,
                        paddingVertical: 20
                    }}>
                        <Text style={{fontFamily: 'Montserrat-Regular', color: 'white', flex: 1}}>
                            Learning Materials
                        </Text>

                        <Image source={require('../../assets/images/ic_materi.png')}/>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('MyOrderScreen')}>
                    <View style={{
                        backgroundColor: '#627fc1',
                        margin: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 5,
                        paddingLeft: 30,
                        paddingRight: 15,
                        paddingVertical: 20
                    }}>
                        <Image source={require('../../assets/images/ic_payment.png')}/>

                        <Text style={{fontFamily: 'Montserrat-Regular', color: 'white', marginLeft: 30}}>
                            My Order
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    props.navigation.navigate('WebViewScreen', {
                        url: 'https://cp.unison.id/interactivemath',
                        hideHeader: true
                    });
                }}>
                    <View style={{
                        backgroundColor: '#1B53BE',
                        margin: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 5,
                        paddingLeft: 30,
                        paddingRight: 15,
                        paddingVertical: 20
                    }}>
                        <Text style={{fontFamily: 'Montserrat-Regular', color: 'white', flex: 1}}>
                            Interactive Math
                        </Text>

                        <Image source={require('../../assets/images/ic_interactive_math.png')} style={{width: 60, height: 60}}/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </AppContainer>
    )
}
