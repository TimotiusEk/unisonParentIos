import React, {useState, useRef, useEffect} from 'react';
import AppContainer from '../reusables/AppContainer';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

export default function AssignmentDetailScreen(props) {
  const assignment = props.navigation.getParam('assignment');

  const checkUrlIsImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

    const checkUrlIsVideo = (url) => {
        return url.match(/\.(mp4)$/) != null;
    };

  useEffect(() => {
    console.log(assignment);
  }, []);

  return (
    <AppContainer navigation={props.navigation}>
      <ScrollView>
        <View style={{backgroundColor: '#1D3461'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingStart: 16,
              // marginTop: 16,
              marginBottom: 16,
              paddingTop: 15,
              backgroundColor: '#1D3461',
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
              Assignment
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingStart: 16,
              backgroundColor: '#1D3461',
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
              {assignment.assignment}
            </Text>

            <Image
              source={require('../../assets/images/ic_assignment_2.png')}
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
                assignment.file_path_student &&
                checkUrlIsImage(assignment.file_path_student)
              ) {
                props.navigation.navigate('ImageViewerScreen', {
                  url: assignment.file_path_student,
                });
              } else if( assignment.file_path_student &&
                  checkUrlIsVideo(assignment.file_path_student)) {
                  props.navigation.navigate('VideoPlayerScreen', {
                      url: assignment.file_path_student,
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

              <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
                {!assignment.file_path_student
                  ? '-'
                  : assignment.file_path_student.split('/')[
                      assignment.file_path_student.split('/').length - 1
                    ]}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          {assignment.file_path_student2 && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (
                  assignment.file_path_student2 &&
                  checkUrlIsImage(assignment.file_path_student2)
                ) {
                  props.navigation.navigate('ImageViewerScreen', {
                    url: assignment.file_path_student2,
                  });
                } else if( assignment.file_path_student2 &&
                    checkUrlIsVideo(assignment.file_path_student2)) {
                    props.navigation.navigate('VideoPlayerScreen', {
                        url: assignment.file_path_student2,
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

                <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
                  {!assignment.file_path_student2
                    ? '-'
                    : assignment.file_path_student2.split('/')[
                        assignment.file_path_student2.split('/').length - 1
                      ]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}

          {assignment.file_path_student3 && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (
                  assignment.file_path_student3 &&
                  checkUrlIsImage(assignment.file_path_student3)
                ) {
                  props.navigation.navigate('ImageViewerScreen', {
                    url: assignment.file_path_student3,
                  });
                } else if( assignment.file_path_student3 &&
                    checkUrlIsVideo(assignment.file_path_student3)) {
                    props.navigation.navigate('VideoPlayerScreen', {
                        url: assignment.file_path_student3,
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

                <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
                  {!assignment.file_path_student3
                    ? '-'
                    : assignment.file_path_student3.split('/')[
                        assignment.file_path_student3.split('/').length - 1
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
            Assignment Detail
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

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
              {moment.utc(assignment.assignment_date).format('DD MMM')}
            </Text>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              if (assignment.link)
                Linking.openURL('https://' + assignment.link);
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

              <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
                {!assignment.link ? 'No data' : 'https://' + assignment.link}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          {assignment.link2 ? (
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL('https://' + assignment.link2)}>
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

                <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
                  {!assignment.link2
                    ? 'No data'
                    : 'https://' + assignment.link2}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <MaterialIcons
              name="notifications-none"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>{assignment.end_date}</Text>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              if (
                assignment.file_path &&
                checkUrlIsImage(assignment.file_path)
              ) {
                props.navigation.navigate('ImageViewerScreen', {
                  url: assignment.file_path,
                });
              } else if (
                  assignment.file_path &&
                  checkUrlIsVideo(assignment.file_path)
              ) {
                  props.navigation.navigate('VideoPlayerScreen', {
                      url: assignment.file_path,
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

              <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
                {!assignment.file_path
                  ? 'No data'
                  : assignment.file_path.split('/')[
                      assignment.file_path.split('/').length - 1
                    ]}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          {assignment.file_path2 && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (checkUrlIsImage(assignment.file_path2)) {
                  props.navigation.navigate('ImageViewerScreen', {
                    url: assignment.file_path2,
                  });
                } else if (
                    assignment.file_path2 &&
                    checkUrlIsVideo(assignment.file_path2)
                ) {
                    props.navigation.navigate('VideoPlayerScreen', {
                        url: assignment.file_path2,
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

                <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
                  {!assignment.file_path2
                    ? 'No data'
                    : assignment.file_path2.split('/')[
                        assignment.file_path2.split('/').length - 1
                      ]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}

{assignment.file_path3 && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (checkUrlIsImage(assignment.file_path3)) {
                  props.navigation.navigate('ImageViewerScreen', {
                    url: assignment.file_path3,
                  });
                }  else if (
                    assignment.file_path3 &&
                    checkUrlIsVideo(assignment.file_path3)
                ) {
                    props.navigation.navigate('VideoPlayerScreen', {
                        url: assignment.file_path3,
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

                <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>
                  {!assignment.file_path3
                    ? 'No data'
                    : assignment.file_path3.split('/')[
                        assignment.file_path3.split('/').length - 1
                      ]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <MaterialIcons
              name="people"
              style={{marginStart: 24, marginEnd: 16}}
              size={20}
              color="#9EA3BA"
            />

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>{assignment.class_name}</Text>
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

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'}}>{assignment.type}</Text>
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

            <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir', flex: 1, paddingEnd: 16}}>
              {assignment.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}
