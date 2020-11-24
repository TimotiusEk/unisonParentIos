import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
import AppIntroScreen from "./components/screens/AppIntroScreen";
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./components/screens/LoginScreen";
import Icon from 'react-native-vector-icons/Ionicons'


export default function App() {
    const LoginStack = createStackNavigator({
            LoginScreen,
            // RegisterScreen,
            // ForgotPasswordScreen
        },
        {
            headerMode: "none",
            defaultNavigationOptions: {
                tabBarVisible: false
            },
            initialRouteName: "LoginScreen"
        }
    );

    const MainSwitch = createSwitchNavigator({
        AppIntroScreen,
        LoginStack,
    }, {
        initialRouteName: "AppIntroScreen",
        backBehavior: 'none'
    });

    const AppContainer = createAppContainer(MainSwitch);

    Icon.loadFont();

    return <AppContainer/>
}