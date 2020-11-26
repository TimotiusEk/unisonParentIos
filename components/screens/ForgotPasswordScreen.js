import React, {useState} from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback, TextInput, ActivityIndicator
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HttpRequest from "../../util/HttpRequest";
import Collapsible from "react-native-collapsible";

export default function ForgotPasswordScreen(props) {
    const [isValidating, setValidating] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const attemptSubmit = async () => {
        if (!email) {
            setValidating(true)
        } else {
            setLoading(true)

            new Promise(
                await HttpRequest.set("/resetpassword/forgotpassword", 'POST', JSON.stringify({
                    email,
                }))
            ).then(res => {
                setLoading(false);

                props.navigation.navigate('ResetPasswordScreen')
            }).catch(err => {
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

            <View style={{padding: 16}}>
                <Text
                    style={{
                        marginTop: 10,
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 22,
                    }}>
                    Forgot Password?
                </Text>

                <Text style={{color: '#818181', fontFamily: 'Montserrat-Regular', marginTop: 16}}>
                    Please enter your email below to receive your password reset instructions
                </Text>

                <Text style={{
                    marginTop: 48,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 18
                }}>
                    Email
                </Text>

                <TextInput
                    placeholder={'Enter your email'}
                    keyboardType={'email-address'}
                    style={{marginTop: 8, fontSize: 16, height: 40, fontFamily: 'Montserrat-Regular'}}
                    onChangeText={(email) => setEmail(email)}
                />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 3,
                    opacity: isValidating && !email ? 1 : 0
                }}>
                    <MaterialIcons name={'error'} color={'red'} size={18}/>
                    <Text style={{color: 'red', marginLeft: 10, fontFamily: 'Avenir', fontWeight: '400',}}>
                        Email is mandatory.
                    </Text>
                </View>

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
                                    Send Request
                                </Text>
                            }

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}