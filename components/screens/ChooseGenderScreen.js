import {Image, Text, View, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import Collapsible from "react-native-collapsible";

export default function ChooseGenderScreen(props) {
    const [gender, setGender] = useState(null);
    const [isValidating, setValidating] = useState(false);

    const attemptRegister = () => {
        if (!gender) {
            setValidating(true)

            setTimeout(() => {
                setValidating(false)
            }, 3000)
        } else {
            props.navigation.navigate('RegistrationInfoScreen', {gender, mobileNo: props.navigation.getParam('mobileNo')})
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Image source={require('../../assets/images/ic_header_blue.png')}
                   style={{width: 309, height: 109, resizeMode: 'contain', alignSelf: 'flex-end'}}/>

            <Text style={{
                color: '#0274BC',
                fontFamily: 'Poppins-Bold',
                fontSize: 24,
                textAlign: 'center',
                marginTop: 8
            }}>Registrasi</Text>
            <Text style={{color: '#818181', fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 8}}>
                Apa jenis kelamin Anda?
            </Text>

            <View style={{height: 60}}>
                <Collapsible collapsed={!isValidating}>
                    <View style={{
                        backgroundColor: '#3b5998',
                        marginTop: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                        marginBottom: 10,
                        height: 55,
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                            You haven't choose your gender
                        </Text>
                    </View>
                </Collapsible>
            </View>

            <TouchableWithoutFeedback onPress={() => setGender('M')}>
                <View style={{
                    alignItems: 'center'
                }}>
                    <View style={{
                        height: 112,
                        width: 112,
                        backgroundColor: gender === 'M' ? '#779DE4' : '#dbdbdb',
                        alignItems: 'center',
                        borderRadius: 56
                    }}>
                        <Image source={require('../../assets/images/ic_male_parent.png')}
                               style={{width: 112, height: 112}}/>
                    </View>

                    <Text style={{
                        fontSize: 18,
                        color: '#3A3A3A',
                        fontFamily: 'Poppins-Regular',
                        marginTop: 5
                    }}>Male</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => setGender('F')}>
                <View style={{
                    alignItems: 'center',
                    marginTop: 35
                }}>
                    <View style={{
                        height: 112,
                        width: 112,
                        backgroundColor: gender === 'F' ? '#779DE4' : '#dbdbdb',
                        alignItems: 'center',
                        borderRadius: 56
                    }}>
                        <Image source={require('../../assets/images/ic_female_parent.png')}
                               style={{width: 112, height: 112}}/>
                    </View>

                    <Text style={{
                        fontSize: 18,
                        color: '#3A3A3A',
                        fontFamily: 'Poppins-Regular',
                        marginTop: 5
                    }}>Female</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={attemptRegister}>
                <View style={{
                    backgroundColor: '#0033A8',
                    alignItems: 'center',
                    paddingTop: 19,
                    paddingBottom: 19,
                    marginLeft: 36,
                    marginRight: 36,
                    borderRadius: 5,
                    marginTop: 55
                }}>
                    <Text style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                        Next
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={{flex: 1, paddingLeft: 20, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Image source={require('../../assets/images/logo_one_line.png')}
                       style={{height: 74 / 1.9, width: 239 / 1.9, resizeMode: 'contain', marginBottom: 40}}/>
            </View>
        </View>
    )
}