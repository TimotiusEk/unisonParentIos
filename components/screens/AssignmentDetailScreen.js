import React, {useState, useRef, useEffect} from 'react';
import AppContainer from '../reusables/AppContainer';
import {ScrollView, View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from "moment";

export default function AssignmentDetailScreen(props) {
  const assignment = props.navigation.getParam('assignment');

  useEffect(() => {
      console.log(assignment)
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
              source={require('../../assets/images/ic_assignment.png')}
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
              {!assignment.file_path_student
                ? '-'
                : assignment.file_path_student.split('/')[
                    assignment.file_path_student.split('/').length - 1
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
              {!assignment.file_path_student2
                ? '-'
                : assignment.file_path_student2.split('/')[
                    assignment.file_path_student2.split('/').length - 1
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
              {!assignment.file_path_student3
                ? '-'
                : assignment.file_path_student3.split('/')[
                    assignment.file_path_student3.split('/').length - 1
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

            <Text style={{fontFamily: 'Avenir'}}>
              {moment.utc(assignment.assignment_date).format('DD MMM')}
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
              {!assignment.file_path
                ? 'No data'
                : assignment.file_path.split('/')[
                    assignment.file_path.split('/').length - 1
                  ]}
            </Text>
          </View>

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

            <Text style={{fontFamily: 'Avenir'}}>
              {assignment.end_date}
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
              {!assignment.file_path
                ? 'No data'
                : assignment.file_path.split('/')[
                    assignment.file_path.split('/').length - 1
                  ]}
            </Text>
          </View>

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

            <Text style={{fontFamily: 'Avenir'}}>
              {assignment.class_name}
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
             {assignment.type}
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

            <Text style={{fontFamily: 'Avenir'}}>{assignment.description}</Text>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}
