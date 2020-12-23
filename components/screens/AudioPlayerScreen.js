import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Slider from '@react-native-community/slider';

export default function AudioPlayerScreen(props) {
  const [isPlaying, setPlaying] = useState(false);
  const [audioInfo, setAudioInfo] = useState({});

  useEffect(() => {
    SoundPlayer.onFinishedPlaying((success) => {
      if (success) setPlaying(false);
    });

    let interval = setInterval(async () => {
      getAudioInfo();
    }, 1000);

    if (!audioInfo.duration) getAudioInfo();

    if (isPlaying) {
      if (!audioInfo.currentTime) {
        console.log('playUrl');

        try {
          SoundPlayer.playUrl(props.navigation.getParam('material').file_path);
        } catch (e) {
          console.log(`cannot play the sound file`, e);
        }
      } else {
        console.log('resume');
        SoundPlayer.resume();
      }
    } else {
      SoundPlayer.pause();

      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  const getAudioInfo = async () => {
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async

      if (info.currentTime === info.duration) {
        setPlaying(false);
      }

      setAudioInfo(info);
    } catch (e) {
      console.log('There is no song playing', e);
    }
  };

  const pad = (n) => {
    n = n + '';
    return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black', paddingTop: 60}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <MaterialCommunityIcons
          name={'arrow-left'}
          size={22}
          color={'white'}
          style={{
            marginLeft: 15,
            marginRight: 25,
          }}
          onPress={() => props.navigation.goBack(null)}
        />

        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            color: 'white',
            fontSize: 18,
          }}>
          Unison Media Player
        </Text>
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../../assets/images/ic_logo.png')}
          style={{width: 192, resizeMode: 'contain'}}
        />
      </View>
      <View style={{paddingBottom: 45, alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 50}} onPress={() => {
              setAudioInfo({
                  ...audioInfo,
                  currentTime: audioInfo.currentTime - 5 > 0 ? audioInfo.currentTime - 5 : 0
              })

              SoundPlayer.seek(audioInfo.currentTime - 5 > 0 ? audioInfo.currentTime - 5 : 0)
          }}>
            <FontAwesome name={'backward'} color={'white'} size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 50}}
            onPress={() => {
              if (
                Math.ceil(audioInfo.duration) ===
                Math.ceil(audioInfo.currentTime)
              ) {
                SoundPlayer.seek(0);

                SoundPlayer.play();
              }

              console.log('chks this', audioInfo);

              setPlaying(!isPlaying);
            }}>
            <FontAwesome
              name={isPlaying ? 'pause' : 'play'}
              color={'white'}
              size={26}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
              setAudioInfo({
                  ...audioInfo,
                  currentTime: audioInfo.currentTime + 15 < audioInfo.duration ? audioInfo.currentTime + 15 : audioInfo.duration
              })

              SoundPlayer.seek(audioInfo.currentTime + 15 < audioInfo.duration ? audioInfo.currentTime + 15 : audioInfo.duration)
          }}>
            <FontAwesome name={'forward'} color={'white'} size={26} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 12,
            marginTop: 25,
          }}>
          <Text style={{fontFamily: 'Montserrat-Regular', color: 'white'}}>
            {audioInfo.currentTime
              ? `${pad(Math.floor(audioInfo.currentTime / 60))}:${pad(
                  Math.round(audioInfo.currentTime) % 60,
                )}`
              : '00:00'}
          </Text>

          <Slider
            style={{flex: 1, height: 40, marginHorizontal: 12}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF80"
            tabToSeek={true}
            value={
              audioInfo.duration
                ? audioInfo.currentTime / audioInfo.duration
                : 0
            }
            onValueChange={(value) => {
              setAudioInfo({
                ...audioInfo,
                currentTime: value * audioInfo.duration,
              });

              SoundPlayer.seek(value * audioInfo.duration);
            }}
          />

          <Text style={{fontFamily: 'Montserrat-Regular', color: 'white'}}>
            {audioInfo.duration
              ? `${pad(Math.floor(audioInfo.duration / 60))}:${pad(
                  Math.round(audioInfo.duration) % 60,
                )}`
              : '00:00'}
          </Text>
        </View>
      </View>
    </View>
  );
}
