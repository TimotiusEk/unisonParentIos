import React, {useState, useRef} from "react";
import AppContainer from "../reusables/AppContainer";
import {View, Text, ScrollView, Dimensions, TouchableWithoutFeedback, Image, Platform} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel, {Pagination} from 'react-native-snap-carousel';

export default function MyOrderScreen(props) {
    const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef(null);
    return (
        <AppContainer navigation={props.navigation}>
            <View style={{backgroundColor: '#3e67d6', flexDirection: 'row', alignItems: 'center', paddingVertical: 12}}>
                <MaterialCommunityIcons name={'arrow-left'} size={28}
                                        style={{marginLeft: 10}}
                                        color={'white'}
                                        onPress={() => props.navigation.goBack(null)}/>
                <Text
                    style={{color: 'white', flex: 1, textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 17}}>My
                    Order</Text>
                <MaterialCommunityIcons name={'arrow-left'} size={28}
                                        style={{marginRight: 10, opacity: 0}}
                                        color={'white'}
                                        onPress={() => props.navigation.goBack(null)}/>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 20}}>
                <TouchableWithoutFeedback onPress={() => carouselRef.current.snapToItem(0)}>
                    <View style={{flex: 1, borderBottomWidth: 1.5, borderColor: activeSlide === 0 ? '#3e67d6' : '#3e67d680', paddingBottom: 10}}>
                        <Text style={{textAlign: 'center', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir', fontWeight: '500', color: activeSlide === 0 ? 'black' : 'grey'}}>
                            Upcoming
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => carouselRef.current.snapToItem(1)}>
                    <View style={{flex: 1, borderBottomWidth: 1.5, borderColor: activeSlide === 1 ? '#3e67d6' : '#3e67d680', paddingBottom: 10}}>
                        <Text style={{textAlign: 'center', fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir', fontWeight: '500', color: activeSlide === 1 ? 'black' : 'grey'}}>
                            Past Booking
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <Carousel
                ref={carouselRef}
                data={[{idx: 0}, {idx: 1}]}
                renderItem={(item) => {
                    return (
                        <ScrollView>
                            <View style={{paddingLeft: 56}}>
                                <Image source={require('../../assets/images/ic_empty.png')} style={{width: 84, height: 84}}/>
                                <Text style={{fontFamily: 'Montserrat-Bold'}}>None Of Your Data{'\n'}at this time</Text>
                                <Text style={{fontFamily: 'Montserrat-Bold', color: '#939598'}}>There is no data in this moment</Text>
                            </View>
                        </ScrollView>
                    )
                }}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                onSnapToItem={(idx) => setActiveSlide(idx)}
            />
        </AppContainer>
    )
}
