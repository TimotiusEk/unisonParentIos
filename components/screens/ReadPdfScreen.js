import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback
} from "react-native";
import Pdf from "react-native-pdf";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ReadPdfScreen(props) {
    const source = require('../../assets/pdf/termsandcondition.pdf');
    const [material, setMaterial] = useState({});
    useEffect(() => {
        setMaterial(props.navigation.getParam('material'))
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#3D67D5',
                height: 100,
                alignItems: 'flex-end',
                paddingBottom: 15,
                paddingLeft: 15,
            }}>
                <TouchableWithoutFeedback onPress={() => props.navigation.goBack(null)}>
                    <Ionicons name={'md-arrow-back'} size={23} color={'white'} style={{marginBottom: 2}}/>
                </TouchableWithoutFeedback>

                <Text style={{fontFamily: 'Poppins-Regular', color: 'white', fontSize: 20, marginLeft: 25}}>
                    {material.title}
                </Text>
            </View>

            <Pdf
                style={{flex: 1, backgroundColor: 'white', marginBottom: 50}}
                source={{uri: material.file_path}}
                horizontal={true}
                enablePaging={true}
                spacing={0}
            />
        </View>
    )
}