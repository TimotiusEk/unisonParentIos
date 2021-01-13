import React, {useState, useRef, useEffect} from 'react';
import AppContainer from '../reusables/AppContainer';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function ExamDetailScreen(props) {
  const exam = props.navigation.getParam('exam');

  const checkUrlIsImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

    const checkUrlIsVideo = (url) => {
        return url.match(/\.(mp4)$/) != null;
    };

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

          <TouchableWithoutFeedback
            onPress={() => {
              if (
                exam.file_path_student &&
                checkUrlIsImage(exam.file_path_student)
              ) {
                props.navigation.navigate('ImageViewerScreen', {
                  url: exam.file_path_student,
                });
              } else if( exam.file_path_student &&
                  checkUrlIsVideo(exam.file_path_student)) {
                  props.navigation.navigate('VideoPlayerScreen', {
                      url: exam.file_path_student,
                  });
              }
            }}>
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

              <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>
                {!exam.file_path_student
                  ? '-'
                  : exam.file_path_student.split('/')[
                      exam.file_path_student.split('/').length - 1
                    ]}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          {exam.file_path_student2 && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (
                  exam.file_path_student2 &&
                  checkUrlIsImage(exam.file_path_student2)
                ) {
                  props.navigation.navigate('ImageViewerScreen', {
                    url: exam.file_path_student2,
                  });
                } else if( exam.file_path_student2 &&
                    checkUrlIsVideo(exam.file_path_student2)) {
                    props.navigation.navigate('VideoPlayerScreen', {
                        url: exam.file_path_student2,
                    });
                }
              }}>
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

                <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>
                  {!exam.file_path_student2
                    ? '-'
                    : exam.file_path_student2.split('/')[
                        exam.file_path_student2.split('/').length - 1
                      ]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}

          {exam.file_path_student3 && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (
                  exam.file_path_student3 &&
                  checkUrlIsImage(exam.file_path_student3)
                ) {
                  props.navigation.navigate('ImageViewerScreen', {
                    url: exam.file_path_student3,
                  });
                } else if( exam.file_path_student3 &&
                    checkUrlIsVideo(exam.file_path_student3)) {
                    props.navigation.navigate('VideoPlayerScreen', {
                        url: exam.file_path_student3,
                    });
                }
              }}>
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

                <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>
                  {!exam.file_path_student3
                    ? '-'
                    : exam.file_path_student3.split('/')[
                        exam.file_path_student3.split('/').length - 1
                      ]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}

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

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>{exam.exam_date}</Text>
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

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>
              {exam.start_time} - {exam.end_time}
            </Text>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              if (exam.file_path && checkUrlIsImage(exam.file_path)) {
                props.navigation.navigate('ImageViewerScreen', {
                  url: exam.file_path,
                });
              } else if( exam.file_path &&
                  checkUrlIsVideo(exam.file_path)) {
                  props.navigation.navigate('VideoPlayerScreen', {
                      url: exam.file_path,
                  });
              }
            }}>
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

              <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>
                {!exam.file_path
                  ? '-'
                  : exam.file_path.split('/')[
                      exam.file_path.split('/').length - 1
                    ]}
              </Text>
            </View>
          </TouchableWithoutFeedback>

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

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>
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

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>
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

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',}}>{exam.subject}</Text>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}
