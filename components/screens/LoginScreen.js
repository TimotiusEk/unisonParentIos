import {Image, StyleSheet, TextInput, Text, View, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback} from "react-native";
import React, {useState} from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import {TextInputLayout} from 'rn-textinputlayout';
import Ionicons from "react-native-vector-icons/Ionicons";
import Collapsible from "react-native-collapsible";
import HttpRequest from "../../util/HttpRequest";

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
            fontFamily: 'Avenir',
            fontWeight: '400'
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
        if(!username || !password) setValidating(true)
        else {
            setLoading(true);

            new Promise(
                await HttpRequest.set("/login/apps", 'POST', JSON.stringify({
                    username,
                    password,
                }))
            ).then(res => {
                setLoading(false)

                props.navigation.navigate('HomeScreen')

               /**
                * todo: REDIRECT AFTER LOGIN SUCCESSFULLY
                */
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
            <Image source={require('../../assets/images/ic_login_header.png')}
                   style={{width: 308, height: 99, resizeMode: 'contain', alignSelf: 'flex-end'}}/>

            <View style={{paddingLeft: 36, paddingRight: 36,}}>
                <Text style={{
                    fontFamily: 'Avenir-Heavy',
                    fontSize: 24,
                    color: '#042C5C',
                    marginTop: 8
                }}>
                    Login into my account
                </Text>

                <Collapsible collapsed={errorMsg.length === 0}>
                    <View style={{backgroundColor: 'red', marginTop: 5, paddingLeft: 15, paddingRight: 15, height: 55,
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
                <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 3}}>
                    {isValidating && username.length === 0 ? 'Username is mandatory.' : null}
                </Text>

                <View>
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
                    <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: -32, marginRight: 10}} onPress={() => setPasswordVisible(!isPasswordVisible)}>
                        <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color={'grey'}/>
                    </TouchableOpacity>

                    <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 13}}>
                        {isValidating && password.length === 0 ? 'Password is mandatory.' : null}
                    </Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPasswordSwitch')}>
                            <Text style={{fontFamily: 'Avenir-Heavy', color: '#0033A8', alignSelf: 'flex-end', marginTop: 15, marginBottom: 25}}>
                                Forgot Password?
                            </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={attemptLogin}>
                        <View style={{backgroundColor: '#0033A8', alignItems: 'center', paddingTop: 19, paddingBottom: 19, borderRadius: 5}}>

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
                            <Text style={{fontSize: 18, color: '#77869E', fontFamily: 'Avenir-Heavy'}}>
                                Don't Have Account? <Text style={{color: '#101010'}}>Register</Text>
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            <View style={{flex: 1, paddingLeft: 20, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Image source={require('../../assets/images/logo_one_line.png')} style={{height: 74/1.9, width: 239/1.9, resizeMode: 'contain', marginBottom: 40}}/>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Image source={require('../../assets/images/ic_login_blue.png')} style={{width: 260/1.1, height: 95/1.1, marginBottom: -213}}/>
                    <Image source={require('../../assets/images/ic_login.png')} style={{width: 200, height: 193, marginBottom: 20}}/>
                </View>
            </View>
        </View>
    )
}