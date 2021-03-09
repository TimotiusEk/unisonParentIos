import {Modal, Platform, Text, TouchableOpacity, View} from "react-native";
import Image from "react-native-scalable-image";
import React from "react";

export default function OnlineExamFinishModal (props) {
    return (
        <Modal visible={props.visible} transparent={true}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#00000040',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        borderRadius: 20,
                        alignItems: 'center',
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingBottom: 16,
                        paddingTop: 30
                    }}>
                    <Image
                        source={require('../../assets/images/ic-okay.png')}
                        // style={{width: 140, resizeMode: 'contain'}}
                        width={140}
                    />

                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily:
                                Platform.OS === 'android'
                                    ? 'Avenir-LT-Std-95-Black'
                                    : 'Avenir',
                            fontWeight: Platform.OS === 'android' ? undefined : '700',
                            color: '#333333',
                            fontSize: 20,
                            marginTop: 20
                        }}>
                        Terimakasih
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily:
                                Platform.OS === 'android'
                                    ? 'Avenir-LT-Std-55-Roman'
                                    : 'Avenir',
                            marginTop: 4,
                            color: '#666666',
                        }}>
                        Kamu telah menyelesaikan Ujian Online
                    </Text>

                    <TouchableOpacity style={{width: '100%'}} onPress={props.onClose}>
                        <View
                            style={{
                                backgroundColor: '#3066D2',
                                width: '100%',
                                marginTop: 24,
                                borderRadius: 8,
                                paddingTop: 14,
                                paddingBottom: 14,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontFamily:
                                        Platform.OS === 'android'
                                            ? 'Avenir-LT-Std-95-Black'
                                            : 'Avenir',
                                    fontWeight: Platform.OS === 'android' ? undefined : '700',
                                    color: 'white',
                                }}>
                                Oke
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
