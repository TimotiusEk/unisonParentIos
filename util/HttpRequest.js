import GlobalData from "./GlobalData";
import AsyncStorage from "@react-native-community/async-storage";

export default class HttpRequest {
    static set = async (endpoint, method, body, navigation) => {
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
}
