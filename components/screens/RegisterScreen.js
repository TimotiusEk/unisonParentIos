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
            fontWeight: '400'
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
        <View style={{flex: 1}}>
            <Image source={require('../../assets/images/ic_header_blue.png')}
                   style={{width: 309, height: 109, resizeMode: 'contain', alignSelf: 'flex-end'}}/>

            <Text style={{
                color: '#0274BC',
                fontFamily: 'Poppins-Bold',
                fontSize: 24,
                textAlign: 'center',
                marginTop: 8
            }}>Registrasi</Text>
            <Text style={{color: '#818181', fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 8}}>Enter
                your mobile number</Text>

            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 36, paddingRight: 36}}>
                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={isValidating && errorMsg.length !== 0 ? 'red' : 'grey'}
                    focusColor={isValidating && errorMsg.length !== 0 ? 'red' : 'blue'}
                >
                    <TextInput
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

                <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 3}}>
                    {isValidating && errorMsg.length !== 0 ? errorMsg : null}
                </Text>

                <TouchableWithoutFeedback>
                    <Text style={{marginTop: 24, textAlign: 'center', color: '#707070', fontFamily: 'Poppins-Regular'}}>By
                        registering, you agree to <Text style={{fontFamily: 'Poppins-Medium', color: '#0274BC'}}>the
                            terms and conditions</Text> that apply</Text>
                </TouchableWithoutFeedback>
            </View>

            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 36, paddingRight: 36}}>
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

            <Image source={require('../../assets/images/logo_one_line.png')}
                   style={{
                       height: 74 / 1.9,
                       width: 239 / 1.9,
                       resizeMode: 'contain',
                       marginBottom: 40,
                       marginLeft: 20
                   }}/>
        </View>
    )
}