import React, {useState, useEffect, useRef} from "react";
import {
    ScrollView,
    Image,
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    TouchableOpacity, ActivityIndicator
} from "react-native";
import AppContainer from "../reusables/AppContainer";
import AsyncStorage from "@react-native-community/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Collapsible from "react-native-collapsible";
import HttpRequest from "../../util/HttpRequest";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import {TextInputLayout} from "rn-textinputlayout";
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';

export default function ProfileScreen(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 100,
        },
        textInput: {
            fontSize: 16,
            height: 40,
            fontFamily: 'Avenir',
            fontWeight: '400'
        },
        inputLayout: {
            marginTop: 10,
        }
    });

    const [user, setUser] = useState({});
    const [myChildren, setMyChildren] = useState([]);
    const [isPersonalInfoCollapsed, setPersonalInfoCollapsed] = useState(false);
    const [isMyChildrenCollapsed, setMyChildrenCollapsed] = useState(false);
    const rbSheetRef = useRef(null);

    const [isValidating, setValidating] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [hp, setHp] = useState('');
    const [address, setAddress] = useState('');

    const [isLoading, setLoading] = useState(false);

    const [isUpdateSuccessModalShown, setUpdateSuccessModal] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        let user = await AsyncStorage.getItem('user');

        console.log('user', user)

        user = JSON.parse(user);
        setUsername(user.username)
        setEmail(user.email)
        setHp(user.hp)
        setAddress(user.address)

        let myChildren = await AsyncStorage.getItem('myChildren');

        if (!myChildren) {
            new Promise(
                await HttpRequest.set("/students/mychildren", 'POST', JSON.stringify({
                    access_token: user.access_token
                }))
            ).then(async (res) => {
                setMyChildren(res.data)

                await AsyncStorage.setItem('myChildren', JSON.stringify(res.data))
            }).catch(err => console.log(err))
        } else {
            setMyChildren(JSON.parse(myChildren))
        }

        setUser(user);
    }

    const logout = async () => {
        await AsyncStorage.removeItem('user')

        props.navigation.navigate('LoginStack');
    }

    const attemptSubmit = async () => {
        if(!username || !email || !hp || !address) {
            setValidating(true);
        } else {
            setLoading(true)

            new Promise(
                await HttpRequest.set("/users/mobileupdateprofile", 'POST', JSON.stringify({
                    access_token: user.access_token,
                    address,
                    hp,
                    username,
                    email
                }))
            ).then(res => {
                rbSheetRef.current.close()

                setLoading(false)

                setRedirect(true)
            }).catch(err => {
                setLoading(false)
                console.log('err', err)
            })
        }
    }

    return (
        <AppContainer minimal>
            <ScrollView>
                <Dialog.Container visible={isUpdateSuccessModalShown}>
                    <Dialog.Title style={{fontFamily: 'Poppins-Regular', fontSize: 17}}>Successful!</Dialog.Title>

                    <Dialog.Description style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
                        You have successfully updated your profile.
                    </Dialog.Description>

                    <Dialog.Button label="OK" style={{fontFamily: 'Poppins-Regular'}}
                                   onPress={async () => {
                                       logout()

                                       setUpdateSuccessModal(false)
                                   }}/>
                </Dialog.Container>

                <RBSheet
                    onClose={() => {
                        if(redirect) setUpdateSuccessModal(true)
                    }}
                    ref={rbSheetRef}
                    closeOnDragDown={true}
                    height={600}
                    openDuration={250}
                    customStyles={{
                        container: {
                            backgroundColor: '#f4f4f4'
                        }
                    }}
                >
                    <View style={{flex: 1, paddingTop: 10}}>
                        <Text style={{textAlign: 'center', fontFamily: 'Montserrat-Bold', marginBottom: 20}}>Change Profile</Text>

                        <View style={{backgroundColor: 'white', justifyContent: 'center', marginHorizontal: 15, paddingHorizontal: 15, borderRadius: 10}}>
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
                                    value={username}
                                />
                            </TextInputLayout>
                            <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 3}}>
                                {isValidating && username.length === 0 ? 'Username is mandatory.' : null}
                            </Text>
                        </View>

                        <View style={{backgroundColor: 'white', justifyContent: 'center', marginHorizontal: 15, paddingHorizontal: 15, borderRadius: 10, marginTop: 15}}>
                            <TextInputLayout
                                style={styles.inputLayout}
                                hintColor={isValidating && email.length === 0 ? 'red' : 'grey'}
                                focusColor={isValidating && email.length === 0 ? 'red' : 'blue'}
                            >
                                <TextInput
                                    onChangeText={(email) => {
                                        setEmail(email)
                                    }}
                                    keyboardType={'email-address'}
                                    style={styles.textInput}
                                    placeholder={'Email'}
                                    value={email}
                                />
                            </TextInputLayout>
                            <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 3}}>
                                {isValidating && email.length === 0 ? 'Email is mandatory.' : null}
                            </Text>
                        </View>

                        <View style={{backgroundColor: 'white', justifyContent: 'center', marginHorizontal: 15, paddingHorizontal: 15, borderRadius: 10, marginTop: 15}}>
                            <TextInputLayout
                                style={styles.inputLayout}
                                hintColor={isValidating && hp.length === 0 ? 'red' : 'grey'}
                                focusColor={isValidating && hp.length === 0 ? 'red' : 'blue'}
                            >
                                <TextInput
                                    onChangeText={(hp) => {
                                        const re = /^[0-9\b]+$/;

                                        if(re.test(hp)) setHp(hp)
                                    }}
                                    keyboardType={'numeric'}
                                    style={styles.textInput}
                                    placeholder={'Mobile Phone'}
                                    value={hp}
                                />
                            </TextInputLayout>
                            <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 3}}>
                                {isValidating && hp.length === 0 ? 'Mobile Phone is mandatory.' : null}
                            </Text>
                        </View>

                        <View style={{backgroundColor: 'white', justifyContent: 'center', marginHorizontal: 15, paddingHorizontal: 15, borderRadius: 10, marginTop: 15}}>
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
                                    value={address}
                                />
                            </TextInputLayout>
                            <Text style={{color: 'red', fontFamily: 'Avenir', fontWeight: '400', marginTop: 3}}>
                                {isValidating && address.length === 0 ? 'Address is mandatory.' : null}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={attemptSubmit}>
                            <View style={{backgroundColor: '#0033A8', alignItems: 'center', paddingTop: 19, paddingBottom: 19, borderRadius: 15, marginHorizontal: 15, marginTop: 25}}>

                                {isLoading ?
                                    <ActivityIndicator size="small" color="#ffffff"/> :
                                    <Text style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                                        Save Change
                                    </Text>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </RBSheet>

                <View style={{alignItems: 'center', marginTop: 20}}>
                    <Image
                        source={user.image_path ? {uri: user.image_path.replace('https://api.unison.id/', '')} : require('../../assets/images/ic_user.png')}
                        style={{height: 110, width: 110, borderRadius: 55}}/>

                    <View style={{
                        width: 35,
                        height: 35,
                        borderRadius: 50,
                        backgroundColor: '#77859F',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: -30,
                        marginRight: -70
                    }}>
                        <FontAwesome name={'camera'} color={'white'} size={15}/>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={() => setPersonalInfoCollapsed(!isPersonalInfoCollapsed)}>
                    <View style={{
                        backgroundColor: '#f5f5f5',
                        paddingHorizontal: 18,
                        paddingTop: 16,
                        paddingBottom: 20,
                        marginTop: 15,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: 'Montserrat-Bold',
                            flex: 1
                        }}>
                            Personal Information
                        </Text>

                        <Ionicons name={isPersonalInfoCollapsed ? 'chevron-down-outline' : 'chevron-up-outline'}
                                  color={'#9D9D9D'} size={20}/>
                    </View>
                </TouchableWithoutFeedback>

                <Collapsible collapsed={isPersonalInfoCollapsed}>
                    <View style={{paddingHorizontal: 15, paddingTop: 20}}>
                        <Text style={{color: '#787878', fontWeight: '300'}}>
                            Name
                        </Text>
                        <Text style={{marginTop: 9}}>
                            {user.name}
                        </Text>
                        <View style={{width: '100%', height: 1, backgroundColor: '#e6e6e6', marginTop: 10}}/>

                        <Text style={{color: '#787878', fontWeight: '300', marginTop: 30}}>
                            Email
                        </Text>
                        <Text style={{marginTop: 9}}>
                            {user.email}
                        </Text>
                        <View style={{width: '100%', height: 1, backgroundColor: '#e6e6e6', marginTop: 10}}/>

                        <Text style={{color: '#787878', fontWeight: '300', marginTop: 30}}>
                            Mobile Phone
                        </Text>
                        <Text style={{marginTop: 9}}>
                            {user.hp}
                        </Text>
                        <View style={{width: '100%', height: 1, backgroundColor: '#e6e6e6', marginTop: 10}}/>

                        <Text style={{color: '#787878', fontWeight: '300', marginTop: 30}}>
                            Address
                        </Text>
                        <Text style={{marginTop: 9}}>
                            {user.address}
                        </Text>
                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e6e6e6',
                            marginTop: 10,
                            marginBottom: 15
                        }}/>
                    </View>
                </Collapsible>

                <TouchableWithoutFeedback onPress={() => setMyChildrenCollapsed(!isMyChildrenCollapsed)}>
                    <View style={{
                        backgroundColor: '#f5f5f5',
                        paddingHorizontal: 18,
                        paddingTop: 16,
                        paddingBottom: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: 'Montserrat-Bold',
                            flex: 1
                        }}>
                            My Children
                        </Text>

                        <Ionicons name={isMyChildrenCollapsed ? 'chevron-down-outline' : 'chevron-up-outline'}
                                  color={'#9D9D9D'} size={20}/>
                    </View>
                </TouchableWithoutFeedback>

                <Collapsible collapsed={isMyChildrenCollapsed}>
                    <View style={{marginTop: 20, paddingHorizontal: 20}}>
                        {
                            myChildren.map(child => {
                                return (
                                    <View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{fontFamily: 'Avenir', fontWeight: '700', fontSize: 18}}>
                                                {child.student_name}
                                            </Text>

                                            <View style={{
                                                flex: 1,
                                                height: 1,
                                                backgroundColor: '#e6e6e6',
                                                marginLeft: 30
                                            }}/>
                                        </View>

                                        <Text style={{color: '#787878', fontWeight: '300', marginTop: 20}}>
                                            Name
                                        </Text>
                                        <Text style={{marginTop: 9}}>
                                            {child.student_name}
                                        </Text>

                                        <View style={{
                                            width: '100%',
                                            height: 1,
                                            backgroundColor: '#e6e6e6',
                                            marginTop: 10,
                                            marginBottom: 10
                                        }}/>

                                        <Text style={{color: '#787878', fontWeight: '300', marginTop: 15}}>
                                            Mobile Phone
                                        </Text>
                                        <Text style={{marginTop: 9}}>
                                            {child.student_hp}
                                        </Text>

                                        <View style={{
                                            width: '100%',
                                            height: 1,
                                            backgroundColor: '#e6e6e6',
                                            marginTop: 10,
                                            marginBottom: 10
                                        }}/>

                                        <Text style={{color: '#787878', fontWeight: '300', marginTop: 15}}>
                                            Class
                                        </Text>
                                        <Text style={{marginTop: 9}}>
                                            {child.class_name}
                                        </Text>

                                        <View style={{
                                            width: '100%',
                                            height: 1,
                                            backgroundColor: '#e6e6e6',
                                            marginTop: 10,
                                            marginBottom: 10
                                        }}/>

                                        <Text style={{color: '#787878', fontWeight: '300', marginTop: 15}}>
                                            School Name
                                        </Text>
                                        <Text style={{marginTop: 9}}>
                                            {child.school_name}
                                        </Text>

                                        <View style={{
                                            width: '100%',
                                            height: 1,
                                            backgroundColor: '#e6e6e6',
                                            marginTop: 10,
                                            marginBottom: 30
                                        }}/>
                                    </View>
                                )
                            })
                        }
                    </View>
                </Collapsible>

                <View style={{
                    backgroundColor: '#f5f5f5',
                    paddingHorizontal: 18,
                    paddingTop: 16,
                    paddingBottom: 20,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        flex: 1
                    }}>
                        Setting
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={() => {
                    rbSheetRef.current.open()
                }}>
                    <View>
                        <View style={{
                            paddingHorizontal: 18,
                            paddingTop: 16,
                            paddingBottom: 17,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: 'Montserrat-Bold',
                                flex: 1
                            }}>
                                Edit Profile
                            </Text>

                            <MaterialCommunityIcons name={'chevron-right'} color={'#9D9D9D'} size={25}/>
                        </View>

                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e6e6e6',
                        }}/>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                }}>
                    <View>
                        <View style={{
                            paddingHorizontal: 18,
                            paddingTop: 16,
                            paddingBottom: 17,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: 'Montserrat-Bold',
                                flex: 1
                            }}>
                                Change Password
                            </Text>

                            <MaterialCommunityIcons name={'chevron-right'} color={'#9D9D9D'} size={25}/>
                        </View>

                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e6e6e6',
                        }}/>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                }}>
                    <View>
                        <View style={{
                            paddingHorizontal: 18,
                            paddingTop: 16,
                            paddingBottom: 17,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: 'Montserrat-Bold',
                                flex: 1
                            }}>
                                Sync child data
                            </Text>

                            <MaterialCommunityIcons name={'chevron-right'} color={'#9D9D9D'} size={25}/>
                        </View>

                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e6e6e6',
                        }}/>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={logout}>
                    <View>
                        <View style={{
                            paddingHorizontal: 18,
                            paddingTop: 16,
                            paddingBottom: 17,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: 'Montserrat-Bold',
                                flex: 1
                            }}>
                                Log out
                            </Text>

                            <MaterialCommunityIcons name={'chevron-right'} color={'#9D9D9D'} size={25}/>
                        </View>

                        <View style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e6e6e6',
                        }}/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </AppContainer>
    )
}