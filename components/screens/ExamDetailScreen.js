import React, {useState, useRef, useEffect} from 'react';
import AppContainer from '../reusables/AppContainer';
import {ScrollView, View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function ExamDetailScreen(props) {
  const exam = props.navigation.getParam('exam');

  return (
    <AppContainer navigation={props.navigation}>
      <ScrollView>
        <View style={{backgroundColor: '#627FC1'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingStart: 16,
              // marginTop: 16,
              marginBottom: 16,
              paddingTop: 15,
              backgroundColor: '#627FC1',
            }}>
            <MaterialCommunityIcons
              name={'arrow-left'}
              size={28}
              color={'white'}
              onPress={() => props.navigation.goBack(null)}
            />

            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 24,
                marginLeft: 16,
                color: 'white',
              }}>
              Exam
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingStart: 16,
              backgroundColor: '#627FC1',
            }}>
            <MaterialCommunityIcons
              name={'arrow-left'}
              size={28}
              color={'white'}
              style={{opacity: 0}}
            />

            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 18,
                marginLeft: 16,
                color: 'white',
                flex: 1,
              }}>
              {exam.exam}
            </Text>

            <Image
              source={require('../../assets/images/ic_exam_activity.png')}
              style={{marginEnd: 8}}
            />
          </View>
        </View>

        <View>
          <Text
            style={{
              marginTop: 24,
              marginStart: 24,
              fontFamily: 'Montserrat-Bold',
              fontSize: 12,
            }}>
            File Upload
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <Ionicons
              name="link"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>
              {!exam.file_path_student
                ? '-'
                : exam.file_path_student.split('/')[
                    exam.file_path_student.split('/').length - 1
                  ]}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <Ionicons
              name="link"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>
              {!exam.file_path_student2
                ? '-'
                : exam.file_path_student2.split('/')[
                    exam.file_path_student2.split('/').length - 1
                  ]}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <Ionicons
              name="link"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>
              {!exam.file_path_student3
                ? '-'
                : exam.file_path_student3.split('/')[
                    exam.file_path_student3.split('/').length - 1
                  ]}
            </Text>
          </View>

          <Text
            style={{
              marginTop: 24,
              marginStart: 24,
              fontFamily: 'Montserrat-Bold',
              fontSize: 12,
            }}>
            Exam Detail
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <MaterialCommunityIcons
              name="clock-outline"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>{exam.exam_date}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <MaterialCommunityIcons
              name="clock-outline"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>
              {exam.start_time} - {exam.end_time}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <Ionicons
              name="attach"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>
              {!exam.file_path
                ? '-'
                : exam.file_path.split('/')[
                    exam.file_path.split('/').length - 1
                  ]}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <MaterialCommunityIcons
              name="clipboard-text"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>
              Min Score : {exam.min_score}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <MaterialCommunityIcons
              name="clipboard-text"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>
              Score : {exam.score ? exam.score : 'No data'}
            </Text>
          </View>

          <Text
            style={{
              marginTop: 24,
              marginStart: 24,
              fontFamily: 'Montserrat-Bold',
              fontSize: 12,
            }}>
            Description
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <MaterialIcons
              name="format-align-left"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: 'Avenir'}}>{exam.subject}</Text>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}
