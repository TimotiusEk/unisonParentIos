import React, {useState} from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text, TextInput, TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import Collapsible from "react-native-collapsible";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {TextInputLayout} from "rn-textinputlayout";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HttpRequest from "../../util/HttpRequest";

export default function ResetPasswordScreen (props) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [isValidating, setValidating] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');

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

    const [isLoading, setLoading] = useState(false);

    const attemptSubmit = async () => {
        if(!code || !username || !password || !confirmPassword || password.length < 6 || password !== confirmPassword) {
            setValidating(true)
        } else {
            setLoading(true)

            new Promise(
                await HttpRequest.set("/resetpassword/resetpasswordapps", 'POST', JSON.stringify({
                    username,
                    code,
                    password
                }))
            ).then(res => {
                setLoading(false);

                console.log('res', res)
            }).catch(err => {
                console.log('res', err)

                setLoading(false)

                setErrorMsg(err.msg ? err.msg : err)

                setTimeout(() => {
                    setErrorMsg(null)
                }, 3000)
            })
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white',}}>
            <View style={{height: 55, marginTop: 50}}>
                <Collapsible collapsed={!errorMsg}>
                    <View style={{
                        backgroundColor: 'red',
                        marginTop: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                        height: 55,
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                            {errorMsg}
                        </Text>
                    </View>
                </Collapsible>
            </View>

            <KeyboardAwareScrollView style={{padding: 16}}>
                <Text
                    style={{
                        marginTop: 10,
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 22,
                    }}>
                    Reset Password
                </Text>

                <Text style={{color: '#818181', fontFamily: 'Montserrat-Regular', marginTop: 16}}>
                    Reset code was sent to your email.{'\n'}Please enter the code and create new password.
                </Text>

                <Text style={{
                    marginTop: 48,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 18
                }}>
                    Reset Code
                </Text>

                <TextInput
                    placeholder={'Enter your reset code'}
                    keyboardType={'numeric'}
                    style={{marginTop: 8, fontSize: 16, height: 40, fontFamily: 'Montserrat-Regular'}}
                    value={code}
                    onChangeText={(code) => {
                        const re = /^[0-9\b]+$/;

                        if(re.test(code)) setCode(code)
                    }}
                />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 3,
                    opacity: isValidating && !code ? 1 : 0
                }}>
                    <MaterialIcons name={'error'} color={'red'} size={18}/>
                    <Text style={{color: 'red', marginLeft: 10, fontFamily: 'Avenir', fontWeight: '400',}}>
                        Reset code is mandatory.
                    </Text>
                </View>

                <Text style={{
                    marginTop: 30,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 18
                }}>
                    Username
                </Text>

                <TextInput
                    placeholder={'Enter your username'}
                    onChangeText={(username) => setUsername(username)}
                    style={{marginTop: 8, fontSize: 16, height: 40, fontFamily: 'Montserrat-Regular'}}
                />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 3,
                    opacity: isValidating && !username ? 1 : 0
                }}>
                    <MaterialIcons name={'error'} color={'red'} size={18}/>
                    <Text style={{color: 'red', marginLeft: 10, fontFamily: 'Avenir', fontWeight: '400',}}>
                        Username is mandatory.
                    </Text>
                </View>

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
                        placeholder={'New Password'}
                        textContentType="oneTimeCode"
                    />
                </TextInputLayout>

                <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: -32, marginRight: 10}} onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color={'grey'}/>
                </TouchableOpacity>

                <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 13}}>
                    {isValidating && password.length === 0 ? 'New password is mandatory.' : isValidating && password.length < 6 ? 'Password a minimum of 6 characters' : null}
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

                <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 13}}>
                    {isValidating && confirmPassword.length === 0 ? 'Confirm password is mandatory.' : isValidating && password !== confirmPassword ? 'The password confirmation does not match.' : null}
                </Text>

                <TouchableWithoutFeedback onPress={attemptSubmit}>
                    <View style={{
                        marginTop: 40,
                        backgroundColor: '#004998',
                        paddingTop: 19,
                        paddingBottom: 19,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {isLoading ?
                            <ActivityIndicator size="small" color="#ffffff"/> :
                            <Text style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                                Change Password
                            </Text>
                        }

                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => props.navigation.goBack(null)}>
                    <Text style={{fontFamily: 'Montserrat-Regular', textAlign: 'center', fontSize: 18, marginTop: 30}}>
                        Log In
                    </Text>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </View>
    )
}