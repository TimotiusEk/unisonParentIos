import React, {useState, useRef, useEffect} from 'react';
import {Image, Dimensions, View, Text, Platform} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ImageViewerScreen(props) {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const url = props.navigation.getParam('url');

  return (
    <View style={{flex: 1, backgroundColor: '#303030', paddingTop: Platform.OS === 'ios' ? 60: 20}}>
      <View style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 15, alignItems: 'center'}}>
        <MaterialCommunityIcons
          name={'arrow-left'}
          size={26}
          color={'white'}
          onPress={() => props.navigation.goBack(null)}
        />

        <Text
        numberOfLines={1}
          style={{
            fontFamily: 'Avenir',
            fontWeight: '600',
            fontSize: 20,
            marginLeft: 20,
            color: 'white',
            flex: 1
          }}>
          {url}
        </Text>
      </View>
      {!isImageLoaded && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -1
        }}>
        <Image
          style={{width: 200, height: 200, resizeMode: 'contain'}}
          source={require('../../assets/images/ic_default_pict.png')}
        />
      </View>
      )}

      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width}
        style={{paddingBottom: 100}}
        imageHeight={500}>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: 500,
            resizeMode: 'contain',
          }}
          onLoad={() => setImageLoaded(true)}
          source={{
            uri:url
          }}
        />
      </ImageZoom>
    </View>
  );
}
