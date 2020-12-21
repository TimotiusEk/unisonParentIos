import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Text, View, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback, Platform, StatusBar} from "react-native";
import React, {useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CartScreen(props) {
    const [chooseAll, setChooseAll] = useState(true)

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{
                backgroundColor: 'white', shadowColor: '#000',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.15,
                elevation: 3,
                shadowRadius: 5,
                paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight - 18,
                flexDirection: 'row', alignItems: 'center', paddingVertical: 12
            }}>
                <MaterialCommunityIcons name={'arrow-left'} size={28}
                                        style={{marginLeft: 10}}
                                        color={'#373737'}
                                        onPress={() => props.navigation.goBack(null)}/>
                <Text
                    style={{
                        color: '#373737',
                        flex: 1,
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 17
                    }}>
                    My Cart
                </Text>
                <MaterialCommunityIcons name={'arrow-left'} size={28}
                                        style={{marginRight: 10, opacity: 0}}
                                        color={'white'}
                                        onPress={() => props.navigation.goBack(null)}/>
            </View>
            <View style={{padding: 16, paddingBottom: 0}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#D63E50', fontFamily: 'Montserrat-Bold', marginTop: 2}}>Delete All</Text>
                    <View style={{flex: 1}}/>
                    <Text style={{color: '#818181', fontFamily: 'Montserrat-Bold', marginRight: 10, marginTop: 2}}>Choose
                        All</Text>
                    <TouchableOpacity onPress={() => setChooseAll(!chooseAll)}>
                        <View style={{
                            borderWidth: chooseAll ? 0 : 2,
                            borderColor: chooseAll ? '#3e67d6' : 'grey',
                            backgroundColor: chooseAll ? '#3e67d6' : 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 3,
                            width: 20,
                            height: 20
                        }}>
                            <Ionicons name={'md-checkmark-outline'} color={'white'} size={17}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
                <View style={{paddingLeft: 56}}>
                    <Image source={require('../../assets/images/ic_empty.png')} style={{width: 84, height: 84}}/>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>None Of Your Data{'\n'}at this time</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold', color: '#939598'}}>There is no data in this
                        moment</Text>
                </View>
            </ScrollView>

            <View style={{margin: 16}}>
                <Text style={{
                    fontFamily: 'Montserrat-Bold',
                    color: '#4e5665'
                }}>
                    Cart Summary
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        color: '#4e5665',
                        marginVertical: 16,
                        flex: 1
                    }}>
                        Total Fee
                    </Text>

                    <Text style={{fontFamily: 'Montserrat-Bold', color: '#3e67d6', fontSize: 16, marginVertical: 16}}>
                        Rp 0
                    </Text>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={() => {}}>
                <View style={{backgroundColor: '#3e67d6', paddingVertical: 20}}>
                    <Text style={{fontFamily: 'Montserrat-Bold', color: 'white', textAlign: 'center'}}>
                        Buy (0)
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
