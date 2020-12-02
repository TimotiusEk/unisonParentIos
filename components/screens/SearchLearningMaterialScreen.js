import React, {useState} from "react";
import {View, Text, TextInput} from "react-native"
import AppContainer from "../reusables/AppContainer";
import {TextInputLayout} from "rn-textinputlayout";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SearchLearningMaterialScreen(props) {
    const [keyword, setKeyword] = useState('');

    return (
        <AppContainer minimal>
            <View>
                <View style={{
                    backgroundColor: '#3e67d6',
                    borderBottomLeftRadius: 52
                }}>
                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'white',
                        fontSize: 24,
                        marginStart: 40,
                        marginTop: 16,
                        marginBottom: 32,
                    }}>
                        Search Material Learning
                    </Text>
                </View>

                <View style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    marginHorizontal: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    borderRadius: 24,
                    elevation: 2,
                }}>
                    <Ionicons name={keyword ? 'close' : 'search'} color={keyword ? 'grey' : '#e3e3e3'} size={25}
                              onPress={() => {
                                  if (keyword) setKeyword('')
                              }}/>

                    <TextInput
                        onChangeText={(keyword) => setKeyword(keyword)}
                        value={keyword}
                        style={{
                            fontFamily: 'Montserrat-Regular',
                            marginLeft: 20
                        }}
                        placeholder={'Search Material Learning'}
                    />
                </View>
            </View>
        </AppContainer>
    )
}