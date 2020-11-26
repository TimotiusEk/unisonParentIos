import React, {useState} from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import Pdf from 'react-native-pdf';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Dialog from "react-native-dialog";
import HttpRequest from "../../util/HttpRequest";
import Collapsible from "react-native-collapsible";

export default function UserAgreementScreen(props) {
    const source = require('../../assets/pdf/termsandcondition.pdf');

    const [isLoading, setLoading] = useState(false);
    const [isAgree, setAgree] = useState(false);
    const [isWarningModalShown, setWarningModalShown] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: 'white'
        },
        pdf: {
            flex: 1,
            marginTop: 5
        }
    });

    const attemptRegister = async () => {
        if (!isAgree) {
            setWarningModalShown(true)
        } else {
            new Promise(
                await HttpRequest.set('/login/registerFreeParent', 'POST', JSON.stringify(props.navigation.getParam('body')))
            ).then(res => console.log('res', res)).catch(err => {
                setErrorMsg('Cannot be processed your request, please try again later')

                setTimeout(() => {
                    setErrorMsg(null)
                }, 3000)
                console.log('err', err)
            })
        }
    }

    return (
        <View style={styles.container}>
            <Dialog.Container visible={isWarningModalShown}>
                <Dialog.Description style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
                    Do you agree to the terms and conditions for ordering our services? Please click our agreement
                </Dialog.Description>

                <Dialog.Button label="OK" style={{fontFamily: 'Poppins-Regular'}}
                               onPress={() => setWarningModalShown(false)}/>
            </Dialog.Container>

            <Image source={require('../../assets/images/ic_header_blue.png')}
                   style={{width: 309, height: 109, resizeMode: 'contain', alignSelf: 'flex-end'}}/>

            <Text style={{
                color: '#042C5C',
                fontFamily: 'Poppins-Bold',
                fontSize: 24,
                marginTop: 8,
                marginLeft: 16
            }}>User Agreement</Text>

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

            <Pdf
                style={styles.pdf}
                source={source}
                spacing={0}
            />


            <TouchableWithoutFeedback onPress={() => setAgree(!isAgree)}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <View style={{
                        height: 20,
                        width: 20,
                        borderRadius: 15,
                        marginLeft: 16,
                        backgroundColor: isAgree ? '#0033A8' : '#e0e0e0',
                        borderWidth: 1,
                        borderColor: '#bababa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {isAgree && <MaterialIcons name={'check'} color={'white'}/>}
                    </View>

                    <Text style={{
                        marginLeft: 8,
                        fontFamily: 'Poppins',
                        color: '#818181',
                        fontSize: 12
                    }}>
                        I agree to the Terms & Conditions Rules
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={attemptRegister}>
                <View style={{
                    backgroundColor: '#0033A8',
                    alignItems: 'center',
                    paddingTop: 19,
                    paddingBottom: 19,
                    borderRadius: 5,
                    marginLeft: 36,
                    marginRight: 36,
                    marginTop: 15,
                    marginBottom: 40
                }}>

                    {isLoading ?
                        <ActivityIndicator size="small" color="#ffffff"/> :
                        <Text style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                            Register
                        </Text>
                    }
                </View>
            </TouchableOpacity>

        </View>
    )
}