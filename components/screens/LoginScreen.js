import {
    Image,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    TouchableWithoutFeedback,
    StatusBar, Platform
} from "react-native";
import React, {useState, useEffect} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {TextInputLayout} from 'rn-textinputlayout';
import Ionicons from "react-native-vector-icons/Ionicons";
import Collapsible from "react-native-collapsible";
import HttpRequest from "../../util/HttpRequest";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen(props) {
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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isValidating, setValidating] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setLoading] = useState(false);

    const attemptLogin = async () => {
        if (!username || !password) setValidating(true)
        else {
            setLoading(true);

            new Promise(
                await HttpRequest.set("/login/apps", 'POST', JSON.stringify({
                    username,
                    password,
                }))
            ).then(async (res) => {
                setLoading(false)

                await AsyncStorage.setItem('user', JSON.stringify(res.data))

                props.navigation.navigate('HomeScreen')
            }).catch(err => {
                setLoading(false)
                setErrorMsg(err.msg ? err.msg : err)

                setTimeout(() => {
                    setErrorMsg('')
                }, 3000)
            })
        }

    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>

            <View style={{flex: 1}}>
                <Image source={require('../../assets/images/ic_login_header.png')}
                       style={{width: 308 / 1.25, height: 99 / 1.25, resizeMode: 'contain', alignSelf: 'flex-end'}}/>

                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={{
                            paddingHorizontal: 36
                        }}>
                            <Text style={{
                                fontSize: 24,
                                color: '#042C5C',
                                marginTop: 8,
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                fontWeight: Platform.OS === 'android' ? undefined : '700'
                            }}>
                                Login into my account
                            </Text>

                            <Collapsible collapsed={errorMsg.length === 0}>
                                <View style={{
                                    backgroundColor: 'red', marginTop: 5, paddingLeft: 15, paddingRight: 15, height: 55,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                                        {errorMsg}
                                    </Text>
                                </View>
                            </Collapsible>

                            <TextInputLayout
                                style={styles.inputLayout}
                                hintColor={isValidating && username.length === 0 ? 'red' : 'grey'}
                                focusColor={isValidating && username.length === 0 ? 'red' : 'blue'}
                            >
                                <TextInput
                                    onChangeText={(username) => {
                                        setUsername(username)
                                    }}
                                    style={styles.textInput}
                                    placeholder={'Username'}
                                />
                            </TextInputLayout>
                            <Text style={{
                                color: 'red',
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                marginTop: 3
                            }}>
                                {isValidating && username.length === 0 ? 'Username is mandatory.' : null}
                            </Text>


                            <TextInputLayout
                                style={styles.inputLayout}
                                hintColor={isValidating && password.length === 0 ? 'red' : 'grey'}
                                focusColor={isValidating && password.length === 0 ? 'red' : 'blue'}
                            >
                                <TextInput
                                    style={{
                                        ...styles.textInput,
                                    }}
                                    placeholder={'Password'}
                                    secureTextEntry={!isPasswordVisible}
                                    onChangeText={(password) => {
                                        setValidating(false)
                                        setPassword(password)
                                    }}
                                />
                            </TextInputLayout>
                            <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: -32, marginRight: 10}}
                                              onPress={() => setPasswordVisible(!isPasswordVisible)}>
                                <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color={'grey'}/>
                            </TouchableOpacity>

                            <Text style={{
                                color: 'red',
                                fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                                marginTop: 13
                            }}>
                                {isValidating && password.length === 0 ? 'Password is mandatory.' : null}
                            </Text>

                            <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPasswordSwitch')}>
                                <Text style={{
                                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    color: '#0033A8',
                                    alignSelf: 'flex-end',
                                    marginTop: 15,
                                    marginBottom: 25
                                }}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={attemptLogin}>
                                <View style={{
                                    backgroundColor: '#0033A8',
                                    alignItems: 'center',
                                    paddingTop: 19,
                                    paddingBottom: 19,
                                    borderRadius: 5
                                }}>

                                    {isLoading ?
                                        <ActivityIndicator size="small" color="#ffffff"/> :
                                        <Text style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                                            Log In
                                        </Text>
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('RegisterScreen')}>
                                <View style={{alignItems: 'center', marginTop: 30}}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#77869E',
                                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-95-Black' : 'Avenir',
                                        fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    }}>
                                        Don't Have Account? <Text style={{color: '#101010'}}>Register</Text>
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>




                        </View>

                        <View style={{flex: 1}}/>

                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end', zIndex: -1, paddingLeft: 18}}>
                                <Image source={require('../../assets/images/logo_one_line.png')}
                                       style={{
                                           height: 74 / 2.3,
                                           width: 239 / 2.3,
                                           resizeMode: 'contain',
                                           marginBottom: 15,
                                       }}/>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>

                                    <Image source={require('../../assets/images/ic_login.png')}
                                           style={{width: 200 / 1.1, height: 193 / 1.1, marginBottom: 17}}/>

                                    <Image source={require('../../assets/images/ic_login_blue.png')}
                                           style={{width: 260 / 1.25, height: 95 / 1.25, position: 'absolute', right: 0, bottom : -10, zIndex: -1}}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>


            </View>
        </View>
    )
}
