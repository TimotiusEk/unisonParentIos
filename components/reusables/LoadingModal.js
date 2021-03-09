import {ActivityIndicator, Modal, View} from "react-native";
import React from "react";

export default function LoadingModal (props) {
    return (
        <Modal visible={props.visible} transparent={true}>
            <View style={{flex: 1, backgroundColor: '#00000066', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{backgroundColor: 'white', padding: 20, borderRadius: 5}}>
                    <ActivityIndicator size="large" color="#4287f5"/>
                </View>
            </View>
        </Modal>
    )
}
