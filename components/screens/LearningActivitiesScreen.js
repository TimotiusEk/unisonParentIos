import AppContainer from "../reusables/AppContainer";
import React from "react";
import {ScrollView, Text, View, Image, TouchableWithoutFeedback} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function LearningActivitiesScreen(props) {
    return (
        <AppContainer>
            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginStart: 16,
                    marginEnd: 32,
                    marginTop: 16,
                    marginBottom: 16
                }}>
                    <MaterialCommunityIcons name={'arrow-left'} size={28}
                                            onPress={() => props.navigation.goBack(null)}/>

                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 24,
                        marginLeft: 16
                    }}>
                        Learning Activities
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={() => {}}>
                    <View
                        style={{
                            backgroundColor: '#B9C0DA',
                            borderRadius: 4,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            marginBottom: 25
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Montserrat-Medium',
                                marginStart: 50,
                                marginTop: 50,
                                flex: 1,
                                color: 'white'
                            }}>
                            Exam
                        </Text>

                        <Image source={require('../../assets/images/ic_exam_activity.png')}
                               style={{width: 76, marginTop: -25, marginRight: 24}}/>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {}}>
                    <View
                        style={{
                            backgroundColor: '#627FC1',
                            borderRadius: 4,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            paddingTop: -30,
                            marginBottom: 25
                        }}>
                        <Image source={require('../../assets/images/ic_agenda_activity.png')}
                               style={{width: 76, height: 130, marginTop: -18, marginRight: 24, marginStart: 24}}/>

                        <Text
                            style={{
                                fontFamily: 'Montserrat-Medium',
                                marginStart: 50,
                                marginTop: 50,
                                flex: 1,
                                color: 'white'
                            }}>
                            Agenda
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {}}>
                    <View
                        style={{
                            backgroundColor: '#1D3461',
                            borderRadius: 4,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            marginBottom: 25
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Montserrat-Medium',
                                marginStart: 50,
                                marginTop: 50,
                                flex: 1,
                                color: 'white'
                            }}>
                            Assignment
                        </Text>

                        <Image source={require('../../assets/images/ic_assignment.png')}
                               style={{width: 76, height: 140, marginRight: 24, marginTop: -20, resizeMode: 'contain'}}/>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {}}>
                    <View
                        style={{
                            backgroundColor: '#091540',
                            borderRadius: 4,
                            height: 112,
                            marginHorizontal: 8,
                            marginVertical: 16,
                            flexDirection: 'row',
                            paddingTop: -30,
                            marginBottom: 25
                        }}>
                        <Image source={require('../../assets/images/ic_notes_behavior.png')}
                               style={{width: 90, height: 130, marginRight: 24, marginStart: 24, resizeMode: 'stretch', marginTop: -18}}/>

                        <Text
                            style={{
                                fontFamily: 'Montserrat-Medium',
                                marginStart: 50,
                                marginTop: 50,
                                flex: 1,
                                color: 'white'
                            }}>
                            Behavioral Record's
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </AppContainer>
    )
}