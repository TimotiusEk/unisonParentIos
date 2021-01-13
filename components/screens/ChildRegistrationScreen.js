import {
    Image,
    Text,
    View,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator, Platform
} from "react-native";
import React, {useState} from "react";
import {TextInputLayout} from "rn-textinputlayout";
import DateTimePicker from '@react-native-community/datetimepicker';
import Collapsible from "react-native-collapsible";
import HttpRequest from "../../util/HttpRequest";
import moment from "moment";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function ChildRegistrationScreen(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 100,
        },
        textInput: {
            fontSize: 16,
            height: 35,
            color: '#101010',
            fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'

        },
    });


    const [childGender, setChildGender] = useState(null);
    const [childName, setChildName] = useState('');
    const [childDob, setChildDob] = useState('');
    const [isValidating, setValidating] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const [showDatePicker, setDatePickerShown] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || childDob;
        setChildDob(currentDate);
       setDatePickerShown(false)
    };

    const attemptRegister = async () => {
        if (!childGender || !childName) {
            setValidating(true)

            setTimeout(() => setValidating(false), 3000)
        } else {

            const body = {
                address: props.navigation.getParam('address'),
                email: props.navigation.getParam('email'),
                gender: props.navigation.getParam('gender'),
                hp: props.navigation.getParam('mobileNo'),
                identityNumber: props.navigation.getParam('ktpNo') ? props.navigation.getParam('ktpNo') : null,
                name: props.navigation.getParam('name'),
                password: props.navigation.getParam('password'),
                studentBirthdate: moment(childDob).format('YYYY-MM-DD'),
                studentGender: childGender,
                studentName: childName,
                imagePath: null,
                image: null
            }

            props.navigation.navigate('UserAgreementScreen', {body})
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
            }}>Registrasi</Text>
            <Text style={{color: '#818181', fontFamily: 'Poppins-Regular', textAlign: 'center', marginTop: 8}}>
                Silahkan lengkapi data anak anda
            </Text>

            <View style={{height: 55}}>
                <Collapsible collapsed={!isValidating || childGender}>
                    <View style={{
                        backgroundColor: '#3b5998',
                        marginTop: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                        height: 55,
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                            You haven't chosen your child gender
                        </Text>
                    </View>
                </Collapsible>
            </View>

            <View style={{
                paddingHorizontal: 36,
                paddingTop: 15
            }}>
                <Text style={{
                    color: '#77869E'
                }}>
                    Jenis Kelamin Anak Anda
                </Text>

                <View style={{flexDirection: 'row', marginTop: 16, justifyContent: 'center'}}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setChildGender('M')
                        }}>
                        <View style={{alignItems: 'center', marginRight: 16}}>
                            <View style={{
                                height: 96,
                                width: 96,
                                backgroundColor: childGender === 'M' ? '#779DE4' : null,
                                alignItems: 'center',
                                borderRadius: 56,
                            }}>
                                <Image source={require('../../assets/images/ic_children_male.png')}
                                       style={{width: 96, height: 96}}/>
                            </View>
                            <Text style={{color: '#3A3A3A', fontFamily: 'Poppins-Regular', marginTop: 6}}>
                                Male
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            setChildGender('F')
                        }}>
                        <View style={{alignItems: 'center',}}>
                            <View style={{
                                height: 96,
                                width: 96,
                                backgroundColor: childGender === 'F' ? '#779DE4' : null,
                                alignItems: 'center',
                                borderRadius: 56,
                            }}>
                                <Image source={require('../../assets/images/ic_children_female.png')}
                                       style={{width: 96, height: 96}}/>
                            </View>
                            <Text style={{color: '#3A3A3A', fontFamily: 'Poppins-Regular', marginTop: 6}}>
                                Female
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <TextInputLayout
                    style={styles.inputLayout}
                    hintColor={isValidating && childName.length === 0 ? 'red' : 'grey'}
                    focusColor={isValidating && childName.length === 0 ? 'red' : 'blue'}
                >
                    <TextInput
                        onChangeText={(childName) => {
                            setChildName(childName)
                        }}
                        style={styles.textInput}
                        placeholder={'Name'}
                    />
                </TextInputLayout>
                <Text style={{
                    color: 'red',
                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                    marginTop: 3
                }}>
                    {isValidating && childName.length === 0 ? 'Name is mandatory.' : null}
                </Text>


                {Platform.OS === 'ios' &&
                <Text
                    style={{
                        fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                        marginTop: 10,
                        marginBottom: 5
                    }}>Tanggal Lahir</Text>
                }

                <TouchableWithoutFeedback
                    onPress={() => {
                        console.log('asd');
                        setDatePickerShown(true)
                    }}>
                    <View>
                        <TextInputLayout

                            style={[styles.inputLayout, {marginBottom: 30}]}
                            hintColor={isValidating && childName.length === 0 ? 'red' : 'grey'}
                            focusColor={isValidating && childName.length === 0 ? 'red' : 'blue'}
                        >
                            <TextInput
                                value={childDob ? moment(childDob).format('DD MMM YYYY') : childDob}
                                editable={false}
                                style={[styles.textInput]}
                                placeholder={'Tanggal Lahir'}
                            />
                        </TextInputLayout>
                    </View>
                </TouchableWithoutFeedback>

                {(Platform.OS === 'ios' || showDatePicker) && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={childDob ? childDob : new Date()}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date()}
                    />
                )}
            </View>

            <View style={{flex: 1, paddingLeft: 20, justifyContent: 'flex-end'}}>
                <TouchableOpacity
                    onPress={attemptRegister}
                >
                    <View style={{
                        backgroundColor: '#0033A8',
                        alignItems: 'center',
                        paddingTop: 19,
                        paddingBottom: 19,
                        borderRadius: 5,
                        marginLeft: 16,
                        marginRight: 36
                    }}>

                        {isLoading ?
                            <ActivityIndicator size="small" color="#ffffff"/> :
                            <Text style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                                Register
                            </Text>
                        }
                    </View>
                </TouchableOpacity>

                <Image source={require('../../assets/images/logo_one_line.png')} style={{
                    height: 74 / 2.3, width: 239 / 2.3,
                    resizeMode: 'contain',
                    marginBottom: 40,
                    marginTop: 50
                }}/>
            </View>
        </KeyboardAwareScrollView>
    )
}
