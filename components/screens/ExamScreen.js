import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
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

export default function ExamScreen(props) {
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
  const [exams, setExams] = useState([]);

  useEffect(() => {
    if (selectedChild.student_id) getExam();
    else getMyChildren();
  }, [selectedChild, selectedSubject, selectedStartDate, selectedEndDate]);

  const getExam = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    console.log('exam body', {
      access_token: user.access_token,
      class_id: selectedChild.class_id,
      pages: 1,
      subject_id: selectedSubject.subject_id,
      student_id: selectedChild.student_id,
      start_date: selectedStartDate
        ? moment(selectedStartDate).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD'),
      end_date: selectedEndDate
        ? moment(selectedEndDate).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD'),
    });

    new Promise(
      await HttpRequest.set(
        '/exams/student',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          class_id: selectedChild.class_id,
          subject_id: selectedSubject.subject_id,
          student_id: selectedChild.student_id,
          start_date: selectedStartDate
            ? moment(selectedStartDate).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
          end_date: selectedEndDate
            ? moment(selectedEndDate).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
        }),
      ),
    )
      .then((res) => {
        console.log('exams', res.data);
        setExams(res.data);
      })
      .catch((err) => console.log('exam err', err));
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

        <View style={{backgroundColor: '#B9C0DA'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingStart: 16,
              // marginTop: 16,
              marginBottom: 16,
              paddingTop: 15,
              backgroundColor: '#B9C0DA',
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
              source={require('../../assets/images/ic_exam_activity.png')}
            />
          </View>
        </View>

        <View
          style={{flexDirection: 'row', marginTop: 15, marginHorizontal: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>Exam</Text>
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

        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            marginHorizontal: 15,
            marginTop: 20,
            marginBottom: 5,
          }}>
          Summary
        </Text>

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 15,
            backgroundColor: '#E1E6F0',
            paddingHorizontal: 15,
            borderRadius: 8,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, paddingVertical: 20}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                marginBottom: 7,
              }}>
              Passed
            </Text>

            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                marginBottom: 7,
              }}>
              Not Passed
            </Text>

            <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12}}>
              Not Follow Exam
            </Text>
          </View>

          <Image
            source={require('../../assets/images/ic_exam_summary.png')}
            style={{width: 76, resizeMode: 'contain'}}
          />
        </View>

        {exams.map((exam) => {
          return (
            <TouchableWithoutFeedback onPress={() => {
              props.navigation.navigate('ExamDetailScreen', {exam})
            }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#2DBBBBBB',
                  borderRadius: 8,
                  margin: 8,
                }}>
                <View style={{flex: 1, marginStart: 16, marginTop: 16}}>
                  <Text style={{fontFamily: 'Avenir', fontWeight: '700'}}>
                    {exam.exam}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      marginTop: 8,
                      marginBottom: 8,
                      fontSize: 12,
                      color: '#878787',
                    }}>
                    {exam.subject}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#f2f2f2',
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginStart: 8,
                    marginEnd: 8,
                  }}>
                  <AntDesign name={'download'} size={20} />
                </View>
                <MaterialCommunityIcons
                  name={'file-upload-outline'}
                  size={24}
                  style={{alignSelf: 'center', marginStart: 8, marginEnd: 8}}
                />

                <Text
                  style={{
                    fontFamily: 'Avenir',
                    color: '#878787',
                    fontSize: 12,
                    marginTop: 10,
                    marginEnd: 10,
                  }}>
                  {moment.utc(exam.exam_date).format('DD MMM')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </AppContainer>
  );
}
