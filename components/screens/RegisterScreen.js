import {
    Image,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import React, {useState} from "react";
import {TextInputLayout} from "rn-textinputlayout";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 100,
        },
        textInput: {
            fontSize: 16,
            height: 40,
            color: '#101010',
            fontFamily: 'Avenir',

        },
        inputLayout: {
            marginTop: 16,
        }
    });

    const [mobileNo, setMobileNo] = useState('');
    const [isValidating, setValidating] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const attemptRegister = () => {
        setValidating(true)
        setErrorMsg('');

        if (mobileNo.length === 0) {
            setErrorMsg('Mobile Phone is mandatory.')
        } else if (!mobileNo.match(/^0[0-9]{6,15}/)) {
            setErrorMsg('Mobile Phone invalid')
        } else {
            props.navigation.navigate('ChooseGenderScreen', {mobileNo});
        }
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
            <Image source={require('../../assets/images/ic_header_blue.png')}
                   style={{width: 309, height: 109, resizeMode: 'contain', alignSelf: 'flex-end'}}/>

            <Text style={{
                color: '#0274BC',
                fontFamily: 'Poppins-Bold',
                fontSize: 24,
                textAlign: 'center',
                marginTop: 8
            }}>
                Registrasi
            </Text>
            <Text style={{color: '#818181', fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 8}}>Enter
                your mobile number</Text>

            <View style={{justifyContent: 'center', paddingLeft: 36, paddingRight: 36, marginTop: 36}}>
                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={isValidating && errorMsg.length !== 0 ? 'red' : 'grey'}
                    focusColor={isValidating && errorMsg.length !== 0 ? 'red' : 'blue'}
                >
                    <TextInput
                        keyboardType={'numeric'}
                        style={{
                            ...styles.textInput,
                        }}
                        placeholder={'Mobile Phone'}
                        onChangeText={(mobileNo) => {
                            setValidating(false)
                            setMobileNo(mobileNo)
                        }}
                    />
                </TextInputLayout>

                <Text style={{color: 'red', fontFamily: 'Avenir', marginTop: 3}}>
                    {isValidating && errorMsg.length !== 0 ? errorMsg : null}
                </Text>

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ReadTermAndConditionScreen')}>
                    <Text style={{marginTop: 24, textAlign: 'center', color: '#707070', fontFamily: 'Poppins-Regular'}}>By
                        registering, you agree to <Text style={{fontFamily: 'Poppins-Medium', color: '#0274BC'}}>the
                            terms and conditions</Text> that apply</Text>
                </TouchableWithoutFeedback>
            </View>

            <View style={{justifyContent: 'center', paddingLeft: 36, paddingRight: 36, paddingVertical: 50}}>
                <TouchableOpacity onPress={attemptRegister}>
                    <View style={{
                        backgroundColor: '#0033A8',
                        alignItems: 'center',
                        paddingTop: 19,
                        paddingBottom: 19,
                        borderRadius: 5
                    }}>
                        <Text style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                            Next
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Image source={require('../../assets/images/logo_one_line.png')}
                       style={{
                           height: 74 / 2.3,
                           width: 239 / 2.3,
                           resizeMode: 'contain',
                           marginBottom: 15,
                           marginLeft: 20,
                       }}/>
            </View>
        </KeyboardAwareScrollView>
    )
}
