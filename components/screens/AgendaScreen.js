import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppContainer from '../reusables/AppContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import HttpRequest from '../../util/HttpRequest';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import CalendarPicker from 'react-native-calendar-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-snap-carousel';

export default function AgendaScreen(props) {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [myChildren, setMyChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState({});
  const [selectedSubject, setSelectedSubject] = useState({});
  const [isLoadingShown, setLoadingShown] = useState(false);
  const rbSheetRef = useRef(null);
  const [select, setSelect] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartDateTemp, setSelectedStartDateTemp] = useState(null);
  const [selectedEndDateTemp, setSelectedEndDateTemp] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [agendas, setAgendas] = useState([]);

  const colors = [
    '#B968C7',
    '#FFB64D',
    '#EF6392',
    '#64B5F6',
    '#D4E056',
    '#9675CE',
  ];

  const dayOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Friday',
  ];

  useEffect(() => {
    getMyChildren();
  }, []);

  const getSchedules = async (child) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    new Promise(
      await HttpRequest.set(
        '/scheduleclasses/myschedule',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          class_id: child.class_id,
          numberOfRows: 10,
          student_id: child.student_id,
        }),
      ),
    )
      .then((res) => {
        if (res.result) {
          setSchedules(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getAgendas = async (subject) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    new Promise(
      await HttpRequest.set(
        '/agendas/class/list',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          class_id: selectedChild.class_id,
          student_id: selectedChild.student_id,
          subject_id: subject.subject_id,
          keyword: '',
          pages: 1,
        }),
      ),
    )
      .then((res) => {
        console.log('res agenda', res);

        if (res.result) {
          setAgendas(res.data);
        }
      })
      .catch((err) => console.log('err agenda', err));
  };

  const getMyChildren = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    let myChildren = await AsyncStorage.getItem('myChildren');

    if (!myChildren) {
      new Promise(
        await HttpRequest.set(
          '/students/mychildren',
          'POST',
          JSON.stringify({
            access_token: user.access_token,
          }),
        ),
      )
        .then(async (res) => {
          if (res.data.length > 0) {
            setSelectedChild(res.data[0]);

            getSchedules(res.data[0]);
          }

          setMyChildren(res.data);

          await AsyncStorage.setItem('myChildren', JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (JSON.parse(myChildren).length > 0) {
        setSelectedChild(JSON.parse(myChildren)[0]);
        getSchedules(JSON.parse(myChildren)[0]);
      }

      setMyChildren(JSON.parse(myChildren));
    }
  };

  const fetchAndOpenSheet = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    setSelect('subject');
    setLoadingShown(true);

    new Promise(
      await HttpRequest.set(
        '/subjects/class',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          class_id: selectedChild.class_id,
        }),
      ),
    )
      .then((res) => {
        setLoadingShown(false);

        setSubjects(res.data);
        rbSheetRef.current.open();
      })
      .catch((err) => {
        setLoadingShown(false);

        console.log('err', err);
      });
  };

  return (
    <AppContainer navigation={props.navigation}>
      <ScrollView>
        <RBSheet
          ref={rbSheetRef}
          closeOnDragDown={true}
          height={select === 'date' ? 500 : 600}
          openDuration={250}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: select === 'date' ? 0 : 15,
                marginTop: 8,
                marginBottom: 15,
                fontSize: 16,
                textAlign: select === 'date' ? 'center' : 'left',
              }}>
              {select === 'class'
                ? 'Class Children'
                : select === 'subject'
                ? 'Subject'
                : 'Selected Date & Times'}
            </Text>

            {select !== 'date' && (
              <View
                style={{width: '100%', height: 1, backgroundColor: '#f3f3f3'}}
              />
            )}

            <ScrollView>
              {select === 'date' && (
                <View style={{flex: 1}}>
                  <CalendarPicker
                    selectedDayColor={'#3e67d6'}
                    selectedDayTextColor={'white'}
                    allowRangeSelection={true}
                    previousComponent={
                      <AntDesign name={'caretleft'} color={'#3e67d6'} />
                    }
                    nextComponent={
                      <AntDesign name={'caretright'} color={'#3e67d6'} />
                    }
                    onDateChange={(date, type) => {
                      if (type === 'END_DATE') {
                        setSelectedEndDateTemp(date);
                      } else {
                        setSelectedStartDateTemp(date);
                      }
                    }}
                  />

                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedStartDate(selectedStartDateTemp);
                      setSelectedEndDate(selectedEndDateTemp);
                      rbSheetRef.current.close();
                      console.log('start', selectedStartDateTemp);
                      console.log('end', selectedEndDateTemp);
                    }}>
                    <View
                      style={{
                        backgroundColor: '#3e67d6',
                        paddingHorizontal: 32,
                        paddingVertical: 15,
                        borderRadius: 8,
                        marginTop: 30,
                        alignSelf: 'flex-end',
                        marginRight: 15,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        OK
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )}

              {select === 'subject' &&
                subjects.map((subject) => {
                  return (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setSelectedSubject(subject);

                          getAgendas(subject);

                          rbSheetRef.current.close();
                        }}>
                        <View style={{padding: 15}}>
                          <Text
                            style={{
                              fontFamily: 'Montserrat-Regular',
                              fontSize: 16,
                            }}>
                            {subject.subject}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <View
                        style={{
                          width: '100%',
                          height: 1,
                          backgroundColor: '#f3f3f3',
                        }}
                      />
                    </>
                  );
                })}

              {select === 'class' &&
                myChildren.map((child) => {
                  return (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setSelectedChild(child);
                          getSchedules(child);
                          setSelectedSubject({});
                          fetchAndOpenSheet();
                        }}>
                        <View style={{padding: 15}}>
                          <Text
                            style={{
                              fontFamily: 'Montserrat-Regular',
                              fontSize: 16,
                            }}>
                            {child.student_name} - {child.class_name}
                          </Text>

                          <Text
                            style={{
                              fontFamily: 'Montserrat-Regular',
                              fontSize: 13,
                              marginTop: 10,
                              color: 'grey',
                            }}>
                            {child.school_name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Montserrat-Regular',
                              fontSize: 13,
                              marginTop: 2,
                              color: 'grey',
                            }}>
                            {child.class_name}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <View
                        style={{
                          width: '100%',
                          height: 1,
                          backgroundColor: '#f3f3f3',
                        }}
                      />
                    </>
                  );
                })}
            </ScrollView>
          </View>
        </RBSheet>

        <View style={{backgroundColor: '#627FC1'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingStart: 16,
              // marginTop: 16,
              marginBottom: 16,
              paddingTop: 15,
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
              marginHorizontal: 24,
              margin: 8,
              marginTop: 16,
              flexDirection: 'row',
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setSelect('class');
                rbSheetRef.current.open();
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 4,
                    marginStart: 8,
                    marginTop: 4,
                    flexDirection: 'row',
                  }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: 'grey',
                      marginStart: 16,
                      marginTop: 8,
                      marginBottom: 8,
                      flex: 1,
                    }}>
                    {selectedChild.student_name} - {selectedChild.class_name}
                  </Text>

                  <Fontisto
                    name={'angle-down'}
                    style={{
                      color: 'grey',
                      marginEnd: 8,
                      marginTop: 8,
                      marginBottom: 8,
                    }}
                    size={16}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                if (selectedChild) {
                  fetchAndOpenSheet();
                } else {
                  setSelect('class');
                  rbSheetRef.current.open();
                }
              }}>
              <View style={{flex: 1, marginTop: 20}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 4,
                    marginStart: 8,
                    marginTop: 4,
                    flexDirection: 'row',
                  }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: 'grey',
                      marginStart: 16,
                      marginTop: 8,
                      marginBottom: 8,
                      flex: 1,
                    }}>
                    {selectedSubject && selectedSubject.subject
                      ? selectedSubject.subject
                      : 'Subject'}
                  </Text>

                  <Fontisto
                    name={'angle-down'}
                    style={{
                      color: 'grey',
                      marginEnd: 8,
                      marginTop: 8,
                      marginBottom: 8,
                    }}
                    size={16}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <Image
              source={require('../../assets/images/ic_agenda_activity.png')}
            />
          </View>
        </View>

        {activeSlide === 0 && (
          <View
            style={{flexDirection: 'row', marginTop: 15, marginHorizontal: 15}}>
            <View style={{flex: 1}}>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>Agenda</Text>
              <Text
                style={{
                  color: '#425AC2',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {selectedStartDate
                  ? moment(selectedStartDate).format('DD MMM YYYY')
                  : moment().format('DD MMM YYYY')}{' '}
                {selectedEndDate &&
                  ` - ${moment(selectedEndDate).format('DD MMM YYYY')}`}
              </Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => {
                rbSheetRef.current.open();

                setSelect('date');
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: '#f3f3f3',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                    textDecorationLine: 'underline',
                  }}>
                  {' '}
                  Choose Date
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}

        <View
          style={{
            backgroundColor: '#f2f2f2',
            marginHorizontal: 15,
            marginTop: 20,
            paddingVertical: 20,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => carouselRef.current.snapToItem(0)}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                color: activeSlide === 0 ? 'black' : 'grey',
              }}>
              AGENDA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => carouselRef.current.snapToItem(1)}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: activeSlide === 1 ? 'black' : 'grey',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
              }}>
              MY SCHEDULE
            </Text>
          </TouchableOpacity>
        </View>

        <Carousel
          ref={carouselRef}
          data={[{idx: 0}, {idx: 1}]}
          renderItem={(item) => {
            console.log(item);

            if (item.index === 0) {
              return (
                <ScrollView
                  contentContainerStyle={{marginHorizontal: 36, marginTop: 25}}>
                  <View>
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                      <Text
                        style={{
                          width: 70,
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 12,
                        }}>
                        Time
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 12,
                        }}>
                        Agenda
                      </Text>
                    </View>
                    {agendas.length === 0 ? (
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          textAlign: 'center',
                        }}>
                        None Of Your Data{'\n'}at this time
                      </Text>
                    ) : (
                      agendas.map((agenda) => {
                        return (
                          <TouchableWithoutFeedback onPress={() => {
                            props.navigation.navigate('AgendaDetailScreen', {agenda})
                          }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginBottom: 30,
                                paddingLeft: 30,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  paddingHorizontal: 15,
                                  paddingVertical: 10,
                                  borderRadius: 8,
                                  backgroundColor:
                                    colors[
                                      Math.floor(Math.random() * colors.length)
                                    ],
                                  elevation: 3,
                                  shadowColor: '#000',
                                  shadowOffset: {width: 0, height: 2},
                                  shadowOpacity: 0.25,
                                  shadowRadius: 2,
                                }}>
                                <Text style={{fontFamily: 'Avenir'}}>
                                  {agenda.agenda}
                                </Text>
                                <View style={{marginTop: 6}}>
                                  <Text
                                    style={{
                                      fontFamily: 'Avenir',
                                      color: 'white',
                                    }}>
                                    {moment.utc(agenda.class_date).format('DD MMM YYYY, HH:mm')}  {agenda.end_date && '-' + moment.utc(agenda.end_date).format('HH:mm')}
                                  </Text>

                                  <Text
                                    style={{
                                      fontFamily: 'Avenir',
                                      color: 'white',
                                    }}>
                                    {agenda.class_name} ({agenda.subject})
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      })
                    )}
                  </View>
                </ScrollView>
              );
            } else {
              return (
                <View style={{marginHorizontal: 36, marginTop: 25}}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          width: 70,
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 12,
                        }}>
                        Day
                      </Text>
                    </View>
                    {schedules.length === 0 ? (
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          textAlign: 'center',
                          marginTop: 20,
                        }}>
                        None Of Your Data{'\n'}at this time
                      </Text>
                    ) : (
                      <ScrollView contentContainerStyle={{paddingTop: 20}}>
                        {schedules.map((schedule) => {
                          return (
                            <View
                              style={{flexDirection: 'row', marginBottom: 30}}>
                              <Text
                                style={{
                                  width: 70,
                                  fontFamily: 'Montserrat-Regular',
                                  fontSize: 12,
                                  marginTop: 10,
                                }}>
                                {dayOfWeek[schedule.day_of_week - 1]}
                              </Text>

                              <View
                                style={{
                                  flex: 1,
                                  paddingHorizontal: 15,
                                  paddingVertical: 10,
                                  borderRadius: 8,
                                  backgroundColor:
                                    colors[
                                      Math.floor(Math.random() * colors.length)
                                    ],
                                  elevation: 3,
                                  shadowColor: '#000',
                                  shadowOffset: {width: 0, height: 2},
                                  shadowOpacity: 0.25,
                                  shadowRadius: 2,
                                }}>
                                <Text style={{fontFamily: 'Avenir'}}>
                                  {schedule.subject}
                                </Text>
                                <View
                                  style={{flexDirection: 'row', marginTop: 6}}>
                                  <Text
                                    style={{
                                      fontFamily: 'Avenir',
                                      color: 'white',
                                    }}>
                                    {schedule.start_time}
                                  </Text>

                                  <Text
                                    style={{
                                      fontFamily: 'Avenir',
                                      color: 'white',
                                      marginLeft: 10,
                                    }}>
                                    {schedule.teacher_name}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      </ScrollView>
                    )}
                  </View>
                </View>
              );
            }
          }}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={(idx) => setActiveSlide(idx)}
        />
      </ScrollView>
    </AppContainer>
  );
}
