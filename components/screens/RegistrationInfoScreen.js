import {Image, Text, TouchableOpacity, ScrollView, View, TextInput, StyleSheet, Platform} from "react-native";
import Collapsible from "react-native-collapsible";
import React, {useState} from "react";
import {TextInputLayout} from "rn-textinputlayout";
import Ionicons from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function RegistrationInfoScreen (props) {
    const [isValidating, setValidating] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ktpNo, setKtpNo] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isKtpNoError, setKtpNoError] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 100,
        },
        textInput: {
            fontSize: 16,
            height: 40,
            color: '#101010',
            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'

        },
        inputLayout: {
            marginTop: 16,
        }
    });

    const attemptRegister = () => {
        if(!name || !email || !address || !password || password.length < 6 || !confirmPassword || (password !== confirmPassword) || !validateEmail(email) || (ktpNo && ktpNo.length !== 16)) {
            setValidating(true)

            if(ktpNo && ktpNo.length !== 16) {
                setKtpNoError(true)

                setTimeout(() => {
                    setKtpNoError(false)
                }, 3000)
            }
        } else {
            props.navigation.navigate('ChildRegistrationScreen', {
                mobileNo: props.navigation.getParam('mobileNo'),
                gender: props.navigation.getParam('gender'),
                name,
                email,
                address,
                password,
                ktpNo
            })
        }
    }

    const validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

        return expression.test(String(email).toLowerCase())
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
                Silahkan lengkapi kolom dibawah ini
            </Text>

                <Collapsible collapsed={!isKtpNoError}>
                    <View style={{
                        backgroundColor: '#3b5998',
                        marginTop: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                        height: 55,
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                            KTP harus 16 angka
                        </Text>
                    </View>
                </Collapsible>

            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, paddingLeft: 36, paddingRight: 36, paddingBottom: 20}}>
                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={isValidating && name.length === 0 ? 'red' : 'grey'}
                    focusColor={isValidating && name.length === 0 ? 'red' : 'blue'}
                >
                    <TextInput
                        onChangeText={(name) => {
                            setName(name)
                        }}
                        style={styles.textInput}
                        placeholder={'Name'}
                    />
                </TextInputLayout>
                <Text style={{color: 'red', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',  marginTop: 3}}>
                    {isValidating && name.length === 0 ? 'Name is mandatory.' : null}
                </Text>

                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={isValidating && (email.length === 0 || !validateEmail(email)) ? 'red' : 'grey'}
                    focusColor={isValidating && (email.length === 0 || !validateEmail(email)) ? 'red' : 'blue'}
                >
                    <TextInput
                        keyboardType={'email-address'}
                        onChangeText={(email) => {
                            setEmail(email)
                        }}
                        style={styles.textInput}
                        placeholder={'Email'}
                    />
                </TextInputLayout>
                <Text style={{color: 'red', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',  marginTop: 3}}>
                    {isValidating && email.length === 0 ? 'Email is mandatory.' : isValidating && !validateEmail(email)  ? 'Form email is not an email address.' : null}
                </Text>

                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={'grey'}
                    focusColor={'blue'}
                >
                    <TextInput
                        keyboardType={'numeric'}
                        value={ktpNo}
                        onChangeText={(ktpNo) => {
                            const re = /^[0-9\b]+$/;

                            if(re.test(ktpNo)) setKtpNo(ktpNo)
                        }}
                        style={styles.textInput}
                        placeholder={'No. KTP'}
                    />
                </TextInputLayout>
                <Text style={{color: 'red', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',  marginTop: 3}}>

                </Text>

                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={isValidating && address.length === 0 ? 'red' : 'grey'}
                    focusColor={isValidating && address.length === 0 ? 'red' : 'blue'}
                >
                    <TextInput
                        onChangeText={(address) => {
                            setAddress(address)
                        }}
                        style={styles.textInput}
                        placeholder={'Address'}
                    />
                </TextInputLayout>
                <Text style={{color: 'red', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',  marginTop: 3}}>
                    {isValidating && address.length === 0 ? 'Address is mandatory.' : null}
                </Text>

                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={isValidating && (password.length === 0 || password.length < 6) ? 'red' : 'grey'}
                    focusColor={isValidating && (password.length === 0 || password.length < 6) ? 'red' : 'blue'}
                >
                    <TextInput
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={(password) => {
                            setPassword(password)
                        }}
                        style={styles.textInput}
                        placeholder={'Password'}
                        textContentType="oneTimeCode"
                    />
                </TextInputLayout>

                <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: -32, marginRight: 10}} onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color={'grey'}/>
                </TouchableOpacity>

                <Text style={{color: 'red', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',  marginTop: 13}}>
                    {isValidating && password.length === 0 ? 'Password is mandatory.' : isValidating && password.length < 6 ? 'Password a minimum of 6 characters' : null}
                </Text>

                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={isValidating && (confirmPassword.length === 0 || password !== confirmPassword) ? 'red' : 'grey'}
                    focusColor={isValidating && (confirmPassword.length === 0 || password !== confirmPassword) ? 'red' : 'blue'}
                >
                    <TextInput
                        secureTextEntry={!isConfirmPasswordVisible}
                        textContentType="oneTimeCode"
                        onChangeText={(confirmPassword) => {
                            setConfirmPassword(confirmPassword)
                        }}
                        style={styles.textInput}
                        placeholder={'Confirm Password'}
                    />
                </TextInputLayout>

                <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: -32, marginRight: 10}} onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                    <Ionicons name={isConfirmPasswordVisible ? 'eye' : 'eye-off'} size={20} color={'grey'}/>
                </TouchableOpacity>

                <Text style={{color: 'red', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',  marginTop: 13}}>
                    {isValidating && confirmPassword.length === 0 ? 'Confirm password is mandatory.' : isValidating && password !== confirmPassword ? 'The password confirmation does not match.' : null}
                </Text>
            </KeyboardAwareScrollView>
            {/*<View style={{height: 60}}>*/}
            {/*    <Collapsible collapsed={true}>*/}
            {/*        <View style={{*/}
            {/*            backgroundColor: '#3b5998',*/}
            {/*            marginTop: 5,*/}
            {/*            paddingTop: 15,*/}
            {/*            paddingLeft: 15,*/}
            {/*            paddingRight: 15,*/}
            {/*            paddingBottom: 15,*/}
            {/*            marginBottom: 10*/}
            {/*        }}>*/}
            {/*            <Text style={{color: 'white', fontFamily: 'Graphik-Regular'}}>*/}
            {/*                You haven't choose your gender*/}
            {/*            </Text>*/}
            {/*        </View>*/}
            {/*    </Collapsible>*/}
            {/*</View>*/}


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

            <View style={{paddingTop: 40, paddingLeft: 20, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Image source={require('../../assets/images/logo_one_line.png')}
                       style={{height: 74 / 1.9, width: 239 / 1.9, resizeMode: 'contain', marginBottom: 40}}/>
            </View>
        </View>
    )
}
