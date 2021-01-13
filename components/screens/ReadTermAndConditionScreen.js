import React from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback, Platform,
    StatusBar
} from "react-native";
import Pdf from "react-native-pdf";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ReadTermAndConditionScreen(props) {
    const source = require('../../assets/pdf/termsandcondition.pdf');


    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#3D67D5',
                height: Platform.OS === 'ios' ? 100 : 90,
                alignItems: 'flex-end',
                paddingBottom: Platform.OS === 'ios' ? 15 : 12,
                paddingLeft: 15,
            }}>
                <TouchableWithoutFeedback onPress={() => props.navigation.goBack(null)}>
                    <Ionicons name={'md-arrow-back'} size={23} color={'white'} style={{marginBottom: 2}}/>
                </TouchableWithoutFeedback>

                <Text style={{fontFamily: 'Poppins-Regular', color: 'white', fontSize: 20, marginLeft: 25}}>Terms and
                    Conditions</Text>
            </View>

            <Pdf
                style={{flex: 1, backgroundColor: 'white', marginBottom: 50}}
                source={source}
                horizontal={true}
                enablePaging={true}
                spacing={0}
            />
        </View>
    )
}
