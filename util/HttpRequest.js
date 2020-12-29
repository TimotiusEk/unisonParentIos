import GlobalData from './GlobalData';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';

export default class HttpRequest {
  static set = async (endpoint, method, body) => {
    return (resolve, reject) => {
      fetch('https://api.unison.id' + endpoint, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      })
        .then((response) => {
          // console.log('response', response)

          return response.json();
        })
        .then((data) => {
          if (data.result) resolve(data);
          else reject(data);
        })
        .catch((e) => {
          console.log(e);
          reject('Network Request Failed');
        });
    };
  };

  static setFormData = async (endpoint, method, body) => {
    console.log('https://api.unison.id' + endpoint);

    return (resolve, reject) => {
      const formData = new FormData();
      const request = [];

      for (const name in body) {
        if (Array.isArray(body[name])) {
          body[name].map((file) => {
            request.push({name, data: file});
            

            formData.append(file);
          });
        } else {
          request.push({name, data: body[name]});
          typeof body[name] !== 'undefined' &&
         
            formData.append(name, body[name]);
        }
      }

      

      // RNFetchBlob.fetch(method, 'https://api.unison.id' + endpoint, {
      //   'Content-Type': 'multipart/form-data'
      // }, request)
      //   .then((res) => console.log('res', res))
      //   .catch((err) => console.log('err', err));

      // fetch('https://api.unison.id' + endpoint, {
      //   method,
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: formData,
      // })
      //   .then((response) => {
      //     console.log('response', response)

      //     return response.json();
      //   })
      //   .then((data) => {
      //     if (data.result) resolve(data);
      //     else reject(data);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //     reject('Network Request Failed');
      //   });
      axios
        .post('https://api.unison.id' + endpoint, formData)
        .then(({data}) => {
          console.log('data', data)

          if (data.result) resolve(data);
          else reject(data);
        })
        .catch((err) => {
          console.log('err', err)
          reject(err)
        });
    };
  };
}
