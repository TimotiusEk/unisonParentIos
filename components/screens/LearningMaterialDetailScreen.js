import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import AsyncStorage from '@react-native-community/async-storage';
import HttpRequest from '../../util/HttpRequest';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Rating} from 'react-native-ratings';

export default function LearningMaterialDetailScreen(props) {
  const rbSheetRef = useRef(null);

  const {height: SCREEN_HEIGHT} = Dimensions.get('window');

  const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
  const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
  const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

  const [material, setMaterial] = useState({});
  const [ratings, setRatings] = useState([]);
  const [isDescriptionCollapse, setDescriptionCollapse] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const title = () => {
    return (
      <View style={styles.body}>
        <Image
          source={{uri: material.image_path}}
          style={{
            height: 200,
            width: Dimensions.get('window').width,
            resizeMode: 'contain',
            marginTop: STATUS_BAR_HEIGHT,
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
              if(material.type === 'Podcast') {
                props.navigation.navigate('AudioPlayerScreen', {material})
              } else {
                props.navigation.navigate('ReadPdfScreen', {material})
              }
          }}>
          <View
            style={{
              backgroundColor: '#033AA8',
              borderRadius: 24,
              flexDirection: 'row',
              width: 95,
              paddingVertical: 7,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: -20,
            }}>
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}>
              <Ionicons name={'play'} color={'#033AA8'} size={10} />
            </View>

            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                color: 'white',
                marginLeft: 6,
              }}>
              {material.type === 'Podcast' ? 'Play' : 'Read'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentContainer: {
      flexGrow: 1,
    },
    navContainer: {
      height: HEADER_HEIGHT,
      marginHorizontal: 10,
    },
    statusBar: {
      height: STATUS_BAR_HEIGHT,
      backgroundColor: 'transparent',
    },
    navBar: {
      height: NAV_BAR_HEIGHT,
      // justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    titleStyle: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

  const renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
          <Ionicons name={'chevron-back'} size={23} style={{marginLeft: 5}} />
        </TouchableOpacity>

        <Text style={{marginLeft: 15, fontSize: 18, fontFamily: 'Graphik'}}>
          {material.title}
        </Text>
      </View>
    </View>
  );

  const getRatings = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    new Promise(
      await HttpRequest.set(
        '/userRekanan/materi/review',
        'POST',
        JSON.stringify({
          access_token: user.access_token,
          numberOfRows: 10,
          pages: 1,
          rekanan_materi_id: props.navigation.getParam('material').id,
        }),
      ),
    )
      .then((res) => {
        setRatings(res.data);

        res.data.map((review) => {
          if (review.reviewer_name === user.name) {
            console.log(review);
            setRating(review.rating);
            setReview(review.review);
          }
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const submitReview = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    setReviewError('');

    if (!rating) {
      setReviewError('Ratings cannot be empty!');
    } else if (!review) {
      setReviewError('Review cannot be empty!');
    } else {
      setSubmittingReview(true);

      new Promise(
        await HttpRequest.set(
          '/userRekanan/materi/review/save',
          'POST',
          JSON.stringify({
            user_rekanan_materi_id: material.id,
            access_token: user.access_token,
            rating,
            review,
          }),
        ),
      )
        .then((res) => {
          if (res.result) {
            setSubmittingReview(false);
            rbSheetRef.current.close();
            getRatings();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{marginTop: 40, paddingHorizontal: 16}}>
        <RBSheet
          onClose={() => {}}
          ref={rbSheetRef}
          closeOnDragDown={true}
          height={315}
          openDuration={250}>
          <View style={{padding: 16}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: '#3E3F68',
              }}>
              Leave A Review
            </Text>

            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#3E3F68',
                  marginRight: 16,
                }}>
                Ratings
              </Text>

              <Rating
                onFinishRating={(rating) => {
                  setRating(rating);
                }}
                imageSize={26}
                startingValue={rating}
              />
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#3e67d6',
                marginTop: 20,
                borderRadius: 4,
                padding: 12,
                height: 100,
              }}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                value={review}
                onChangeText={(review) => setReview(review)}
                style={{fontFamily: 'Montserrat-Regular'}}
                placeholder={'Write your experience'}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              {reviewError ? (
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    marginTop: 6,
                    color: 'red',
                  }}>
                  {reviewError}
                </Text>
              ) : isSubmittingReview ? (
                <ActivityIndicator
                  size="small"
                  color="#3E3F68"
                  style={{marginTop: 6}}
                />
              ) : null}
              <TouchableOpacity
                onPress={submitReview}
                disabled={isSubmittingReview}>
                <View
                  style={{
                    marginLeft: 8,
                    backgroundColor: isSubmittingReview
                      ? '#3e67d666'
                      : '#3e67d6',
                    alignSelf: 'flex-end',
                    borderRadius: 16,
                    marginTop: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 24,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: 'white',
                      fontSize: 15,
                    }}>
                    {isSubmittingReview ? 'Loading' : 'Add Review'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            textAlign: 'center',
            fontSize: 18,
          }}>
          {material.title}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            marginTop: 8,
            textAlign: 'center',
            color: '#818181',
          }}>
          By {material.author}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name={'star'} color={'#fdcb03'} size={25} />

          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 18,
              marginStart: 8,
            }}>
            {material.average}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            textAlign: 'center',
            color: '#818181',
          }}>
          {material.view} {material.view > 0 ? 'views' : 'view'}
        </Text>

        <Text
          style={{fontFamily: 'montserrat-bold', fontSize: 18, marginTop: 24}}>
          {material.price > 0 ? material.price : 'Free'}
        </Text>

        <TouchableWithoutFeedback
          onPress={() => setDescriptionCollapse(!isDescriptionCollapse)}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={{fontFamily: 'montserrat-bold', flex: 1, fontSize: 16}}>
              Description
            </Text>

            <Ionicons
              name={isDescriptionCollapse ? 'chevron-down' : 'chevron-up'}
              size={20}
              style={{marginRight: 15}}
              color={'grey'}
            />
          </View>
        </TouchableWithoutFeedback>

        <Collapsible collapsed={isDescriptionCollapse}>
          <Text
            style={{
              fontFamily: 'Avenir',
              fontSize: 16,
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}>
            {material.description}
          </Text>
        </Collapsible>

        <View style={{height: 1, backgroundColor: '#e3e3e3'}} />

        <View
          style={{
            flexDirection: 'row',
            marginTop: 24,
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{fontFamily: 'Montserrat-SemiBold', flex: 1, fontSize: 16}}>
            Review & Ratings
          </Text>

          <TouchableWithoutFeedback onPress={() => {}}>
            <Text
              style={{
                marginEnd: 8,
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                color: '#818181',
              }}>
              See all
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <TouchableWithoutFeedback onPress={() => rbSheetRef.current.open()}>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#033AA8',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 18,
              borderRadius: 5,
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 15,
              }}>
              Write a review
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={{paddingBottom: 50}}>
          {ratings.map((rating) => {
            return (
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Image
                  source={{uri: rating.image_path}}
                  style={{width: 50, height: 50, borderRadius: 25}}
                />

                <View style={{marginLeft: 25, flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        color: '#3E3F68',
                        flex: 1,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {rating.reviewer_name}
                    </Text>

                    <Ionicons name={'star'} color={'#fdcb03'} size={20} />

                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 12,
                        marginLeft: 10,
                      }}>
                      {rating.rating.toFixed(1)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#818181',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {rating.review}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  useEffect(() => {
    console.log('material', props.navigation.getParam('material'));

    setMaterial(props.navigation.getParam('material'));
    getRatings();
  }, []);

  return (
    <ReactNativeParallaxHeader
      headerMinHeight={HEADER_HEIGHT}
      headerMaxHeight={250}
      navbarColor="white"
      backgroundColor={'white'}
      titleStyle={styles.titleStyle}
      title={title()}
      backgroundImageScale={1.2}
      renderNavBar={renderNavBar}
      renderContent={renderContent}
      containerStyle={styles.container}
      contentContainerStyle={styles.contentContainer}
      innerContainerStyle={styles.container}
      alwaysShowTitle={false}
      alwaysShowNavBar={false}
      scrollViewProps={{
        onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
        onScrollEndDrag: () => console.log('onScrollEndDrag'),
      }}
    />
  );
}
