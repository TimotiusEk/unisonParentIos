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

export default function AgendaDetailScreen(props) {
  const agenda = props.navigation.getParam('agenda');

  console.log('agenda', agenda);

  const checkUrlIsImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
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
              Agenda
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
              {agenda.agenda}
            </Text>

            <Image
              source={require('../../assets/images/ic_agenda_activity.png')}
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
            Agenda Detail
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
              {moment.utc(agenda.class_date).format('DD MMM YYYY, HH:mm')}{' '}
              {agenda.end_date &&
                '-' + moment.utc(agenda.end_date).format('HH:mm')}
            </Text>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              if (agenda.url_video_meeting)
                Linking.openURL(agenda.url_video_meeting);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <MaterialIcons
                name="location-on"
                style={{marginStart: 24, marginEnd: 16}}
                size={20}
                color="#9EA3BA"
              />

              <Text style={{fontFamily: 'Avenir'}}>
                {agenda.url_video_meeting
                  ? agenda.url_video_meeting
                  : 'No data'}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          {agenda.url_video_meeting2 && (
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL(agenda.url_video_meeting2)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <MaterialIcons
                  name="location-on"
                  style={{marginStart: 24, marginEnd: 16}}
                  size={20}
                  color="#9EA3BA"
                />

                <Text style={{fontFamily: 'Avenir'}}>
                  {agenda.url_video_meeting2}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}

          <TouchableWithoutFeedback
            onPress={() => {
              if (agenda.file_path && checkUrlIsImage(agenda.file_path)) {
                props.navigation.navigate('ImageViewerScreen', {
                  url: agenda.file_path,
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

              <Text style={{fontFamily: 'Avenir'}}>
                {!agenda.file_path
                  ? 'No data'
                  : agenda.file_path.split('/')[
                      agenda.file_path.split('/').length - 1
                    ]}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          {agenda.file_path2 && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (checkUrlIsImage(agenda.file_path2)) {
                  props.navigation.navigate('ImageViewerScreen', {
                    url: agenda.file_path2,
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

                <Text style={{fontFamily: 'Avenir'}}>
                  {
                    agenda.file_path2.split('/')[
                      agenda.file_path2.split('/').length - 1
                    ]
                  }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}

{agenda.file_path2 && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (checkUrlIsImage(agenda.file_path3)) {
                  props.navigation.navigate('ImageViewerScreen', {
                    url: agenda.file_path3,
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

                <Text style={{fontFamily: 'Avenir'}}>
                  {
                    agenda.file_path3.split('/')[
                      agenda.file_path3.split('/').length - 1
                    ]
                  }
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

            <Text style={{fontFamily: 'Avenir'}}>{agenda.class_name}</Text>
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

            <Text style={{fontFamily: 'Avenir', flex: 1, paddingEnd: 16}}>
              {agenda.description ? agenda.description : 'No data'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}
