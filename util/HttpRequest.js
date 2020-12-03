import GlobalData from "./GlobalData";
import AsyncStorage from "@react-native-community/async-storage";

export default class HttpRequest {
    static set = async (endpoint, method, body) => {
        /**
         * to check if same endpoint called multiple times in a screen
         */

        return (resolve, reject) => {
            fetch('https://api.unison.id' + endpoint, {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': GlobalData.user ? 'Bearer ' + GlobalData.user.token : null,
                }, body
            })
                .then((response) => response.json())
                .then((data) => {
                    if(data.result) resolve(data)
                    else reject(data);
                })
                .catch((e) => {
                    console.log(e)
                    reject('Network Request Failed');
                });
        }
    }

    static setUrlEncoded = async (endpoint, method, body) => {
        /**
         * to check if same endpoint called multiple times in a screen
         */

        let formBody = [];
        for (let property in body) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(body[property]);
            console.log(encodedKey + "=" + encodedValue)

            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return (resolve, reject) => {
            fetch('https://api.unison.id' + endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }, body: formBody
            })
                .then((response) => {
                    console.log('chk this', response)
                    return response.json()
                })
                .then((data) => {
                    console.log('data', data)

                    if(data.result) resolve(data)
                    else reject(data);
                })
                .catch((e) => {
                    console.log(e)
                    reject('Network Request Failed');
                });
        }
    }
}
