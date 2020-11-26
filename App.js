import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
import AppIntroScreen from "./components/screens/AppIntroScreen";
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./components/screens/LoginScreen";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RegisterScreen from "./components/screens/RegisterScreen";
import ChooseGenderScreen from "./components/screens/ChooseGenderScreen";
import RegistrationInfoScreen from "./components/screens/RegistrationInfoScreen";
import ChildRegistrationScreen from "./components/screens/ChildRegistrationScreen";
import UserAgreementScreen from "./components/screens/UserAgreementScreen";
import ReadTermAndConditionScreen from "./components/screens/ReadTermAndConditionScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import HomeScreen from "./components/screens/HomeScreen";

export default function App() {
    const ForgotPasswordSwitch = createSwitchNavigator({
        ForgotPasswordScreen,
        ResetPasswordScreen
    }, {
        initialRouteName: "ForgotPasswordScreen",
        backBehavior: 'none'
    });

    const LoginStack = createStackNavigator({
            LoginScreen,
            RegisterScreen,
            ChooseGenderScreen,
            RegistrationInfoScreen,
            ChildRegistrationScreen,
            UserAgreementScreen,
            ReadTermAndConditionScreen,
            ForgotPasswordSwitch
        },
        {
            headerMode: "none",
            defaultNavigationOptions: {
                tabBarVisible: false
            },
            initialRouteName: "LoginScreen"
        }
    );

    const HomeStack = createStackNavigator({
            HomeScreen
        },
        {
            headerMode: "none",
            defaultNavigationOptions: {
                tabBarVisible: false
            },
            initialRouteName: "HomeScreen"
        }
    );

    const MainSwitch = createSwitchNavigator({
        AppIntroScreen,
        LoginStack,
        HomeStack
    }, {
        initialRouteName: "AppIntroScreen",
        backBehavior: 'none'
    });

    const AppContainer = createAppContainer(MainSwitch);

    Ionicons.loadFont();
    MaterialIcons.loadFont();

    return <AppContainer/>
}