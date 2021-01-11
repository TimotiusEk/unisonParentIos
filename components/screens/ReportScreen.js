import React, {useEffect, useState, useRef} from 'react';
import AppContainer from '../reusables/AppContainer';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import HttpRequest from '../../util/HttpRequest';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
const {config, fs} = RNFetchBlob;

export default function ReportScreen(props) {
  const months = [
    'January',
    'February',
    'Marcy',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  const [selectedMonth, setSelectedMonth] = useState(moment().format('M'));
  const [activeSlide, setActiveSlide] = useState(0);
  const [myChildren, setMyChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState({});
  const rbSheetRef = useRef(null);
  const [select, setSelect] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const carouselRef = useRef(null);
  const [reportData, setReportData] = useState([]);
  const [reportHistory, setReportHistory] = useState([]);

  const getReport = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    new Promise(
      await HttpRequest.set(
        '/exams/report',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          student_id: selectedChild.student_id,
          month: selectedMonth,
        }),
      ),
    )
      .then((res) => {
        setReportData(res.msg);
      })
      .catch((err) => console.log(err));
  };

  const getReportHistory = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    new Promise(
      await HttpRequest.set(
        '/exams/report/all',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          student_id: selectedChild.student_id,
          pages: 1,
        }),
      ),
    )
      .then((res) => {
        setReportHistory(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (myChildren.length === 0) getMyChildren();

    if (selectedChild.student_name) {
      getReport();
      getReportHistory();
    }
  }, [selectedChild, selectedMonth]);

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

  return (
    <View style={{flex: 1, paddingBottom: 10}}>
      <RBSheet
        ref={rbSheetRef}
        closeOnDragDown={true}
        height={600}
        openDuration={250}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              marginLeft: 15,
              marginTop: 8,
              marginBottom: 15,
              fontSize: 16,
            }}>
            {select === 'class' ? 'Class Children' : 'Choose Month'}
          </Text>

          <View
            style={{width: '100%', height: 1, backgroundColor: '#f3f3f3'}}
          />

          <ScrollView>
            {select === 'month' &&
              months.map((month, idx) => {
                return (
                  <>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setSelectedMonth(idx + 1);

                        rbSheetRef.current.close();
                      }}>
                      <View style={{padding: 15}}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 16,
                          }}>
                          {month}
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
                        rbSheetRef.current.close();
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

      <View
        style={{
          backgroundColor: '#3e67d6',
          paddingTop: Platform.OS === 'ios' ? 50 : 0,
          paddingBottom: 90,
          borderBottomLeftRadius: 24,
          marginBottom: -60,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
          }}>
          <MaterialCommunityIcons
            name={'arrow-left'}
            size={28}
            style={{marginLeft: 16}}
            color={'white'}
            onPress={() => props.navigation.goBack(null)}
          />
          <Text
            style={{
              color: 'white',
              fontFamily: 'Montserrat-Bold',
              fontSize: 16,
              marginLeft: 10,
            }}>
            Report Card
          </Text>
        </View>

        <Text
          style={{
            color: 'white',
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            marginStart: 54,
          }}>
          Report
        </Text>

        <View
          style={{
            alignItems: 'flex-start',
            marginStart: 54,
            marginTop: 15,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => carouselRef.current.snapToItem(0)}>
            <View
              style={{
                backgroundColor: activeSlide === 0 ? 'white' : 'transparent',
                borderRadius: 100,
              }}>
              <Text
                style={{
                  color: activeSlide === 0 ? '#033AA8' : '#FFFFFF80',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 10,
                  paddingHorizontal: 16,
                  paddingVertical: 9,
                }}>
                CURRENT SEMESTER
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => carouselRef.current.snapToItem(1)}>
            <View
              style={{
                backgroundColor: activeSlide === 1 ? 'white' : 'transparent',
                borderRadius: 100,
              }}>
              <Text
                style={{
                  color: activeSlide === 1 ? '#033AA8' : '#FFFFFF80',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 10,
                  paddingHorizontal: 16,
                  paddingVertical: 9,
                }}>
                HISTORY
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Carousel
        data={[{}, {}]}
        renderItem={(item) => {
          if (item.index === 0) {
            return (
              <ScrollView>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    marginHorizontal: 15,
                    padding: 8,
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelect('class');
                      rbSheetRef.current.open();
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={require('../../assets/images/ic_user.png')}
                        style={{
                          width: 52,
                          height: 52,
                          marginStart: 16,
                          marginVertical: 8,
                        }}
                      />

                      <View
                        style={{
                          flex: 1,
                          marginVertical: 8,
                          marginHorizontal: 8,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 16,
                          }}>
                          {selectedChild.student_name}
                        </Text>

                        <Text
                          style={{
                            marginTop: 2,
                            marginBottom: 8,
                            fontFamily: 'Montserrat-Medium',
                            fontSize: 12,
                            color: '#818181',
                          }}>
                          {selectedChild.student_code}
                        </Text>
                      </View>

                      <View style={{marginVertical: 8, marginEnd: 8}}>
                        <Text
                          style={{fontFamily: 'Montserrat-Bold', fontSize: 12}}>
                          {selectedChild.class_name}
                        </Text>

                        <Text
                          style={{fontFamily: 'Montserrat-Bold', fontSize: 12}}>
                          {selectedChild.year}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                  {Array.isArray(reportHistory) && reportHistory.length > 0 && (
                    <TouchableWithoutFeedback
                      onPress={async () => {
                        let user = await AsyncStorage.getItem('user');
                        user = JSON.parse(user);

                        const date = new Date();

                        let PictureDir =
                          Platform.OS === 'ios'
                            ? fs.dirs.DocumentDir
                            : fs.dirs.PictureDir;
                        let options = {
                          fileCache: true,
                          path: PictureDir + `/Unison Report Class ${selectedChild.student_name}.pdf`,
                          addAndroidDownloads: {
                            useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                            notification: true,
                            path:
                              `Unison Report Class ${selectedChild.student_name}`,
                            description: 'Downloading report',
                          },
                        };

                        config(options)
                          .fetch(
                            'GET',
                            `https://api.unison.id/reports/parent/${selectedChild.school_id}/${selectedChild.student_id}/${selectedChild.year_id}/${user.parent_id}`,
                          )
                          .then((res) => {
                            if (Platform.OS === "ios") {
                              console.log(res.data)

                              RNFetchBlob.ios.openDocument(res.data);
                            }

                          })
                          .catch((err) => console.log('err', err));

                        // console.log(`/${selectedChild.school_id}/${selectedChild.student_id}/${selectedChild.year_id}/${user.parent_id}`)
                      }}>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 16,
                          marginEnd: 16,
                          marginBottom: 8,
                          backgroundColor: '#e3e3e3',
                        }}>
                        <Text
                          style={{
                            color: '#3e67d6',
                              fontFamily: Platform.OS === 'android' ? 'Avenir-LT-Std-55-Roman' : 'Avenir',
                          }}>
                          Download Report
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    marginHorizontal: 15,
                    padding: 8,
                    marginTop: 16,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 24,
                    }}>
                    <View style={{flex: 1, marginStart: 32}}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          fontSize: 18,
                        }}>
                        Avg Score
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Poppins',
                          fontSize: 12,
                          marginTop: 2,
                        }}>
                        {Array.isArray(reportData.report) &&
                        reportData.report.length > 0
                          ? moment(reportData.report[0].exam_date).format(
                              'DD MMM YYYY',
                            )
                          : months[selectedMonth - 1]}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: '#3e67d6',
                        marginEnd: 24,
                        fontSize: 24,
                        fontFamily: 'Montserrat-Bold',
                        alignSelf: 'center',
                      }}>
                      {reportData.average ? reportData.average : 0}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 12,
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={{alignItems: 'center', marginHorizontal: 32}}>
                      <Text
                        style={{
                          color: '#3e67d6',
                          fontSize: 24,
                          fontFamily: 'Montserrat-Bold',
                        }}>
                        {reportData.averageExam ? reportData.averageExam : 0}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 12,
                        }}>
                        Exam's
                      </Text>
                    </View>

                    <View style={{alignItems: 'center', marginHorizontal: 32}}>
                      <Text
                        style={{
                          color: '#3e67d6',
                          fontSize: 24,
                          fontFamily: 'Montserrat-Bold',
                        }}>
                        {reportData.averageAssignment
                          ? reportData.averageAssignment
                          : 0}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 12,
                        }}>
                        Assignment
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 16,
                      marginTop: 16,
                      fontSize: 10,
                      fontFamily: 'Poppins',
                      paddingHorizontal: 16,
                    }}>
                    All score are{' '}
                    <Text
                      style={{fontFamily: 'Poppins-Bold', color: '#3e67d6'}}>
                      good
                    </Text>
                    , please keep maintain the score until the last semester
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    marginHorizontal: 15,
                    paddingStart: 16,
                    paddingTop: 16,
                    marginTop: 24,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor: 'black',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../../assets/images/ic_lamp.png')}
                          style={{width: 24, height: 24}}
                        />
                      </View>

                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          marginStart: 16,
                          marginTop: 8,
                        }}>
                        Tips
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 12,
                        marginTop: 8,
                        marginBottom: 24,
                      }}>
                      Now you can view your children's{'\n'}digital report
                    </Text>
                  </View>

                  <Image
                    source={require('../../assets/images/ic_img_tips_report.png')}
                    style={{
                      width: 88,
                      height: 160,
                      marginEnd: 16,
                      marginTop: -24,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginHorizontal: 30,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      flex: 1,
                    }}>
                    This Month
                  </Text>

                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelect('month');
                      rbSheetRef.current.open();
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderRadius: 100,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',

                          fontSize: 12,
                        }}>
                        {months[selectedMonth - 1]}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                {Array.isArray(reportData.report) &&
                reportData.report.length > 0 ? (
                  reportData.report.map((report) => {
                    return (
                      <View style={{marginHorizontal: 32, marginTop: 16}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontFamily: 'Poppins-Bold', flex: 1}}>
                            {report.description}
                          </Text>

                          <Text
                            style={{
                              fontFamily: 'Poppins-Regular',
                              fontSize: 12,
                            }}>
                            {moment(report.exam_date).format('DD MMM YYYY')}
                          </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontFamily: 'Poppins-Regular',
                              fontSize: 12,
                              flex: 1,
                            }}>
                            {report.type}
                          </Text>

                          <Text
                            style={{
                              fontFamily: 'Poppins-Bold',
                              fontSize: 24,
                              color:
                                report.score && report.score >= 65
                                  ? '#3e67d6'
                                  : 'red',
                            }}>
                            {report.score ? report.score : 0}
                            {'.0'}
                          </Text>
                        </View>

                        <View
                          style={{
                            height: 1,
                            marginTop: 8,
                            backgroundColor: '#D3D3D3',
                          }}
                        />
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      textAlign: 'center',
                      marginTop: 25,
                    }}>
                    None Of Your Data{'\n'}at this time
                  </Text>
                )}
              </ScrollView>
            );
          } else {
            return (
              <View style={{paddingLeft: 30, paddingRight: 15, flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{fontFamily: 'Montserrat-Bold', color: 'white'}}>
                      Class Period
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: 'white',
                      }}>
                      {selectedChild.year}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                      borderRadius: 100,
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',

                        fontSize: 12,
                      }}>
                      {selectedChild.class_name}
                    </Text>
                  </View>
                </View>

                {Array.isArray(reportHistory) && reportHistory.length > 0 ? (
                  <ScrollView contentContainerStyle={{paddingTop: 40}}>
                    {reportHistory.map((report) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            elevation: 3,
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.25,
                            shadowRadius: 2,
                            marginTop: 12,
                            borderRadius: 5,
                          }}>
                          <View
                            style={{
                              width: 48,
                              height: 48,
                              backgroundColor: '#3e67d6',
                              borderRadius: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginHorizontal: 8,
                              marginVertical: 12,
                            }}>
                            <Image
                              source={require('../../assets/images/img_history_report.png')}
                              style={{width: 24, height: 24}}
                            />
                          </View>

                          <View
                            style={{marginStart: 18, marginEnd: 8, flex: 1}}>
                            <Text
                              style={{
                                fontFamily: 'Poppins-Bold',
                                marginTop: 8,
                                marginEnd: 8,
                              }}>
                              {report.description}
                            </Text>

                            <Text style={{fontFamily: 'Poppins-Regular'}}>
                              {moment(report.exam_date).format('DD MMM YYYY')}
                            </Text>
                          </View>

                          <View
                            style={{
                              marginHorizontal: 4,
                              marginVertical: 2,
                              width: 88,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {report.type}
                            </Text>

                            <Text
                              style={{
                                textAlign: 'center',
                                fontFamily: 'Poppins-Bold',
                                fontSize: 24,
                                color:
                                  report.score && report.score >= 65
                                    ? '#3e67d6'
                                    : 'red',
                              }}>
                              {report.score ? report.score : 0}
                              {'.0'}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        textAlign: 'center',
                      }}>
                      None Of Your Data{'\n'}at this time
                    </Text>
                  </View>
                )}
              </View>
            );
          }
        }}
        ref={carouselRef}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        useNativeDriver
        onSnapToItem={(idx) => setActiveSlide(idx)}
      />
    </View>
  );
}
