import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
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
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
const {config, fs} = RNFetchBlob;
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker/src';
import DocumentPicker from 'react-native-document-picker';

export default function AgendaScreen(props) {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [myChildren, setMyChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState({});
  const [selectedSubject, setSelectedSubject] = useState({});
  const [isLoadingShown, setLoadingShown] = useState(false);
  const rbSheetRef = useRef(null);
  const uploadRbSheetRef = useRef(null);
  const [select, setSelect] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartDateTemp, setSelectedStartDateTemp] = useState(null);
  const [selectedEndDateTemp, setSelectedEndDateTemp] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [assignmentScores, setAssignmentScores] = useState([]);
  const [message, setMessage] = useState(null);
  const [uploadFileIdx, setUploadFileIdx] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState({});
  const [note, setNote] = useState(null);

  const colors = [
    '#B968C7',
    '#FFB64D',
    '#EF6392',
    '#64B5F6',
    '#D4E056',
    '#9675CE',
  ];

  useEffect(() => {
    if (selectedChild.student_id) {
      if (selectedSubject.subject_id) {
        getAssignment();
        getAssignmentScore();
      }
    } else getMyChildren();
  }, [selectedChild, selectedSubject, selectedStartDate, selectedEndDate]);

  const getAssignmentScore = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    new Promise(
      await HttpRequest.set(
        '/assignments/student',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          class_id: selectedChild.class_id,
          pages: 1,
          subject_id: selectedSubject.subject_id,
          student_id: selectedChild.student_id,
        }),
      ),
    )
      .then((res) => {
        console.log('res', res);

        setAssignmentScores(res.data);
      })
      .catch((err) => {
        setMessage(err.msg);

        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  };

  const getAssignment = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    new Promise(
      await HttpRequest.set(
        '/assignments',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          class_id: selectedChild.class_id,
          pages: 1,
          // subject_id: selectedSubject.subject_id,
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
      .then((res) => setAssignments(res.data))
      .catch((err) => console.log(err));
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
    <AppContainer navigation={props.navigation} message={message}>
      <ScrollView>
        <RBSheet
          ref={uploadRbSheetRef}
          closeOnDragDown={true}
          onClose={() => setUploadFileIdx(null)}
          height={350}
          openDuration={250}>
          <View style={{margin: 8, padding: 8}}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Montserrat-Bold',
              }}>
              Upload File
            </Text>

            {uploadFileIdx === null && (
              <View style={{flexDirection: 'row', marginTop: 16}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setUploadFileIdx(1);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="attach" size={24} color="#9EA3BA" />

                    <Text
                      style={{
                          fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                        fontSize: 18,
                        marginLeft: 4,
                      }}>
                      Upload File
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text
                  style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir', fontSize: 18, marginLeft: 12}}>
                  {selectedAssignment.file_path_student
                    ? selectedAssignment.file_path_student.split('/')[
                        selectedAssignment.file_path_student.split('/').length -
                          1
                      ]
                    : 'File 1 no data'}
                </Text>
              </View>
            )}

            {uploadFileIdx === null && (
              <View style={{flexDirection: 'row', marginTop: 16}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setUploadFileIdx(2);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="attach" size={24} color="#9EA3BA" />

                    <Text
                      style={{
                          fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                        fontSize: 18,
                        marginLeft: 4,
                      }}>
                      Upload File
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text
                  style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir', fontSize: 18, marginLeft: 12}}>
                  {selectedAssignment.file_path_student2
                    ? selectedAssignment.file_path_student2.split('/')[
                        selectedAssignment.file_path_student2.split('/')
                          .length - 1
                      ]
                    : 'File 2 no data'}
                </Text>
              </View>
            )}

            {uploadFileIdx === null && (
              <View style={{flexDirection: 'row', marginTop: 16}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setUploadFileIdx(3);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="attach" size={24} color="#9EA3BA" />

                    <Text
                      style={{
                          fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                        fontSize: 18,
                        marginLeft: 4,
                      }}>
                      Upload File
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text
                  style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir', fontSize: 18, marginLeft: 12}}>
                  {selectedAssignment.file_path_student3
                    ? selectedAssignment.file_path_student3.split('/')[
                        selectedAssignment.file_path_student3.split('/')
                          .length - 1
                      ]
                    : 'File 3 no data'}
                </Text>
              </View>
            )}

            {uploadFileIdx ? (
              <TextInput
                placeholder={'Assignment Note'}
                value={note}
                onChangeText={(note) => setNote(note)}
                style={{
                  borderBottomWidth: 1,
                  marginTop: 24,
                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                  fontWeight: '500',
                }}
              />
            ) : null}

            {uploadFileIdx ? (
              <Text
                style={{
                  marginTop: 16,
                  padding: 12,
                  fontSize: 18,
                    fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir'
                }}>
                Choose your Photo or File
              </Text>
            ) : null}

            {uploadFileIdx ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  ImagePicker.launchImageLibrary(
                    {
                      mediaType: 'photo',
                    },
                    async (response) => {
                      const res = await fetch(response.uri);

                      const blob = await res.blob();

                      const file = new File([blob], response.fileName, {
                        type: response.type,
                      });

                      let user = await AsyncStorage.getItem('user');
                      user = JSON.parse(user);

                      const data = new FormData();
                      data.append('access_token', user.access_token);
                      data.append(
                        'assignment_id',
                        selectedAssignment.assignment_id,
                      );
                      data.append('student_id', selectedChild.student_id);
                      data.append('file', file);
                      data.append('file1', uploadFileIdx === 1);
                      data.append('file2', uploadFileIdx === 2);
                      data.append('file3', uploadFileIdx === 3);
                      data.append('note', note);

                      fetch('https://api.unison.id/uploadResult/assignment', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                        body: data,
                      })
                        .then((response) => response.json())
                        .then((res) => {
                          getAssignment();
                          uploadRbSheetRef.current.close();
                          setMessage(res.msg);

                          setTimeout(() => {
                            setMessage(null);
                          }, 3000);
                        })
                        .catch((err) => {
                          console.log('err', err);

                          uploadRbSheetRef.current.close();
                          setMessageColor('red');
                          setMessage(res.msg);

                          setTimeout(() => {
                            setMessageColor(null);
                            setMessage(null);
                          }, 3000);
                        });
                    },
                  );
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 16,
                    padding: 12,
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="image"
                    size={24}
                    color={'#757575'}
                    style={{marginRight: 16}}
                  />
                  <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir', fontSize: 18}}>
                    Take from gallery
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ) : null}

            {uploadFileIdx ? (
              <TouchableWithoutFeedback
                onPress={async () => {
                  let user = await AsyncStorage.getItem('user');
                  user = JSON.parse(user);

                  try {
                    const response = await DocumentPicker.pick({});

                    const res = await fetch(response.uri);

                    const blob = await res.blob();

                    const file = new File([blob], response.name, {
                      type: response.type,
                    });

                    const data = new FormData();
                    data.append('access_token', user.access_token);
                    data.append(
                      'assignment_id',
                      selectedAssignment.assignment_id,
                    );
                    data.append('student_id', selectedChild.student_id);
                    data.append('file', file);
                    data.append('file1', uploadFileIdx === 1);
                    data.append('file2', uploadFileIdx === 2);
                    data.append('file3', uploadFileIdx === 3);
                    data.append('note', note);

                    fetch('https://api.unison.id/uploadResult/assignment', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                      body: data,
                    })
                      .then((response) => response.json())
                      .then((res) => {
                        getAssignment();
                        uploadRbSheetRef.current.close();

                        setMessage(res.msg);

                        setTimeout(() => {
                          setMessage(null);
                        }, 3000);
                      })
                      .catch((err) => {
                        console.log('err', err);

                        uploadRbSheetRef.current.close();
                        setMessageColor('red');
                        setMessage(res.msg);

                        setTimeout(() => {
                          setMessageColor(null);
                          setMessage(null);
                        }, 3000);
                      });
                  } catch (e) {
                    console.log('e', e);
                  }
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 16,
                    padding: 12,
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="attach"
                    size={24}
                    color="#9EA3BA"
                    style={{marginRight: 16}}
                  />
                  <Text style={{fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir', fontSize: 18}}>
                    Upload File (apart from photos)
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
        </RBSheet>

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
              source={require('../../assets/images/ic_assignment_2.png')}
            />
          </View>
        </View>

        <View
          style={{flexDirection: 'row', marginTop: 15, marginHorizontal: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>Assignment</Text>
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
              ASSIGNMENT NOW
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
              MY SCORE
            </Text>
          </TouchableOpacity>
        </View>

        <Carousel
          ref={carouselRef}
          data={[{idx: 0}, {idx: 1}]}
          renderItem={(item) => {
            if (item.index === 0) {
              return (
                <ScrollView style={{marginTop: 25}}>
                  {assignments.length === 0 ? (
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          textAlign: 'center',
                          marginTop: 20,
                        }}>
                        None Of Your Data{'\n'}at this time
                      </Text>
                    </View>
                  ) : (
                    assignments.map((assignment) => {
                      return (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            props.navigation.navigate(
                              'AssignmentDetailScreen',
                              {assignment},
                            )
                          }>
                          <View
                            style={{
                              shadowOffset: {width: 0, height: 0},
                              elevation: 3,
                              shadowOpacity: 0.15,
                              shadowRadius: 5,
                              backgroundColor: 'white',
                              marginHorizontal: 15,
                              borderRadius: 8,
                              flexDirection: 'row',
                              marginBottom: 15,
                            }}>
                            <View
                              style={{
                                width: 8,
                                backgroundColor:
                                  colors[
                                    Math.floor(Math.random() * colors.length)
                                  ],
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                              }}
                            />

                            <View
                              style={{
                                alignItems: 'center',
                                marginStart: 24,
                                marginTop: 12,
                                marginBottom: 20,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Montserrat-Medium',
                                  fontSize: 12,
                                  color: '#878787',
                                }}>
                                {moment
                                  .utc(assignment.assignment_date)
                                  .format('DD MMM')}
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Montserrat-Medium',
                                  fontSize: 12,
                                  color: '#878787',
                                }}>
                                -
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Montserrat-Medium',
                                  fontSize: 12,
                                  color: '#878787',
                                }}>
                                {moment
                                  .utc(assignment.end_date)
                                  .format('DD MMM')}
                              </Text>
                            </View>

                            <View
                              style={{
                                marginStart: 16,
                                marginTop: 8,
                                flex: 1,
                              }}>
                              <Text style={{fontFamily: 'Poppins-Bold'}}>
                                {assignment.subject}
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Poppins-Regular',
                                  fontSize: 12,
                                }}>
                                {assignment.assignment}
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Poppins-Regular',
                                  fontSize: 12,
                                }}>
                                {assignment.file_path_student
                                  ? 'Submit'
                                  : 'Unsubmit'}
                              </Text>
                            </View>

                            {assignment.file_path && (
                              <TouchableWithoutFeedback
                                onPress={(e) => {
                                  e.stopPropagation();

                                  let PictureDir =
                                    Platform.OS === 'ios'
                                      ? fs.dirs.DocumentDir
                                      : fs.dirs.PictureDir;
                                  let options = {
                                    fileCache: true,
                                    path:
                                      PictureDir +
                                      `/${
                                        assignment.file_path.split('/')[
                                          assignment.file_path.split('/')
                                            .length - 1
                                        ]
                                      }`,
                                    addAndroidDownloads: {
                                      useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                                      notification: true,
                                      path: `${
                                        PictureDir + assignment.file_path.split('/')[
                                          assignment.file_path.split('/')
                                            .length - 1
                                        ]
                                      }`,
                                      description:
                                        'Downloading assignment file',
                                    },
                                  };

                                  console.log(assignment.file_path);

                                  config(options)
                                    .fetch(
                                      'GET',
                                        assignment.file_path
                                    )
                                    .then((res) => {
                                        console.log('res', res)

                                      if (Platform.OS === 'ios') {
                                        console.log(res.data);

                                        RNFetchBlob.ios.openDocument(res.data);
                                      }
                                    })
                                    .catch((err) => console.log('err', err));
                                }}>
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
                              </TouchableWithoutFeedback>
                            )}

                            <TouchableWithoutFeedback
                              onPress={(e) => {
                                e.stopPropagation();
                                setNote(null);
                                setSelectedAssignment(assignment);
                                uploadRbSheetRef.current.open();
                              }}>
                              <Image
                                source={require('../../assets/images/ic_upload.png')}
                                style={{
                                  width: 28,
                                  height: 28,
                                  marginTop: 16,
                                  marginEnd: 16,
                                  marginStart: 8,
                                }}
                              />
                            </TouchableWithoutFeedback>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })
                  )}
                </ScrollView>
              );
            } else {
              return (
                <ScrollView style={{marginTop: 25}}>
                  {assignmentScores.length === 0 ? (
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          textAlign: 'center',
                          marginTop: 20,
                        }}>
                        None Of Your Data{'\n'}at this time
                      </Text>
                    </View>
                  ) : (
                    assignmentScores.map((score) => {
                      return (
                        <View
                          style={{
                            borderColor: '#e0e0e0',
                            borderRadius: 8,
                            borderWidth: 1,
                            marginHorizontal: 15,
                            flexDirection: 'row',
                            marginBottom: 10,
                          }}>
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                marginStart: 16,
                                marginTop: 16,
                                fontFamily: 'Avenir',
                                fontWeight: '700',
                                fontSize: 12,
                              }}>
                              {score.assignment}
                            </Text>

                            <View
                              style={{
                                flexDirection: 'row',
                                marginStart: 16,
                                marginTop: 8,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Avenir',
                                  fontSize: 10,
                                  color: '#818181',
                                }}>
                                {score.subject}
                              </Text>
                              <Text
                                style={{
                                  marginLeft: 24,
                                  fontFamily: 'Avenir',
                                  fontSize: 10,
                                  color: '#818181',
                                }}>
                                {score.class_name}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              marginTop: 16,
                              marginEnd: 16,
                              alignItems: 'flex-end',
                              marginBottom: 16,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Avenir',
                                fontSize: 12,
                                color: '#818181',
                              }}>
                              {moment
                                .utc(score.assignment_date)
                                .format('DD MMM')}
                            </Text>

                            <Text style={{fontFamily: 'Montserrat-Bold'}}>
                              {score.score}
                            </Text>
                            {score.score !== "0" && (
                              <Text
                                style={{
                                  fontFamily: 'Avenir',
                                  fontSize: 10,
                                  color:
                                    score.score >= score.min_score
                                      ? '#1541BB'
                                      : 'red',
                                }}>
                                {score.score >= score.min_score
                                  ? 'Passed'
                                  : 'Not Passed'}
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    })
                  )}
                </ScrollView>
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
